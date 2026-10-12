import Link from "next/link";

const values = [
  { icon: "🌙", title: "Born at midnight", body: "MidnightBinge started as a personal frustration — why are all the good snacks gone by 10 pm? We built the brand we wished existed." },
  { icon: "🌿", title: "Real ingredients", body: "No artificial colours, no mystery preservatives. Every ingredient on our label is something you can pronounce and feel good about eating." },
  { icon: "🔥", title: "Bold flavours", body: "We don't do bland. Every flavour is tested obsessively until it hits that perfect balance of crunch, seasoning and satisfaction." },
  { icon: "🚀", title: "Midnight delivery", body: "We built our logistics around the hours everyone else ignores. Order at 11 pm, get it by 1 am. That's the promise." },
];

const team = [
  { name: "Aryan Mehta", role: "Founder & Chief Snacker", emoji: "👨‍🍳" },
  { name: "Priya Nair", role: "Head of Flavour", emoji: "👩‍🔬" },
  { name: "Rohan Das", role: "Logistics & Ops", emoji: "🚚" },
];

export default function About() {
  return (
    <main className="mx-auto max-w-5xl px-4 pt-16 pb-24">

      {/* Hero */}
      <div className="fade-up text-center mb-20">
        <p className="text-xs font-bold tracking-widest text-ember uppercase mb-2">Our story</p>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold text-gold-gradient mb-6 leading-tight">
          Why We Exist
        </h1>
        <p className="font-script text-2xl md:text-3xl text-moon/80 max-w-2xl mx-auto leading-relaxed"
          style={{ filter: "drop-shadow(0 0 16px rgba(232,201,122,.2))" }}>
          Because midnight hunger deserves better than stale chips from a vending machine.
        </p>
      </div>

      {/* Values */}
      <div className="grid sm:grid-cols-2 gap-6 mb-20">
        {values.map((v, i) => (
          <div key={v.title} className={`fade-up fade-up-${i + 1} glass rounded-2xl p-7`}>
            <p className="text-4xl mb-4">{v.icon}</p>
            <h2 className="font-display font-bold text-xl text-moon mb-2">{v.title}</h2>
            <p className="text-mist/65 leading-relaxed">{v.body}</p>
          </div>
        ))}
      </div>

      {/* Mission statement */}
      <div className="fade-up text-center my-20 px-4">
        <p className="font-script leading-tight text-moon"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)", filter: "drop-shadow(0 0 20px rgba(232,201,122,.25))" }}>
          "Every bite tells you — just one more."
        </p>
        <p className="text-xs font-bold tracking-widest text-mist/30 uppercase mt-4">— The MidnightBinge promise</p>
      </div>

      {/* Team */}
      <div className="fade-up">
        <h2 className="font-display text-3xl font-bold text-gold-gradient text-center mb-10">The team</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <div key={m.name} className={`fade-up fade-up-${i + 1} glass rounded-2xl p-6 text-center`}>
              <p className="text-5xl mb-4">{m.emoji}</p>
              <p className="font-display font-bold text-moon">{m.name}</p>
              <p className="text-xs text-mist/50 mt-1">{m.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 text-center fade-up">
        <Link href="/shop" className="btn-luxury inline-block rounded-full bg-ember px-10 py-3.5 font-bold text-white glow-ember">
          Try our snacks →
        </Link>
      </div>
    </main>
  );
}
