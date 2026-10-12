"use client";
import { useState } from "react";
import { useCart } from "@/lib/cart";

export default function AddButton({ id }: { id: string }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <button
      onClick={handleAdd}
      className={`btn-luxury mt-8 rounded-full px-10 py-3.5 font-bold transition-all duration-300 ${
        added
          ? "bg-green-500/20 text-green-300 border border-green-500/40"
          : "bg-ember text-white glow-ember hover:brightness-110"
      }`}
    >
      {added ? "✓ Added to cart" : "Add to cart"}
    </button>
  );
}
