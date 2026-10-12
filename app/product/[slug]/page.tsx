import { notFound } from "next/navigation";
import Link from "next/link";
import { bySlug, products } from "@/lib/products";
import { inr } from "@/lib/pricing";
import Pack from "@/components/Pack";
import AddButton from "./AddButton";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-px" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(Math.max(rating - (i - 1), 0), 1);
        return (
          <span key={i} className="relative inline-block text-base leading-none">
            <span className="text-white/15">★</span>
            <span className="absolute inset-0 overflow-hidden text-moon" style={{ width: `${fill * 100}%` }}>★</span>
          </span>
        );
      })}
    </div>
  );
}

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export default function Page({ params }: { params: { slug: string } }) {
  const p = bySlug(params.slug);
  if (!p) notFound();
  const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);
  const others = products.filter((x) => x.id !== p.id);

  return (
    <main className="mx-auto max-w-5xl px-4 pt-12 pb-24">

      {/* Main product */}
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div className="fade-up">
          <Pack name={p.name} color={p.color} weight={p.weight} />
        </div>

        <div className="fade-up fade-up-1">
          <p className="text-xs font-bold tracking-widest text-ember uppercase">{p.category} · {p.weight}</p>
          <h1 className="font-display text-4xl font-extrabold text-gold-gradient mt-2 leading-tight">{p.name}</h1>
          <div className="flex items-center gap-2 mt-3">
            <Stars rating={p.rating} />
            <span className="text-sm text-mist/50">{p.rating.toFixed(1)} · {p.reviewCount} reviews</span>
          </div>
          <p className="mt-5 text-mist/70 leading-relaxed">{p.blurb}</p>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-3xl font-bold">{inr(p.price)}</span>
            <s className="text-mist/40 text-lg mb-0.5">{inr(p.mrp)}</s>
            {discount > 0 && <span className="badge-discount mb-1">{discount}% off</span>}
          </div>
          <p className="text-xs text-mist/40 mt-1">Inclusive of all taxes</p>

          <AddButton id={p.id} />
        </div>
      </div>

      {/* More flavours */}
      <div className="mt-20">
        <div className="divider-gold mb-8" />
        <p className="text-xs font-bold tracking-widest text-ember uppercase mb-2">Explore</p>
        <h2 className="font-display text-2xl font-bold text-gold-gradient mb-8">More flavours</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {others.map((o, i) => {
            const otherDiscount = Math.round(((o.mrp - o.price) / o.mrp) * 100);
            return (
              <Link
                key={o.id}
                href={`/product/${o.slug}`}
                className={`group fade-up fade-up-${Math.min(i + 1, 4)} glass rounded-2xl p-3 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-moon/30`}
              >
                {/* mini pack with zoom */}
                <div className="overflow-hidden rounded-xl">
                  <div className="transition-transform duration-500 ease-out group-hover:scale-105">
                    <Pack name={o.name} color={o.color} weight={o.weight} />
                  </div>
                </div>

                <div className="mt-3 flex-1">
                  <p className="font-display font-bold text-sm leading-snug group-hover:text-moon transition-colors line-clamp-2">
                    {o.name}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="text-sm font-bold">{inr(o.price)}</span>
                    {otherDiscount > 0 && (
                      <span className="badge-discount">{otherDiscount}%</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      {/* Slogan */}
      <div className="mt-20 pb-4 text-center">
        <p
          className="slogan-draw font-script"
          style={{
            fontSize: "clamp(3.5rem, 9vw, 7rem)",
            lineHeight: 1.1,
            color: "#E8C97A",
            filter: "drop-shadow(0 0 28px rgba(232,201,122,.45))",
          }}
        >
          Never Underestimate Your Taste
        </p>
      </div>
    </main>
  );
}
