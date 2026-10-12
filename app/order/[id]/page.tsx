import { notFound } from "next/navigation";
import Link from "next/link";
import { readOrders } from "@/lib/orders";
import { inr } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export default async function Order({ params }: { params: { id: string } }) {
  // Validate id format before querying — prevents log pollution from path traversal attempts
  if (!/^MB[A-F0-9]{8}$/.test(params.id ?? "")) notFound();

  const o = (await readOrders()).find((x) => x.id === params.id);
  if (!o) notFound();

  // Redact PII — the order page is publicly accessible by ID.
  // Never display full phone, address or customer name on the confirmation page.
  const maskedPhone = typeof o.customer?.phone === "string"
    ? o.customer.phone.replace(/(\d{2})\d+(\d{2})$/, "$1••••••$2")
    : "";

  return (
    <main className="mx-auto max-w-xl px-4 pt-16 pb-24 fade-up">
      {/* Success icon */}
      <div className="size-20 rounded-full bg-green-500/15 border border-green-500/30 grid place-items-center mx-auto mb-8">
        <span className="text-4xl">✓</span>
      </div>

      <h1 className="font-display text-4xl font-extrabold text-gold-gradient text-center">Order confirmed!</h1>
      <p className="mt-2 text-mist/50 text-center text-sm">#{o.id}</p>

      <div className="glass rounded-2xl p-6 mt-8 space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-2xl">🕐</span>
          <div>
            <p className="text-mist/50 text-xs uppercase tracking-wider">Delivery slot</p>
            <p className="font-semibold">{o.slot}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="text-2xl">{o.method === "cod" ? "💵" : "💳"}</span>
          <div>
            <p className="text-mist/50 text-xs uppercase tracking-wider">Payment</p>
            <p className="font-semibold">
              {o.method === "cod" ? `Pay ${inr(o.total)} in cash on delivery` : `Paid ${inr(o.total)} online`}
            </p>
          </div>
        </div>
        {maskedPhone && (
          <div className="flex items-center gap-3 text-sm">
            <span className="text-2xl">📱</span>
            <div>
              <p className="text-mist/50 text-xs uppercase tracking-wider">Contact</p>
              <p className="font-semibold">{maskedPhone}</p>
            </div>
          </div>
        )}
      </div>

      <div className="glass rounded-2xl p-6 mt-4">
        <h2 className="font-bold text-sm uppercase tracking-wider text-mist/50 mb-4">Items</h2>
        <ul className="space-y-2">
          {o.lines.map((l: { id: string; name: string; price: number; qty: number }) => (
            <li key={l.id} className="flex justify-between text-sm">
              <span className="text-mist/80">{l.name} <span className="text-mist/40">× {l.qty}</span></span>
              <span className="font-medium">{inr(l.price * l.qty)}</span>
            </li>
          ))}
        </ul>
        <div className="border-t border-white/10 mt-4 pt-4 flex justify-between font-bold">
          <span>Total</span>
          <span className="text-moon">{inr(o.total)}</span>
        </div>
      </div>

      <Link href="/shop" className="btn-luxury mt-8 block text-center rounded-full bg-moon text-ink px-8 py-3.5 font-bold">
        Keep shopping →
      </Link>
    </main>
  );
}
