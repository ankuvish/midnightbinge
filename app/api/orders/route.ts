import { NextResponse } from "next/server"; import { randomUUID } from "crypto";
import { byId } from "@/lib/products"; import { totals, SLOTS } from "@/lib/pricing"; import { saveOrder } from "@/lib/orders";
export async function POST(req: Request) {
  const b = await req.json(); const { items, customer, slot, method } = b;
  if (!Array.isArray(items) || !items.length) return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  if (!customer?.name || !/^[6-9]\d{9}$/.test(customer?.phone || "") || !customer?.address || !/^\d{6}$/.test(customer?.pincode || ""))
    return NextResponse.json({ error: "Enter a name, 10-digit mobile number, address and 6-digit pincode." }, { status: 400 });
  if (!SLOTS.includes(slot)) return NextResponse.json({ error: "Choose a delivery slot." }, { status: 400 });
  let subtotal = 0; const lines = [];
  for (const it of items) { const p = byId(it.id); const qty = Math.floor(it.qty); if (!p || qty < 1 || qty > 20) return NextResponse.json({ error: "Invalid item in cart." }, { status: 400 }); subtotal += p.price * qty; lines.push({ id: p.id, name: p.name, price: p.price, qty }); }
  const t = totals(subtotal); const id = "MB" + randomUUID().slice(0, 8).toUpperCase();
  const keyId = process.env.RAZORPAY_KEY_ID, secret = process.env.RAZORPAY_KEY_SECRET;
  let rzpId: string | undefined;
  if (method === "online") {
    if (!keyId || !secret) return NextResponse.json({ error: "Online payment is not set up yet. Choose cash on delivery." }, { status: 503 });
    const r = await fetch("https://api.razorpay.com/v1/orders", { method: "POST", headers: { "Content-Type": "application/json", Authorization: "Basic " + Buffer.from(`${keyId}:${secret}`).toString("base64") }, body: JSON.stringify({ amount: t.total * 100, currency: "INR", receipt: id }) });
    if (!r.ok) return NextResponse.json({ error: "Payment gateway is unavailable. Try again." }, { status: 502 });
    rzpId = (await r.json()).id;
  }
  await saveOrder({ id, lines, ...t, customer, slot, method, status: method === "online" ? "awaiting_payment" : "confirmed", rzpId, createdAt: new Date().toISOString() });
  return NextResponse.json({ id, amount: t.total, rzpId, key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID });
}
