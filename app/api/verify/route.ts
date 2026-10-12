import { NextResponse } from "next/server";
import crypto from "crypto";
import { updateOrder } from "@/lib/orders";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { id, razorpay_order_id, razorpay_payment_id, razorpay_signature } = body as Record<string, unknown>;

  // Validate all required fields exist and are strings before using in HMAC
  if (
    typeof id !== "string" || !id ||
    typeof razorpay_order_id !== "string" || !razorpay_order_id ||
    typeof razorpay_payment_id !== "string" || !razorpay_payment_id ||
    typeof razorpay_signature !== "string" || !razorpay_signature
  ) {
    return NextResponse.json({ error: "Missing or invalid payment fields." }, { status: 400 });
  }

  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Payment verification is not configured." }, { status: 503 });
  }

  const expected = crypto
    .createHmac("sha256", secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  // Use timingSafeEqual to prevent timing attacks
  const expectedBuf = Buffer.from(expected, "hex");
  const receivedBuf = Buffer.from(razorpay_signature, "hex");

  const valid =
    expectedBuf.length === receivedBuf.length &&
    crypto.timingSafeEqual(expectedBuf, receivedBuf);

  if (!valid) {
    return NextResponse.json({ error: "Payment could not be verified." }, { status: 400 });
  }

  await updateOrder(id, { status: "paid", paymentId: razorpay_payment_id });
  return NextResponse.json({ ok: true });
}
