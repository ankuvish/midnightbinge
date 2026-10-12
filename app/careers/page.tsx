import Link from "next/link";

const openRoles = [
  { title: "Flavour Development Intern", type: "Full-time · Mumbai", desc: "Work directly with our Head of Flavour to test, iterate and launch new snack variants. Must love eating." },
  { title: "Delivery Operations Lead", type: "Full-time · Mumbai / Delhi", desc: "Own our midnight delivery network. You'll manage rider partners, route optimisation and customer SLAs." },
  { title: "Social Media & Content", type: "Part-time · Remote", desc: "Create content that makes people hungry at midnight. Reels, stories, memes — if it drives cravings, we want it." },
  { title: "Full-Stack Developer", type: "Full-time · Remote", desc: "Help us build the best late-night snack ordering experience on the internet. Next.js, TypeScript, Node." },
];

const perks = [
  { icon: "🍿", label: "Free snacks for life" },
  { icon: "🌙", label: "Flexible midnight hours" },
  { icon: "📈", label: "Early equity options" },
  { icon: "🏠", label: "Remote-first culture" },
  { icon: "🎓", label: "Learning budget ₹30k/yr" },
  { icon: "🎂", label: "Birthday month off" },
];

export default function Careers() {
  return (
    <main className="mx-auto max-w-4xl px-4 pt-16 pb-24">
      <div className="fade-up text-center mb-16">
        <p className="text-xs font-bold tracking-widest text-ember uppercase mb-2">Join us</p>
        <h1 className="font-display text-5xl font-extrabold text-gold-gradient mb-4">Careers</h1>
        <p className="text-mist/60 max-w-lg mx-auto leading-relaxed">
          We're a small, hungry team building something people genuinely love. If that sounds like your kind of place, read on.
        </p>
      </div>

      {/* Perks */}
      <div className="fade-up grid grid-cols-2 sm:grid-cols-3 gap-4 mb-16">
        {perks.map(p => (
          <div key={p.label} className="glass rounded-xl p-4 flex items-center gap-3">
            <span className="text-2xl">{p.icon}</span>
            <span className="text-sm font-semibold text-mist/80">{p.label}</span>
          </div>
        ))}
      </div>

      {/* Open roles */}
      <h2 className="font-display text-2xl font-bold text-moon mb-6 fade-up">Open roles</h2>
      <div className="space-y-4">
        {openRoles.map((r, i) => (
          <div key={r.title} className={`fade-up fade-up-${Math.min(i + 1, 4)} glass rounded-2xl p-6`}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="font-display font-bold text-lg text-moon">{r.title}</h3>
                <p className="text-xs text-ember font-bold tracking-wider mt-0.5">{r.type}</p>
              </div>
              <Link href="/contact"
                className="btn-luxury shrink-0 rounded-full border border-moon/30 px-5 py-2 text-sm font-bold text-moon hover:bg-moon/10 transition-colors">
                Apply →
              </Link>
            </div>
            <p className="text-mist/60 text-sm mt-3 leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 fade-up glass rounded-2xl p-8 text-center">
        <p className="text-3xl mb-3">💌</p>
        <h3 className="font-display font-bold text-xl text-moon mb-2">Don't see your role?</h3>
        <p className="text-mist/60 text-sm mb-5">Send us your CV and tell us why you'd be a great fit. We're always open to exceptional people.</p>
        <Link href="/contact" className="btn-luxury inline-block rounded-full bg-ember px-8 py-3 font-bold text-white glow-ember">
          Get in touch →
        </Link>
      </div>
    </main>
  );
}
