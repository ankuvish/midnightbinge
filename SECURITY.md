# 🔒 MidnightBinge — Security Reference

This document covers every security control in the codebase, known limitations, and the hardening checklist required before going to production.

---

## Table of Contents

- [Threat Model](#threat-model)
- [HTTP Security Headers](#http-security-headers)
- [API Security](#api-security)
- [Payment Security](#payment-security)
- [Data & PII Protection](#data--pii-protection)
- [Client-Side Security](#client-side-security)
- [Secrets Management](#secrets-management)
- [Known Limitations](#known-limitations)
- [Pre-Deploy Checklist](#pre-deploy-checklist)
- [Reporting a Vulnerability](#reporting-a-vulnerability)

---

## Threat Model

The site is a consumer e-commerce storefront. The primary threats in scope are:

| Threat | Attack vector |
|---|---|
| Data theft | Leaking customer PII (names, phones, addresses) |
| Payment fraud | Bypassing Razorpay signature verification |
| Injection | XSS via stored order data or leads |
| DoS | Large-payload floods on API routes |
| IDOR | Accessing other users' order pages |
| Secret exposure | Committing `.env` or `data/*.json` files to git |
| Clickjacking | Embedding the checkout page in a malicious iframe |
| Timing attacks | Comparing HMAC signatures with `===` |

---

## HTTP Security Headers

Configured in `next.config.js` and applied to every route via `source: "/(.*)"`.

| Header | Value | Purpose |
|---|---|---|
| `X-Frame-Options` | `SAMEORIGIN` | Prevents clickjacking — blocks the page from being embedded in iframes on other domains |
| `X-Content-Type-Options` | `nosniff` | Stops browsers from MIME-sniffing responses away from the declared content-type |
| `X-XSS-Protection` | `1; mode=block` | Legacy XSS filter for older browsers (Chrome/Safari removed it; still useful for IE/Edge legacy) |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Sends full URL to same-origin requests; only the origin to cross-origin HTTPS; nothing to HTTP |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=(self)` | Disables browser APIs the app does not use; restricts Payment API to same origin |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` | Forces HTTPS for 2 years across all subdomains; eligible for browser preload lists |
| `Content-Security-Policy` | See below | Controls which scripts, frames, and connections the browser is allowed to make |

### Content Security Policy breakdown

```
default-src 'self'
script-src  'self' 'unsafe-inline' https://checkout.razorpay.com https://www.clarity.ms https://c.bing.com
frame-src   https://api.razorpay.com https://checkout.razorpay.com
connect-src 'self' https://api.razorpay.com https://www.clarity.ms https://c.bing.com
img-src     'self' data: blob: https:
style-src   'self' 'unsafe-inline' https://fonts.googleapis.com
font-src    'self' https://fonts.gstatic.com
worker-src  blob:
base-uri    'self'
form-action 'self'
```

> **Note on `'unsafe-inline'`:** Required by three things: Next.js inline theme-detection `<script>` in `<head>`, the Razorpay checkout SDK, and the Clarity analytics snippet. To eliminate it, migrate to a nonce-based CSP using Next.js middleware — see [Known Limitations](#known-limitations).

---

## API Security

### Input validation — all three routes

Every API route applies the following before doing any work:

1. **Body size cap** — `Content-Length` checked against a per-route max before parsing (`/api/orders` → 8 KB, `/api/leads` → 4 KB). Requests over the limit get `413 Too Large`.
2. **Safe JSON parse** — `req.json()` wrapped in `try/catch`. Malformed JSON returns `400` instead of crashing the handler.
3. **Type guards** — every field is checked with `typeof` before use. `null`, `undefined`, and unexpected types are rejected with `400`.
4. **Sanitization** — string fields run through `sanitize()` which trims whitespace and strips all HTML/script tags before storage.
5. **Strict regex validation** — phone (`/^[6-9]\d{9}$/`), pincode (`/^\d{6}$/`), phone with dial code (`/^\+\d{1,4}\d{6,12}$/`) all use anchored patterns.
6. **Allow-list for enums** — `slot` and `method` are checked against fixed allow-lists (`SLOTS` array and `["online","cod"]`).

### `/api/orders`

| Control | Detail |
|---|---|
| Server-side pricing | All prices looked up from the product catalogue on the server. Client-provided prices are ignored entirely |
| Qty bounds | Each item qty must be `1–20` and a valid integer (`Math.floor` + `isFinite` check) |
| Max items | Cart is rejected if `items.length > 20` |
| Razorpay key gating | `NEXT_PUBLIC_RAZORPAY_KEY_ID` is only included in the response when `method === "online"` — never exposed on COD orders |
| Gateway error handling | `fetch` to Razorpay API is wrapped in `try/catch`; both non-OK responses and network failures return `502` |

### `/api/verify`

| Control | Detail |
|---|---|
| Field presence check | All four fields (`id`, `razorpay_order_id`, `razorpay_payment_id`, `razorpay_signature`) are validated as non-empty strings before any crypto work |
| HMAC algorithm | `crypto.createHmac("sha256", secret)` using the Razorpay key secret |
| Timing-safe comparison | `crypto.timingSafeEqual()` used instead of `===` to prevent timing oracle attacks |
| Buffer length check | Buffer lengths compared before `timingSafeEqual` to avoid crashes on malformed signatures |
| Secret presence | 503 returned if `RAZORPAY_KEY_SECRET` is not set — prevents verification against an empty string |

### `/api/leads`

| Control | Detail |
|---|---|
| Name length cap | Capped at 80 characters after sanitization |
| Phone length cap | Capped at 16 characters; validated against anchored E.164-style regex |
| Consent gate | Request rejected with `400` if `consent` is not truthy |
| Duplicate check | Phone number checked against existing leads before writing; duplicates return `{ already: true }` without error |

### Concurrent write protection (`lib/orders.ts`)

All writes to `orders.json` and `leads.json` are serialized through a module-level promise chain (`writeLock`). This prevents race conditions where two simultaneous requests could both read the same stale state and overwrite each other's data.

```
Request A ─┐
            ├─► writeLock.then(write A) ─► writeLock.then(write B)
Request B ─┘
```

---

## Payment Security

The payment flow uses Razorpay's standard integration:

```
Client → POST /api/orders → Razorpay API (server-to-server) → rzpId
Client → Razorpay modal (client SDK) → handler callback
Client → POST /api/verify → HMAC check (server) → mark paid
```

**Key properties:**
- The Razorpay secret key never leaves the server
- Payment amounts are calculated server-side from the product catalogue — the client cannot manipulate the amount
- The Razorpay order ID is created server-side; the client only holds the reference
- HMAC verification uses `timingSafeEqual` (see above)
- A failed or dismissed modal sets `busy = false` so the user can retry; the order record stays in `awaiting_payment` state until verified

---

## Data & PII Protection

### What is stored

| Data | Location | Contains |
|---|---|---|
| Orders | `data/orders.json` | Name, phone, address, pincode, items, total, slot, payment method |
| Leads | `data/leads.json` | Name, phone, join timestamp |

### Protections in place

| Protection | Detail |
|---|---|
| Not tracked in git | Both `data/orders.json` and `data/leads.json` are in `.gitignore` |
| Removed from history | `data/orders.json` was un-tracked from git with `git rm --cached` |
| PII redaction on order page | `/order/[id]` masks the phone number (`91••••••10`), does not display name or full address |
| ID format validation | Order IDs validated against `/^MB[A-F0-9]{8}$/` before querying — prevents path traversal log pollution |
| Sanitized on write | Name and address fields are HTML-stripped before being saved to disk |

> ⚠️ **Production note:** The flat-file store is for demo use only. Before going live, migrate to a real database (PostgreSQL, MongoDB, Supabase) with proper access controls, encrypted connections, and backup procedures.

---

## Client-Side Security

### Cart (`lib/cart.tsx`)

localStorage data is validated on load before use:
- Must be a JSON array
- Each item must have `{ id: string, qty: integer > 0 }`
- Invalid or corrupted data clears the cart cleanly instead of crashing

### Checkout form (`app/checkout/page.tsx`)

Client-side validation runs before the API call:
- Phone validated with `/^[6-9]\d{9}$/`
- Pincode validated with `/^\d{6}$/`
- Server re-validates everything independently — client checks are UX only

### Theme script

The inline theme-detection script in `<head>` only reads `localStorage.getItem('theme')` and adds/removes a CSS class. It does not write to the DOM or evaluate any external data.

### Analytics (`layout.tsx`)

The Clarity script is only injected when `NEXT_PUBLIC_CLARITY_ID` is set. With no ID configured (dev mode, unset env), no third-party script is loaded.

---

## Secrets Management

| Secret | Where used | How protected |
|---|---|---|
| `RAZORPAY_KEY_ID` | Server — Razorpay API calls | `.env.local` only, never in client bundle |
| `RAZORPAY_KEY_SECRET` | Server — HMAC signing + verification | `.env.local` only, never in response |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Client — Razorpay modal init | Public by design; only sent when method is "online" |
| `NEXT_PUBLIC_CLARITY_ID` | Client — Clarity analytics | Public by design; optional |

**Rules:**
- `.env.local` is in `.gitignore` — never committed
- `RAZORPAY_KEY_SECRET` is only ever read server-side
- No secrets are logged or included in error messages returned to the client

---

## Known Limitations

These are accepted for the current demo/early-production stage. Address them before scaling.

| Limitation | Risk | Recommended fix |
|---|---|---|
| Flat-file order/lead store | Data loss on concurrent Vercel instances; no backup | Migrate to PostgreSQL or Supabase |
| No rate limiting on API routes | Brute-force / spam to `/api/leads` and `/api/orders` | Add `@upstash/ratelimit` with Redis or Vercel KV |
| `'unsafe-inline'` in CSP | Weakens XSS protection | Implement nonce-based CSP via Next.js middleware |
| No authentication | Any URL like `/order/MBXXXXXXXX` is public | Add session-based auth (NextAuth.js) and gate order pages |
| Order ID is guessable in theory | 8 hex chars = ~4 billion combinations; acceptable but not ideal | Use a longer random token for order confirmation URL |
| No CSRF protection | Next.js App Router API routes are not CSRF-protected by default | Add `SameSite=Strict` cookies + origin check header for auth-gated routes once auth is added |

---

## Pre-Deploy Checklist

Run through this before pointing a domain at this codebase.

### Environment
- [ ] `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` set with **live** keys (not test)
- [ ] `NEXT_PUBLIC_RAZORPAY_KEY_ID` set with the **live** public key
- [ ] `NEXT_PUBLIC_CLARITY_ID` set (or intentionally blank)
- [ ] `.env.local` is **not** in the repository
- [ ] `data/orders.json` and `data/leads.json` are **not** in the repository

### Build
- [ ] `npm run build` passes with zero errors and zero warnings
- [ ] `productionBrowserSourceMaps: false` is set in `next.config.js` ✅ (already done)
- [ ] No `console.log` calls left in API routes

### Headers
- [ ] Deploy and verify headers at [securityheaders.com](https://securityheaders.com) — target grade **A**
- [ ] Verify HSTS is active on production domain

### Razorpay
- [ ] Test a full payment flow end-to-end with live keys in a staging environment
- [ ] Confirm `/api/verify` HMAC check passes for a real Razorpay payment
- [ ] Confirm COD orders do **not** attempt to open the Razorpay modal

### Data
- [ ] Confirm `data/` directory is writable on the server
- [ ] Set up a backup schedule for `data/orders.json` and `data/leads.json` (or better, migrate to a database)

### DNS & HTTPS
- [ ] SSL certificate is valid and auto-renewing
- [ ] HTTP redirects to HTTPS (Vercel does this automatically)
- [ ] HSTS preload submitted at [hstspreload.org](https://hstspreload.org) (optional but recommended)

---

## Reporting a Vulnerability

If you find a security issue, **do not open a public GitHub issue.**

Email: **security@midnightbinge.com** (replace with your actual address)

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Any suggested fix

You will receive a response within 48 hours. We do not currently offer a bug bounty but we will credit you publicly if you wish.
