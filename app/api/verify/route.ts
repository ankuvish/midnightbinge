import { NextResponse } from "next/server"; import crypto from "crypto"; import { updateOrder } from "@/lib/orders";
export async function POST(req: Request) {
  const { id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();
  const sig = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "").update(`${razorpay_order_id}|${razorpay_payment_id}`).digest("hex");
  if (sig !== razorpay_signature) return NextResponse.json({ error: "Payment could not be verified." }, { status: 400 });
  await updateOrder(id, { status: "paid", paymentId: razorpay_payment_id });
  return NextResponse.json({ ok: true });
}
