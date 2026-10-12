const policies = [
  {
    icon: "🔄",
    title: "Returns & Refunds",
    points: [
      "Report damaged or incorrect items within 24 hours of delivery",
      "Send a photo to hello@midnightbinge.in with your order ID",
      "Refunds processed in 5–7 business days to original payment method",
      "COD orders refunded via bank transfer within 7 days",
    ],
  },
  {
    icon: "🚚",
    title: "Shipping & Delivery",
    points: [
      "We deliver within selected pincodes in Mumbai, Delhi & Bangalore",
      "Midnight slot (12 am – 2 am) available on all orders above ₹199",
      "Free delivery on orders above ₹499",
      "Flat ₹49 delivery fee on orders below ₹499",
    ],
  },
  {
    icon: "📦",
    title: "Packaging",
    points: [
      "All products are sealed and tamper-evident",
      "We use minimal, recyclable packaging",
      "Cold-chain packaging available for select products",
      "Never reuse or resell returned products",
    ],
  },
  {
    icon: "✅",
    title: "Quality Guarantee",
    points: [
      "All products are manufactured in FSSAI-certified facilities",
      "Batch tested before dispatch",
      "Best-before date clearly printed on every pack",
      "If you're not happy, we'll make it right — no questions asked",
    ],
  },
  {
    icon: "🔒",
    title: "Data & Privacy",
    points: [
      "We never sell your data to third parties",
      "Payments processed by Razorpay (PCI-DSS compliant)",
      "You can request data deletion at any time",
      "Marketing emails include a one-click unsubscribe",
    ],
  },
];

export default function Policies() {
  return (
    <main className="mx-auto max-w-4xl px-4 pt-16 pb-24">
      <div className="fade-up mb-12 text-center">
        <p className="text-xs font-bold tracking-widest text-ember uppercase mb-2">Transparency</p>
        <h1 className="font-display text-5xl font-extrabold text-gold-gradient mb-4">Our Policies</h1>
        <p className="text-mist/60 max-w-lg mx-auto leading-relaxed">
          We believe in being upfront. Here's everything you need to know about how we operate.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {policies.map((p, i) => (
          <div key={p.title} className={`fade-up fade-up-${Math.min(i, 4)} glass rounded-2xl p-6`}>
            <p className="text-4xl mb-3">{p.icon}</p>
            <h2 className="font-display font-bold text-xl text-moon mb-4">{p.title}</h2>
            <ul className="space-y-2">
              {p.points.map(pt => (
                <li key={pt} className="flex items-start gap-2 text-sm text-mist/70">
                  <span className="text-ember mt-0.5 shrink-0">✦</span>{pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
}
