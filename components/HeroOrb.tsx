"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { products } from "@/lib/products";
import Pack from "@/components/Pack";

export default function HeroOrb() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function startAuto() {
    intervalRef.current = setInterval(() => {
      setActive((i) => (i + 1) % products.length);
    }, 2500);
  }

  useEffect(() => {
    startAuto();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  function handleEnter(i: number) {
    setHovered(true);
    setActive(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }

  function handleLeave() {
    setHovered(false);
    startAuto();
  }

  function goTo(i: number) {
    setActive(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAuto();
  }

  function prev() {
    setActive((i) => (i - 1 + products.length) % products.length);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAuto();
  }

  function next() {
    setActive((i) => (i + 1) % products.length);
    if (intervalRef.current) clearInterval(intervalRef.current);
    startAuto();
  }

  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const r = cx - 12;

  const angleDeg = 130;
  const angleRad = (angleDeg * Math.PI) / 180;
  const px = cx + r * Math.cos(angleRad);
  const py = cy + r * Math.sin(angleRad);
  const tangent = angleDeg + 90;

  return (
    <div className="relative aspect-square grid place-items-center fade-up fade-up-2 select-none">

      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        fill="none"
      >
        <circle cx={cx} cy={cy} r={r}
          stroke="rgba(220,215,235,0.38)" strokeWidth="0.9"
          strokeLinecap="round" strokeDasharray="1.2 3.5" />
        <circle cx={cx} cy={cy} r={r - 1.5}
          stroke="rgba(200,195,220,0.15)" strokeWidth="0.6"
          strokeLinecap="round" strokeDasharray="0.8 6" strokeDashoffset="4" />

        <defs>
          <path id="topArc"
            d={`M ${cx - (r - 14)},${cy} A ${r - 14} ${r - 14} 0 0 1 ${cx + (r - 14)},${cy}`} />
          <path id="subArc"
            d={`M ${cx - (r - 30)},${cy} A ${r - 30} ${r - 30} 0 0 1 ${cx + (r - 30)},${cy}`} />
          <linearGradient id="shineGrad" x1="0" y1="0" x2={size} y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#C9A84C" />
            <stop offset="40%"  stopColor="#E8C97A" />
            <stop offset="50%"  stopColor="#fffbe6" />
            <stop offset="60%"  stopColor="#E8C97A" />
            <stop offset="100%" stopColor="#C9A84C" />
            <animateTransform attributeName="gradientTransform" type="translate"
              from={`-${size} 0`} to={`${size} 0`} dur="6s" repeatCount="indefinite" />
          </linearGradient>
        </defs>

        <text fill="#FFFFFF" fontFamily="var(--font-script)" fontSize="20" fontWeight="700">
          <textPath href="#topArc" startOffset="50%" textAnchor="middle"
            style={{ filter: "drop-shadow(0 0 6px rgba(255,255,255,.8))" }}>
            New Arrivals
          </textPath>
        </text>

        <text fontFamily="var(--font-body)" fontSize="7" fontWeight="700" letterSpacing="2">
          <textPath href="#subArc" startOffset="50%" textAnchor="middle">
            <tspan fill="rgba(255,255,255,0.75)" style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,.5))" }}>✦ JUST DROPPED ✦</tspan>
          </textPath>
        </text>

        <g transform={`translate(${px},${py}) rotate(${tangent})`}>
          <polygon points="0,0 -1.4,-4.5 1.4,-4.5" fill="rgba(160,155,170,0.9)" />
          <polygon points="-1.4,-4.5 1.4,-4.5 2,-10 -2,-10" fill="rgba(190,170,130,0.55)" />
          <rect x="-2" y="-28" width="4" height="18" rx="0.5" fill="rgba(230,225,210,0.45)" />
          <rect x="-2" y="-32" width="4" height="4" rx="0.3" fill="rgba(180,175,165,0.35)" />
          <rect x="-2" y="-38" width="4" height="6" rx="1" fill="rgba(200,170,170,0.35)" />
        </g>
        <circle cx={px} cy={py} r="1.2" fill="rgba(210,205,225,0.5)" />
      </svg>

      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ boxShadow: "0 0 60px 10px rgba(255,255,255,.02)" }} />

      {/* circle clip */}
      <div className="absolute inset-3 rounded-full overflow-hidden"
        style={{ background: "radial-gradient(circle at 40% 30%, #801a1a 0%, #1a0505 75%)" }}>

        {/* slides */}
        <div className="absolute inset-0 z-10">
          {products.map((p, i) => (
            <Link
              key={p.id}
              href={`/product/${p.slug}`}
              onMouseEnter={() => handleEnter(i)}
              onMouseLeave={handleLeave}
              className="absolute inset-0 flex items-center justify-center transition-all duration-500"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "scale(1) translateX(0)" : `scale(0.94) translateX(${i < active ? "-30px" : "30px"})`,
                pointerEvents: active === i ? "auto" : "none",
              }}
            >
              <div className="absolute inset-0">
                <Pack name={p.name} color={p.color} weight={p.weight} fill />
              </div>
            </Link>
          ))}
        </div>

        {/* edge fades */}
        <div className="absolute inset-x-0 top-0 h-16 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #1a0505 0%, transparent 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-20 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to top, #1a0505 0%, transparent 100%)" }} />
        <div className="absolute inset-y-0 left-0 w-10 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to right, #1a0505 0%, transparent 100%)" }} />
        <div className="absolute inset-y-0 right-0 w-10 z-20 pointer-events-none"
          style={{ background: "linear-gradient(to left, #1a0505 0%, transparent 100%)" }} />

        {/* prev / next arrows */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(232,201,122,0.12)", border: "1px solid rgba(232,201,122,0.25)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(232,201,122,0.25)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(232,201,122,0.12)")}
          aria-label="Previous product"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M7.5 2L3.5 6L7.5 10" stroke="#E8C97A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ background: "rgba(232,201,122,0.12)", border: "1px solid rgba(232,201,122,0.25)" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(232,201,122,0.25)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(232,201,122,0.12)")}
          aria-label="Next product"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4.5 2L8.5 6L4.5 10" stroke="#E8C97A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* dot indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-2 z-30">
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: active === i ? "18px" : "6px",
                height: "6px",
                background: active === i ? "var(--gold)" : "rgba(232,201,122,0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
