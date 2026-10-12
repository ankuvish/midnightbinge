"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { useCart } from "@/lib/cart";
import { byId } from "@/lib/products";
import { inr, totals, SLOTS } from "@/lib/pricing";

const SLOT_ICONS: Record<string, string> = {
  [SLOTS[0]]: "🌙",
  [SLOTS[1]]: "🌆",
  [SLOTS[2]]: "☀️",
};

export default function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const router = useRouter();
  const t = totals(subtotal);

  const [f, setF] = useState({ name: "", phone: "", address: "", pincode: "" });
  const [slot, setSlot] = useState(SLOTS[0]);
  const [method, setMethod] = useState("online");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function pay(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      const r = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: lines, customer: f, slot, method }),
      });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      const done = () => { clear(); router.push(`/order/${d.id}`); };
      if (method === "cod") return done();
      const rz = new (window as any).Razorpay({
        key: d.key, amount: d.amount * 100, currency: "INR", order_id: d.rzpId,
        name: "MidnightBinge",
        prefill: { name: f.name, contact: f.phone },
        handler: async (res: any) => {
          const v = await fetch("/api/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: d.id, ...res }) });
          v.ok ? done() : setErr("Payment could not be verified. Contact support with order " + d.id);
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      rz.open();
    } catch (x: any) {
      setErr(x.message || "Something went wrong. Try again.");
      setBusy(false);
    }
  }

  if (!lines.length) return (
    <main className="mx-auto max-w-xl px-4 pt-24 text-center">
      <p className="text-5xl mb-4">🛒</p>
      <p className="text-mist/70 text-lg">Your cart is empty.</p>
    </main>
  );

  return (
    <main className="mx-auto max-w-5xl px-4 pt-12 pb-24 grid md:grid-cols-[1fr_360px] gap-10">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <form onSubmit={pay} className="space-y-8 fade-up">
        <div>
          <p className="text-xs font-bold tracking-widest text-ember uppercase mb-1">Step 1</p>
          <h1 className="font-display text-4xl font-extrabold text-gold-gradient">Checkout</h1>
        </div>

        {/* Delivery details */}
        <section className="space-y-4">
          <h2 className="font-bold text-mist/80 text-sm uppercase tracking-wider">Delivery details</h2>
          {(["name", "phone", "address", "pincode"] as const).map((k, i) => (
            <label key={k} className={`block fade-up fade-up-${i + 1}`}>
              <span className="text-xs font-semibold text-mist/50 uppercase tracking-wider">
                {k === "name" ? "Full name" : k === "phone" ? "Mobile number" : k === "address" ? "Delivery address" : "Pincode"}
              </span>
              <input
                required
                inputMode={k === "phone" || k === "pincode" ? "numeric" : undefined}
                value={f[k]}
                onChange={(e) => setF({ ...f, [k]: e.target.value })}
                className="input-luxury mt-1.5"
                placeholder={k === "name" ? "Your full name" : k === "phone" ? "10-digit mobile" : k === "address" ? "House, street, area" : "6-digit pincode"}
              />
            </label>
          ))}
        </section>

        {/* Delivery slot */}
        <section className="space-y-3">
          <h2 className="font-bold text-mist/80 text-sm uppercase tracking-wider">Delivery slot</h2>
          <div className="grid gap-3">
            {SLOTS.map((s) => (
              <div
                key={s}
                onClick={() => setSlot(s)}
                className={`slot-card flex items-center gap-4 ${slot === s ? "selected" : ""}`}
              >
                <span className="text-2xl">{SLOT_ICONS[s] ?? "📦"}</span>
                <div className="flex-1">
                  <p className="font-semibold">{s}</p>
                </div>
                <div className={`size-5 rounded-full border-2 grid place-items-center transition-colors ${slot === s ? "border-moon bg-moon" : "border-white/30"}`}>
                  {slot === s && <span className="size-2 rounded-full bg-ink block" />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Payment */}
        <section className="space-y-3">
          <h2 className="font-bold text-mist/80 text-sm uppercase tracking-wider">Payment</h2>
          <div className="grid gap-3">
            {[
              { id: "online", label: "UPI, card or netbanking", icon: "💳" },
              { id: "cod",    label: "Cash on delivery",        icon: "💵" },
            ].map((m) => (
              <div
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`pay-card flex items-center gap-4 ${method === m.id ? "selected" : ""}`}
              >
                <span className="text-2xl">{m.icon}</span>
                <p className="flex-1 font-semibold">{m.label}</p>
                <div className={`size-5 rounded-full border-2 grid place-items-center transition-colors ${method === m.id ? "border-ember bg-ember" : "border-white/30"}`}>
                  {method === m.id && <span className="size-2 rounded-full bg-white block" />}
                </div>
              </div>
            ))}
          </div>
        </section>

        {err && <p role="alert" className="alert-error">{err}</p>}

        <button
          disabled={busy}
          className="btn-luxury w-full rounded-full bg-ember py-4 font-bold text-white text-lg glow-ember disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {busy ? (
            <span className="flex items-center justify-center gap-2.5">
              <span className="spinner" />
              Processing…
            </span>
          ) : method === "cod" ? "Place order" : `Pay ${inr(t.total)}`}
        </button>
      </form>

      {/* Order summary */}
      <aside className="glass rounded-2xl p-6 h-fit sticky top-24 fade-up fade-up-2">
        <h2 className="font-display font-bold text-lg mb-5">Order summary</h2>
        <div className="space-y-3">
          {lines.map((l) => {
            const p = byId(l.id)!;
            return (
              <div key={l.id} className="flex justify-between text-sm">
                <span className="text-mist/80">{p.name} <span className="text-mist/40">× {l.qty}</span></span>
                <span className="font-medium">{inr(p.price * l.qty)}</span>
              </div>
            );
          })}
        </div>
        <div className="border-t border-white/10 mt-4 pt-4 space-y-2 text-sm">
          <div className="flex justify-between text-mist/70">
            <span>Subtotal</span><span>{inr(t.subtotal)}</span>
          </div>
          <div className="flex justify-between text-mist/70">
            <span>Delivery</span>
            <span className={t.shipping === 0 ? "text-green-400" : ""}>{t.shipping ? inr(t.shipping) : "Free"}</span>
          </div>
          <div className="flex justify-between font-bold text-base pt-2 border-t border-white/10">
            <span>Total <span className="text-xs font-normal text-mist/40">(incl. GST)</span></span>
            <span className="text-moon">{inr(t.total)}</span>
          </div>
        </div>
      </aside>
    </main>
  );
}
