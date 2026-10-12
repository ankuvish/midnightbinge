"use client";
import { useState } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

const cats = ["All", "Makhana", "Chips", "Nuts"];

export default function Shop() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const list = products.filter(
    (p) => (cat === "All" || p.category === cat) && p.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <main className="mx-auto max-w-6xl px-4 pt-12 pb-24">
      <div className="fade-up">
        <p className="text-xs font-bold tracking-widest text-ember uppercase mb-2">Browse</p>
        <h1 className="font-display text-4xl font-extrabold text-gold-gradient">Shop</h1>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 items-center fade-up fade-up-1">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`btn-luxury rounded-full px-5 py-2 text-sm font-semibold border transition-all ${
              cat === c
                ? "bg-moon text-ink border-moon"
                : "border-white/20 text-mist/70 hover:border-moon/40 hover:text-moon"
            }`}
          >
            {c}
          </button>
        ))}
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search snacks…"
          aria-label="Search snacks"
          className="input-luxury ml-auto w-48 md:w-64"
        />
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
        {list.map((p) => <ProductCard key={p.id} p={p} />)}
      </div>

      {list.length === 0 && (
        <div className="mt-20 text-center">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-mist/60">No snacks match that search.</p>
        </div>
      )}
    </main>
  );
}
