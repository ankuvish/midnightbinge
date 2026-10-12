"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { useCart } from "@/lib/cart";
import { inr, FREE_SHIP_ABOVE } from "@/lib/pricing";
import { byId } from "@/lib/products";

export default function Header() {
  const { count, open, setOpen, lines, setQty, subtotal } = useCart();
  const progress = Math.min((subtotal / FREE_SHIP_ABOVE) * 100, 100);

  return (
    <>
      <header
        className="sticky top-0 z-40"
        style={{
          background: "var(--header-bg)",
          backdropFilter: "blur(28px)",
          WebkitBackdropFilter: "blur(28px)",
          boxShadow: "0 1px 0 var(--border), 0 8px 40px rgba(0,0,0,0.25)",
        }}
      >
        {/* gold shimmer line at top */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] header-shimmer-line" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">

          {/* Brand */}
          <Link href="/" className="group flex items-center gap-2">
            <span
              className="font-display text-xl font-extrabold tracking-tight text-gold-gradient"
              style={{ filter: "drop-shadow(0 0 10px rgba(232,201,122,.35))" }}
            >
              MidnightBinge
            </span>
            <span className="text-xs opacity-60 group-hover:opacity-100 transition-opacity" style={{ color: "var(--gold)" }}>✦</span>
          </Link>

          {/* Nav */}
          <nav className="flex items-center gap-5 text-sm">

            <Link href="/shop" className="nav-link">Shop</Link>
            <Link href="/about" className="nav-link">About</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
            <Link href="/auth" className="nav-link">Sign in</Link>

            <ThemeToggle />

            {/* Cart */}
            <button
              onClick={() => setOpen(true)}
              className="relative flex items-center gap-2 rounded-full px-4 py-1.5 font-bold text-sm cart-btn"
              aria-label="Open cart"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Cart
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-ember text-white text-[10px] font-bold grid place-items-center shadow-lg">
                  {count}
                </span>
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />

      {/* Cart drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md glass flex flex-col transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Cart"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
          <h2 className="font-display text-2xl font-bold">Your cart</h2>
          <button
            onClick={() => setOpen(false)}
            className="size-9 rounded-full border border-white/20 grid place-items-center hover:bg-white/10 transition-colors text-lg"
            aria-label="Close cart"
          >×</button>
        </div>

        {subtotal < FREE_SHIP_ABOVE && subtotal > 0 && (
          <div className="px-6 pt-4">
            <p className="text-xs text-mist/60 mb-1.5">Add {inr(FREE_SHIP_ABOVE - subtotal)} more for free delivery</p>
            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-moon transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}
        {subtotal >= FREE_SHIP_ABOVE && subtotal > 0 && (
          <p className="px-6 pt-4 text-xs text-green-400 font-medium">✓ You get free delivery!</p>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {lines.length === 0 && (
            <div className="mt-16 text-center">
              <p className="text-4xl mb-4">🌙</p>
              <p className="text-mist/60">Your cart is empty.</p>
              <p className="text-mist/40 text-sm mt-1">Pick something crunchy from the shop.</p>
            </div>
          )}
          {lines.map((l) => {
            const p = byId(l.id)!;
            return (
              <div key={l.id} className="flex items-center gap-4 rounded-xl bg-white/5 p-3">
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{p.name}</p>
                  <p className="text-sm text-mist/50">{inr(p.price)} · {p.weight}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button className="size-8 rounded-full border border-white/20 hover:bg-white/10 transition-colors grid place-items-center" onClick={() => setQty(l.id, l.qty - 1)} aria-label="Decrease">−</button>
                  <span className="w-5 text-center font-bold">{l.qty}</span>
                  <button className="size-8 rounded-full border border-white/20 hover:bg-white/10 transition-colors grid place-items-center" onClick={() => setQty(l.id, l.qty + 1)} aria-label="Increase">+</button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-white/10 px-6 py-5 space-y-4">
          <div className="flex justify-between font-bold text-lg">
            <span>Subtotal</span>
            <span>{inr(subtotal)}</span>
          </div>
          <Link
            href="/checkout"
            onClick={() => setOpen(false)}
            className={`btn-luxury block text-center rounded-full py-3.5 font-bold transition-all ${lines.length ? "bg-ember text-white glow-ember" : "bg-white/10 text-mist/40 pointer-events-none"}`}
          >
            Go to checkout →
          </Link>
        </div>
      </aside>
    </>
  );
}
