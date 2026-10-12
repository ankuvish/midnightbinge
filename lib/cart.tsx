"use client";
import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { byId } from "./products";
type Line = { id: string; qty: number };
type Ctx = { lines: Line[]; add: (id: string) => void; setQty: (id: string, q: number) => void; clear: () => void; count: number; subtotal: number; open: boolean; setOpen: (b: boolean) => void };
const C = createContext<Ctx>(null as unknown as Ctx);
export const useCart = () => useContext(C);
export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]); const [open, setOpen] = useState(false);
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("mb-cart") || "[]");
      // Validate schema — each line must have a string id and positive integer qty
      if (Array.isArray(raw)) {
        const valid = raw.filter(
          (l: unknown) =>
            l !== null &&
            typeof l === "object" &&
            typeof (l as any).id === "string" &&
            Number.isInteger((l as any).qty) &&
            (l as any).qty > 0
        );
        setLines(valid);
      }
    } catch {
      // Corrupted localStorage — start fresh
      localStorage.removeItem("mb-cart");
    }
  }, []);
  useEffect(() => { localStorage.setItem("mb-cart", JSON.stringify(lines)); }, [lines]);
  const v = useMemo<Ctx>(() => ({
    lines, open, setOpen,
    add: (id) => { setLines((l) => l.some((x) => x.id === id) ? l.map((x) => x.id === id ? { ...x, qty: Math.min(x.qty + 1, 20) } : x) : [...l, { id, qty: 1 }]); setOpen(true); },
    setQty: (id, q) => setLines((l) => q <= 0 ? l.filter((x) => x.id !== id) : l.map((x) => x.id === id ? { ...x, qty: Math.min(q, 20) } : x)),
    clear: () => setLines([]),
    count: lines.reduce((a, l) => a + l.qty, 0),
    subtotal: lines.reduce((a, l) => a + (byId(l.id)?.price ?? 0) * l.qty, 0),
  }), [lines, open]);
  return <C.Provider value={v}>{children}</C.Provider>;
}
