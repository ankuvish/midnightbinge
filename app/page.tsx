import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import HeroOrb from "@/components/HeroOrb";
import WaveSlogan from "@/components/WaveSlogan";
import OptInForm from "@/components/OptInForm";

const claims = ["Roasted in olive oil", "Gluten free", "No added preservatives", "Non-GMO", "Midnight delivery slots"];

export default function Home() {
  const firstRow = products.slice(0, 3);
  const secondRow = products.slice(3);

  return (
    <main>
      {/* Hero */}
      <section className="relative mx-auto max-w-6xl px-4 pt-24 pb-20 grid md:grid-cols-2 gap-12 items-center overflow-hidden">
        {/* Animated mesh layer */}
        <div className="hero-mesh rounded-3xl" />
        <div className="pointer-events-none absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-moon/10 blur-[120px]" />

        <div className="fade-up">
          <span className="section-eyebrow mb-4 border border-ember/30 rounded-full px-3 py-1">Late-night snacking, elevated</span>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold leading-[0.93] text-gold-gradient mt-4 hero-heading">
            Snacks for the hours after midnight.
          </h1>
          <p className="mt-6 text-lg text-mist/70 max-w-md leading-relaxed">
            Light, crunchy and made to be finished in one sitting. Order now and pick a delivery slot that suits your night.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/shop" className="btn-luxury btn-primary inline-block rounded-full px-8 py-3.5 glow-ember shadow-lg">
              Shop the range
            </Link>
            <Link href="/shop" className="btn-luxury btn-outline-gold inline-block rounded-full px-8 py-3.5 font-bold transition-colors">
              See all flavours
            </Link>
          </div>
        </div>

        <HeroOrb />
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-white/5 py-3" style={{ background: "rgba(46,8,8,0.85)" }}>
        <div className="marquee text-sm text-mist/60 font-medium">
          {[...claims, ...claims, ...claims, ...claims].map((c, i) => (
            <span key={i} className="px-8 whitespace-nowrap">✦ {c}</span>
          ))}
        </div>
      </div>

      {/* Slogan 1 */}
      <div className="mx-auto max-w-6xl">
        <WaveSlogan text="Your cravings called.<br/>We answered at midnight." align="center" />
      </div>

      {/* Products — first row */}
      <section className="mx-auto max-w-6xl px-4 mt-16">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-bold tracking-widest text-ember uppercase mb-2">The range</p>
            <h2 className="font-display text-4xl font-bold text-gold-gradient">Our snacks</h2>
          </div>
          <Link href="/shop" className="text-sm text-mist/60 hover:text-moon transition-colors">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {firstRow.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Slogan 2 */}
      <div className="mx-auto max-w-6xl">
        <WaveSlogan text="Every bite tells you — just one more." sub="— the MidnightBinge promise" align="center" />
      </div>

      {/* Products — second row */}
      <section className="mx-auto max-w-6xl px-4 mt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {secondRow.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      {/* Slogan 3 */}
      <div className="mx-auto max-w-6xl">
        <WaveSlogan text="Midnight is just an excuse<br/>to eat something incredible." align="center" />
      </div>

      {/* Opt-in */}
      <OptInForm />

    </main>
  );
}
