# 🌙 MidnightBinge

> **Wholesome, bold snacks for late-night cravings — delivered while the city sleeps.**

A full-stack e-commerce storefront built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Features a dark/light themed UI, cart management, Razorpay payment integration, WhatsApp opt-in leads, and midnight delivery slot selection.

---

## 📋 Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Pages & Routes](#pages--routes)
- [Key Components](#key-components)
- [Design System](#design-system)
- [API Routes](#api-routes)
- [Payment Integration](#payment-integration)
- [Deployment](#deployment)
- [Changelog](#changelog)

---

## 🛠 Tech Stack

| Layer       | Technology                                      |
|-------------|------------------------------------------------|
| Framework   | [Next.js 14](https://nextjs.org) (App Router)  |
| Language    | TypeScript 5.6                                  |
| Styling     | Tailwind CSS 3.4 + custom CSS variables         |
| Fonts       | Bricolage Grotesque, DM Sans, Dancing Script    |
| Payments    | [Razorpay](https://razorpay.com)                |
| Analytics   | Microsoft Clarity (optional)                    |
| Deployment  | Vercel (recommended)                            |

---

## 📁 Project Structure

```
midnightbinge/
├── app/
│   ├── about/          # About the brand
│   ├── account/        # User account page
│   ├── api/
│   │   ├── leads/      # POST — WhatsApp opt-in lead capture
│   │   ├── orders/     # POST — create order + Razorpay session
│   │   └── verify/     # POST — verify Razorpay payment signature
│   ├── auth/           # Sign in / sign up page
│   ├── careers/        # Careers page
│   ├── checkout/       # Checkout flow (address, slot, payment)
│   ├── contact/        # Contact form
│   ├── loyalty/        # Loyalty program page
│   ├── order/[id]/     # Order confirmation page
│   ├── policies/       # Policies overview
│   ├── privacy/        # Privacy policy
│   ├── product/[slug]/ # Product detail page (dynamic)
│   ├── shop/           # Shop listing with filter + search
│   ├── terms/          # Terms of service
│   ├── globals.css     # Global styles + CSS design tokens
│   ├── layout.tsx      # Root layout (fonts, header, footer, blobs)
│   └── page.tsx        # Homepage (hero, marquee, products, opt-in)
│
├── components/
│   ├── BackgroundDecorations.tsx  # Stars (dark) / suns (light) ambient layer
│   ├── Header.tsx                 # Sticky header + cart drawer
│   ├── HeroOrb.tsx                # Circular product carousel in hero
│   ├── OptInForm.tsx              # WhatsApp lead capture form
│   ├── Pack.tsx                   # SVG product pack illustration
│   ├── ProductCard.tsx            # Product grid card
│   ├── ThemeToggle.tsx            # Dark / light mode toggle
│   └── WaveSlogan.tsx             # Animated wave slogan text
│
├── data/
│   └── orders.json     # Flat-file order store (dev/demo only)
│
├── lib/
│   ├── cart.tsx        # Cart context (React Context + localStorage)
│   ├── orders.ts       # Read/write helpers for orders.json
│   ├── pricing.ts      # Price formatting, totals, shipping, slots
│   └── products.ts     # Product catalogue (type + data)
│
├── .env.example        # Environment variable template
├── next.config.js      # Next.js config
├── tailwind.config.ts  # Tailwind theme (colors, fonts)
└── tsconfig.json       # TypeScript config
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/ankuvish/midnightbinge.git
cd midnightbinge

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your Razorpay keys (see Environment Variables section)

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🔑 Environment Variables

Copy `.env.example` to `.env.local` and fill in the values:

```env
# Razorpay — get these from https://dashboard.razorpay.com/app/keys
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
```

> **Demo mode:** Leave all values blank to run the site with Cash on Delivery only. No Razorpay calls will be made.

---

## 📄 Pages & Routes

| Route                 | Type      | Description                                      |
|-----------------------|-----------|--------------------------------------------------|
| `/`                   | Static    | Homepage — hero, marquee, products, opt-in form  |
| `/shop`               | Client    | Product listing with category filter + search    |
| `/product/[slug]`     | SSG       | Product detail page                              |
| `/checkout`           | Client    | Address, delivery slot, payment method           |
| `/order/[id]`         | Dynamic   | Order confirmation page                          |
| `/auth`               | Client    | Sign in / sign up                                |
| `/account`            | Static    | Account dashboard (placeholder)                  |
| `/about`              | Static    | Brand story                                      |
| `/contact`            | Client    | Contact form                                     |
| `/careers`            | Static    | Careers page                                     |
| `/loyalty`            | Static    | Loyalty program info                             |
| `/policies`           | Static    | Policies overview                                |
| `/privacy`            | Static    | Privacy policy                                   |
| `/terms`              | Static    | Terms of service                                 |

---

## 🧩 Key Components

### `Header.tsx`
Sticky navigation bar with:
- Brand logo with gold gradient text
- Nav links (Shop, About, Contact, Sign in)
- Dark/light mode toggle
- Cart button with item count badge (pulses when items are added)
- Slide-out cart drawer with free shipping progress bar, quantity controls, and checkout CTA

### `HeroOrb.tsx`
Circular product carousel on the homepage. Auto-rotates through products every 2.5 seconds. Supports hover-to-pause, prev/next arrows, and dot indicators.

### `ProductCard.tsx`
Product grid card with:
- Hover lift + image scale effect
- Gold glow ring on hover
- Star rating display
- Add to cart with animated feedback (gold → green ✓)

### `BackgroundDecorations.tsx`
Fixed ambient layer behind all content:
- **Dark mode:** 20 twinkling `✦` stars with staggered pulse animations
- **Light mode:** 20 small `☀` sun icons with shimmer animations
- Uses a `MutationObserver` to react to theme class changes

### `WaveSlogan.tsx`
Animated script-font slogans that wave per word. Used three times on the homepage between product rows.

### `Pack.tsx`
SVG illustration of a snack pack rendered with the product's brand color. Used in product cards, the hero orb, and product detail pages.

### `OptInForm.tsx`
WhatsApp lead capture form with:
- Name + phone number fields
- Country dial code selector (10 countries)
- Consent checkbox
- POST to `/api/leads`

---

## 🎨 Design System

### Themes

The site supports **dark mode** (default) and **light mode**, toggled by adding/removing the `light` class on `<html>`. The preference is persisted in `localStorage`.

### CSS Custom Properties (tokens)

All colors, shadows, and gradients are defined as CSS variables in `app/globals.css` under `:root` (dark) and `html.light` (light).

| Token group     | Examples                                              |
|-----------------|-------------------------------------------------------|
| Backgrounds     | `--bg`, `--bg-2`, `--bg-3`, `--bg-4`                 |
| Text            | `--text`, `--text-muted`, `--text-faint`, `--text-dim`|
| Brand           | `--gold`, `--gold-2/3/4`, `--ember`, `--ember-2/3`   |
| Borders         | `--border`, `--border-soft`, `--border-hover`        |
| Shadows         | `--shadow-sm/md/lg`, `--shadow-gold`, `--shadow-ember`|
| Components      | `--glass-bg`, `--header-bg`, `--input-bg`            |

### Light Mode Palette

Luxury parchment + deep jewel-tone gold — inspired by high-end stationery and perfume packaging:

| Role            | Value     |
|-----------------|-----------|
| Background      | `#F0EDE4` (warm parchment) |
| Surface         | `#FFFDF7` (ivory cream)    |
| Gold            | `#7A5508` (deep amber)     |
| Ember           | `#9E2A0A` (deep bordeaux)  |
| Text            | `#1C1710` (warm near-black)|

### Utility Classes

| Class                  | Purpose                                          |
|------------------------|--------------------------------------------------|
| `.glass`               | Frosted glass card (backdrop-blur + border)      |
| `.btn-luxury`          | Button with shimmer sweep on hover               |
| `.btn-primary`         | Ember gradient CTA button                        |
| `.btn-outline-gold`    | Gold outlined button                             |
| `.text-gold-gradient`  | Multi-stop gold gradient text                    |
| `.shine`               | Animated sweeping shine text effect              |
| `.input-luxury`        | Styled form input with gold focus ring           |
| `.filter-pill`         | Shop category filter button                      |
| `.slot-card`           | Delivery slot selector card                      |
| `.pay-card`            | Payment method selector card                     |
| `.badge-discount`      | Percentage-off badge on product cards            |
| `.fade-up`             | Fade + slide-up entrance animation               |
| `.glow-moon/ember/gold`| Box shadow glow utilities                        |
| `.spinner`             | Loading spinner                                  |
| `.alert-error`         | Red error feedback box                           |
| `.alert-success`       | Green success feedback box                       |

---

## 🔌 API Routes

### `POST /api/leads`

Captures WhatsApp opt-in leads.

**Request body:**
```json
{
  "name": "Riya Sharma",
  "phone": "+919876543210",
  "consent": true
}
```

**Response:**
```json
{ "ok": true, "already": false }
```

---

### `POST /api/orders`

Creates an order and (optionally) a Razorpay order session.

**Request body:**
```json
{
  "items": [{ "id": "p1", "qty": 2 }],
  "customer": {
    "name": "Riya Sharma",
    "phone": "9876543210",
    "address": "12 MG Road, Bengaluru",
    "pincode": "560001"
  },
  "slot": "12 am – 2 am (midnight drop)",
  "method": "online"
}
```

**Response (online):**
```json
{
  "id": "ord_abc123",
  "key": "rzp_test_xxx",
  "amount": 248,
  "rzpId": "order_rzp_xxx"
}
```

**Response (COD):**
```json
{ "id": "ord_abc123" }
```

---

### `POST /api/verify`

Verifies Razorpay payment signature after successful payment.

**Request body:**
```json
{
  "id": "ord_abc123",
  "razorpay_order_id": "order_rzp_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "abc..."
}
```

**Response:** `{ "ok": true }`

---

## 💳 Payment Integration

The site integrates with [Razorpay](https://razorpay.com) for UPI, card, and netbanking payments.

**Flow:**
1. User fills checkout form and clicks "Pay"
2. `/api/orders` creates a Razorpay order and returns the order ID + key
3. Razorpay checkout modal opens client-side
4. On success, the payment signature is sent to `/api/verify`
5. Verified → order marked as paid → redirect to `/order/[id]`

**Demo mode (no keys set):** Only Cash on Delivery is available. The Razorpay modal will not open.

---

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Set your environment variables in the Vercel dashboard under **Project → Settings → Environment Variables**.

### Manual (Node server)

```bash
npm run build
npm run start  # runs on port 3000
```

> **Note:** `data/orders.json` is a flat-file store used for demo purposes. For production, replace the order storage in `lib/orders.ts` with a real database (PostgreSQL, MongoDB, etc.).

---

## 📦 Catalogue

Products are defined in `lib/products.ts`. To add or update products, edit the `products` array:

```ts
{
  id: "p7",
  slug: "my-new-snack",
  name: "My New Snack",
  category: "Makhana",   // "Makhana" | "Chips" | "Nuts"
  price: 129,            // selling price (₹)
  mrp: 150,              // MRP for discount calculation
  weight: "40 g",
  blurb: "Short product description shown on cards.",
  color: "#FF6B4A",      // pack illustration accent color
  rating: 4.5,
  reviewCount: 42,
}
```

---

## 📝 Changelog

All notable changes to this project are documented here.

---

### [v1.2.0] — 2026-10-12 · Performance & Light Mode

**Performance fixes**
- `WaveSlogan` — rewrote animation to run per-word instead of per-character, reducing active CSS animations from ~120 down to ~10 (the biggest render bottleneck)
- `BackgroundDecorations` — replaced 41 animated SVG sun shapes (each with radialGradient + 8 ray lines + 3 circles) with 20 lightweight CSS text characters. Zero SVG paint overhead
- Reduced background blob count from 4 → 2, blur from `140px` → `90px`
- Reduced `backdrop-filter` blur on `.glass` from `28px` → `16px`, cart button from `12px` → `8px`
- Added `will-change: transform, opacity` to all animated elements
- Added `contain: layout style` to product cards to prevent layout thrash
- Added `contain: strict` + `isolation: isolate` on blobs to scope repaints

**New light mode palette**
- Replaced warm ivory with deep **parchment** (`#F0EDE4`) — richer, more premium feel
- Gold deepened to jewel-tone amber (`#7A5508`)
- Ember shifted to deep bordeaux-red (`#9E2A0A`)
- Blob colors changed to muted sage/champagne for subtlety
- Updated all light mode contrast overrides to match new palette

---

### [v1.1.0] — 2026-10-12 · Modern CSS Overhaul

**Design tokens**
- Expanded CSS custom properties: 4-stop gold scale, per-role shadow variables, blur/radius scale
- Added `--border-hover`, `--text-dim`, `--shadow-gold`, `--shadow-ember` tokens

**Buttons**
- `.btn-luxury` — shimmer light-ray sweep on hover using `::after` pseudo-element
- `.btn-primary` — ember gradient with hover-brighten
- `.btn-outline-gold` — replaces plain border button

**Product cards**
- New `.product-card` class with `contain: layout style`
- Lift on hover (`translateY(-4px)`)
- Image wrapper gets gold glow ring + deep shadow on hover
- Add-to-cart button: gold gradient idle → green done state

**Hero section**
- Animated mesh gradient background (slow 15s color drift via `meshMove` keyframe)
- `.section-eyebrow` utility class for section labels

**Shop page**
- Category filters replaced with `.filter-pill` — active state is gold gradient pill with glow shadow

**Cart drawer**
- `.cart-item` with border + hover state
- `.qty-btn` with scale animation on hover
- Shipping progress bar with shimmer fill animation
- Cart badge pulses when items are present (`.cart-badge-pulse`)

**Forms & feedback**
- `.input-luxury` gains hover border before focus
- `.alert-error` / `.alert-success` classes for consistent feedback
- `.spinner` class replaces raw Tailwind border hack for loading state

**Animations added**
- `revealUp`, `slideInRight`, `scaleIn`, `float`, `badgePulse`, `meshMove`
- All animations respect `prefers-reduced-motion`

---

### [v1.0.0] — 2026-10-12 · Initial Release

**Core pages**
- Homepage with hero, product marquee, wave slogans, product grid, opt-in form
- Shop page with category filter and search
- Product detail pages (statically generated)
- Checkout page with delivery slot and payment method selection
- Order confirmation page
- Auth, Account, About, Contact, Careers, Loyalty, Policies, Privacy, Terms pages

**Components**
- `Header` — sticky nav, cart drawer, free shipping progress
- `HeroOrb` — circular auto-rotating product carousel
- `ProductCard` — product grid card with star ratings
- `Pack` — SVG pack illustration with per-product color
- `WaveSlogan` — animated script font slogans
- `OptInForm` — WhatsApp lead capture with country dial codes
- `BackgroundDecorations` — ambient stars / suns
- `ThemeToggle` — dark/light mode switch with persisted preference

**Infrastructure**
- API routes: leads, orders, verify
- Cart context with `localStorage` persistence
- Flat-file order store (`data/orders.json`) for demo
- Razorpay payment integration with signature verification
- Dark/light mode via `html.light` CSS class + `localStorage`
- Noise texture + vignette overlays
- Gold shimmer header line
- Responsive layout (mobile + desktop)
- Bricolage Grotesque display font + DM Sans body + Dancing Script accent

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "feat: add my feature"`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a pull request

---

## 📜 License

Private project — all rights reserved.

---

*Built with ☕ and late-night cravings.*
