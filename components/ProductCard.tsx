"use client";
import Link from "next/link";
import { useState } from "react";

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-px" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.min(Math.max(rating - (i - 1), 0), 1);
        return (
          <span key={i} className="relative inline-block text-sm leading-none">
            <span className="text-white/15">★</span>
            <span
              className="absolute inset-0 overflow-hidden text-moon"
              style={{ width: `${fill * 100}%` }}
            >★</span>
          </span>
        );
      })}
    </div>
  );
}
import { Product } from "@/lib/products";
import { inr } from "@/lib/pricing";
import { useCart } from "@/lib/cart";
import Pack from "./Pack";

export default function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const discount = Math.round(((p.mrp - p.price) / p.mrp) * 100);

  function handleAdd() {
    add(p.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <div className="group flex flex-col">
      <Link href={`/product/${p.slug}`} className="relative block overflow-hidden rounded-2xl">
        <div className="transition-transform duration-500 ease-out group-hover:scale-105">
          <Pack name={p.name} color={p.color} weight={p.weight} />
        </div>
        {discount > 0 && (
          <span className="badge-discount absolute top-3 left-3">{discount}% off</span>
        )}
      </Link>

      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <Link href={`/product/${p.slug}`} className="font-display font-bold leading-snug hover:text-moon transition-colors">
            {p.name}
          </Link>
          <div className="flex items-center gap-1.5 mt-1">
            <Stars rating={p.rating} />
            <span className="text-xs text-mist/40">{p.rating.toFixed(1)} ({p.reviewCount})</span>
          </div>
          <p className="text-xs text-mist/50 mt-0.5">{p.weight}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="font-bold">{inr(p.price)}</p>
          <s className="text-xs text-mist/40">{inr(p.mrp)}</s>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className={`btn-luxury mt-4 w-full rounded-full py-2.5 font-bold text-sm transition-all duration-300 ${
          added
            ? "bg-green-500/20 text-green-300 border border-green-500/40"
            : "bg-moon text-ink hover:bg-white"
        }`}
      >
        {added ? "✓ Added" : "Add to cart"}
      </button>
    </div>
  );
}
