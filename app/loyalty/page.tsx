import Link from "next/link";

const tiers = [
  { name: "Night Owl", min: 0, max: 499, icon: "🦉", perks: ["1 point per ₹10 spent", "Birthday surprise", "Early access to new flavours"] },
  { name: "Midnight Snacker", min: 500, max: 1499, icon: "🌙", perks: ["1.5 points per ₹10 spent", "Free delivery on all orders", "Exclusive member deals"] },
  { name: "Binge Legend", min: 1500, max: Infinity, icon: "⭐", perks: ["2 points per ₹10 spent", "Priority midnight delivery", "Free product every month", "VIP tasting invites"] },
];

const howTo = [
  { icon: "🛒", action: "Place an order", points: "+10 pts per ₹100" },
  { icon: "⭐", action: "Leave a review", points: "+25 pts" },
  { icon: "📲", action: "Follow us on Instagram", points: "+50 pts" },
  { icon: "🎂", action: "Birthday bonus", points: "+100 pts" },
  { icon: "👥", action: "Refer a friend", points: "+200 pts" },
];

export default function Loyalty() {
  return (
    <main className="mx-auto max-w-4xl px-4 pt-16 pb-24">
      <div className="fade-up text-center mb-16">
        <p className="text-xs font-bold tracking-widest text-ember uppercase mb-2">Rewards</p>
        <h1 className="font-display text-5xl font-extrabold text-gold-gradient mb-4">My Loyalty Points</h1>
        <p className="text-mist/60 max-w-lg mx-auto leading-relaxed">
          Every snack you order earns you points. Redeem them for free products, discounts and exclusive perks.
        </p>
      </div>

      {/* Current balance placeholder */}
      <div className="fade-up glass rounded-2xl p-8 text-center mb-12">
        <p className="text-xs font-bold tracking-widest text-ember uppercase mb-3">Your balance</p>
        <p className="font-display text-7xl font-extrabold text-gold-gradient">0</p>
        <p className="text-mist/50 mt-1">points</p>
        <p className="text-xs text-mist/30 mt-4">Sign in to see your real balance</p>
      </div>

      {/* Tiers */}
      <div className="fade-up mb-16">
        <h2 className="font-display text-2xl font-bold text-moon mb-6 text-center">Membership tiers</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {tiers.map((t, i) => (
            <div key={t.name} className={`glass rounded-2xl p-6 flex flex-col fade-up fade-up-${i + 1} ${i === 2 ? "border-moon/30" : ""}`}>
              <p className="text-4xl mb-3">{t.icon}</p>
              <h3 className="font-display font-bold text-lg text-moon">{t.name}</h3>
              <p className="text-xs text-mist/40 mb-4">{t.min}–{t.max === Infinity ? "∞" : t.max} pts</p>
              <ul className="space-y-2 mt-auto">
                {t.perks.map(p => (
                  <li key={p} className="flex items-start gap-2 text-sm text-mist/70">
                    <span className="text-ember mt-0.5">✦</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* How to earn */}
      <div className="fade-up">
        <h2 className="font-display text-2xl font-bold text-moon mb-6 text-center">How to earn points</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {howTo.map(h => (
            <div key={h.action} className="glass rounded-xl p-4 flex items-center gap-4">
              <span className="text-3xl">{h.icon}</span>
              <div className="flex-1">
                <p className="font-semibold text-sm">{h.action}</p>
              </div>
              <span className="text-xs font-bold text-ember shrink-0">{h.points}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center fade-up">
        <Link href="/shop" className="btn-luxury inline-block rounded-full bg-ember px-10 py-3.5 font-bold text-white glow-ember">
          Start earning →
        </Link>
      </div>
    </main>
  );
}
