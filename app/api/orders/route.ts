import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { byId } from "@/lib/products";
import { totals, SLOTS } from "@/lib/pricing";
import { saveOrder } from "@/lib/orders";

// Max request body: 8 KB — prevents large-payload DoS
const MAX_BODY = 8 * 1024;

// Sanitize a string: trim and strip HTML/script tags
function sanitize(s: unknown, maxLen = 200): string {
  if (typeof s !== "string") return "";
  return s.trim().replace(/<[^>]*>/g, "").slice(0, maxLen);
}

export async function POST(req: Request) {
  // Body size guard
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { items, customer, slot, method } = body as Record<string, unknown>;

  // Validate items
  if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
    return NextResponse.json({ error: "Your cart is empty or invalid." }, { status: 400 });
  }

  // Validate customer fields — sanitize to prevent XSS in order records
  const name    = sanitize(customer && typeof customer === "object" ? (customer as any).name    : "", 120);
  const phone   = sanitize(customer && typeof customer === "object" ? (customer as any).phone   : "", 15);
  const address = sanitize(customer && typeof customer === "object" ? (customer as any).address : "", 300);
  const pincode = sanitize(customer && typeof customer === "object" ? (customer as any).pincode : "", 10);

  if (!name) return NextResponse.json({ error: "Enter your full name." }, { status: 400 });
  if (!/^[6-9]\d{9}$/.test(phone)) return NextResponse.json({ error: "Enter a valid 10-digit mobile number." }, { status: 400 });
  if (!address) return NextResponse.json({ error: "Enter your delivery address." }, { status: 400 });
  if (!/^\d{6}$/.test(pincode)) return NextResponse.json({ error: "Enter a valid 6-digit pincode." }, { status: 400 });

  // Validate slot
  if (!SLOTS.includes(slot as string)) {
    return NextResponse.json({ error: "Choose a valid delivery slot." }, { status: 400 });
  }

  // Validate payment method
  if (!["online", "cod"].includes(method as string)) {
    return NextResponse.json({ error: "Choose a valid payment method." }, { status: 400 });
  }

  // Validate & price items server-side (never trust client prices)
  let subtotal = 0;
  const lines: { id: string; name: string; price: number; qty: number }[] = [];

  for (const it of items) {
    if (!it || typeof it !== "object") {
      return NextResponse.json({ error: "Invalid item in cart." }, { status: 400 });
    }
    const { id, qty } = it as Record<string, unknown>;
    const p = byId(String(id ?? ""));
    const q = Math.floor(Number(qty));
    if (!p || !Number.isFinite(q) || q < 1 || q > 20) {
      return NextResponse.json({ error: "Invalid item in cart." }, { status: 400 });
    }
    subtotal += p.price * q;
    lines.push({ id: p.id, name: p.name, price: p.price, qty: q });
  }

  const t = totals(subtotal);
  const id = "MB" + randomUUID().slice(0, 8).toUpperCase();

  let rzpId: string | undefined;

  if (method === "online") {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !secret) {
      return NextResponse.json(
        { error: "Online payment is not set up yet. Choose Cash on Delivery." },
        { status: 503 }
      );
    }

    try {
      const r = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " + Buffer.from(`${keyId}:${secret}`).toString("base64"),
        },
        body: JSON.stringify({ amount: t.total * 100, currency: "INR", receipt: id }),
      });

      if (!r.ok) {
        return NextResponse.json({ error: "Payment gateway is unavailable. Try again." }, { status: 502 });
      }

      rzpId = (await r.json()).id;
    } catch {
      return NextResponse.json({ error: "Could not reach payment gateway. Try again." }, { status: 502 });
    }
  }

  await saveOrder({
    id,
    lines,
    ...t,
    customer: { name, phone, address, pincode },
    slot,
    method,
    status: method === "online" ? "awaiting_payment" : "confirmed",
    rzpId,
    createdAt: new Date().toISOString(),
  });

  // Only send the Razorpay public key when actually needed
  const response: Record<string, unknown> = { id, amount: t.total, rzpId };
  if (method === "online") {
    response.key = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
  }

  return NextResponse.json(response);
}
