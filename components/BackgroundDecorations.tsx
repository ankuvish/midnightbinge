"use client";
import { useEffect, useState } from "react";

const ITEMS = [
  { top:"4%",  left:"3%",  s:14, d:"0s",   dur:"2.6s" },
  { top:"8%",  left:"15%", s:10, d:"0.8s", dur:"3.1s" },
  { top:"3%",  left:"28%", s:12, d:"1.5s", dur:"2.4s" },
  { top:"7%",  left:"42%", s:9,  d:"0.3s", dur:"3.5s" },
  { top:"5%",  left:"58%", s:13, d:"1.1s", dur:"2.8s" },
  { top:"9%",  left:"72%", s:10, d:"0.6s", dur:"3.2s" },
  { top:"4%",  left:"85%", s:11, d:"1.8s", dur:"2.5s" },
  { top:"6%",  left:"94%", s:9,  d:"0.4s", dur:"3.7s" },
  { top:"18%", left:"6%",  s:11, d:"1.2s", dur:"2.9s" },
  { top:"22%", left:"22%", s:8,  d:"0.7s", dur:"3.3s" },
  { top:"15%", left:"38%", s:13, d:"1.6s", dur:"2.7s" },
  { top:"20%", left:"55%", s:9,  d:"0.2s", dur:"3.6s" },
  { top:"17%", left:"68%", s:12, d:"1.3s", dur:"2.5s" },
  { top:"23%", left:"80%", s:10, d:"0.9s", dur:"3.0s" },
  { top:"19%", left:"92%", s:8,  d:"1.7s", dur:"2.8s" },
  { top:"35%", left:"2%",  s:10, d:"0.5s", dur:"3.4s" },
  { top:"40%", left:"18%", s:12, d:"1.4s", dur:"2.6s" },
  { top:"33%", left:"33%", s:9,  d:"0.1s", dur:"3.1s" },
  { top:"38%", left:"48%", s:14, d:"1.9s", dur:"2.4s" },
  { top:"36%", left:"63%", s:8,  d:"0.6s", dur:"3.8s" },
  { top:"42%", left:"77%", s:11, d:"1.2s", dur:"2.7s" },
  { top:"37%", left:"90%", s:9,  d:"0.3s", dur:"3.2s" },
  { top:"55%", left:"8%",  s:12, d:"1.6s", dur:"2.5s" },
  { top:"58%", left:"25%", s:9,  d:"0.8s", dur:"3.5s" },
  { top:"52%", left:"42%", s:11, d:"1.1s", dur:"2.9s" },
  { top:"60%", left:"57%", s:8,  d:"0.4s", dur:"3.3s" },
  { top:"54%", left:"72%", s:13, d:"1.7s", dur:"2.6s" },
  { top:"59%", left:"86%", s:10, d:"0.2s", dur:"3.0s" },
  { top:"72%", left:"4%",  s:9,  d:"1.3s", dur:"3.6s" },
  { top:"75%", left:"20%", s:12, d:"0.7s", dur:"2.7s" },
  { top:"70%", left:"36%", s:10, d:"1.8s", dur:"3.1s" },
  { top:"78%", left:"52%", s:8,  d:"0.5s", dur:"2.8s" },
  { top:"73%", left:"67%", s:14, d:"1.0s", dur:"3.4s" },
  { top:"76%", left:"82%", s:9,  d:"1.5s", dur:"2.5s" },
  { top:"71%", left:"95%", s:11, d:"0.3s", dur:"3.7s" },
  { top:"88%", left:"10%", s:10, d:"1.4s", dur:"2.6s" },
  { top:"92%", left:"28%", s:8,  d:"0.9s", dur:"3.2s" },
  { top:"85%", left:"45%", s:12, d:"1.6s", dur:"2.9s" },
  { top:"90%", left:"62%", s:9,  d:"0.2s", dur:"3.5s" },
  { top:"87%", left:"78%", s:11, d:"1.1s", dur:"2.7s" },
  { top:"93%", left:"91%", s:8,  d:"0.6s", dur:"3.0s" },
];

function SunShape({ size, delay, dur }: { size: number; delay: string; dur: string }) {
  const r = size;
  const cx = size * 2.2;
  const cy = size * 2.2;
  const viewSize = size * 4.4;
  const rays = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const x1 = cx + Math.cos(angle) * (r * 1.1);
    const y1 = cy + Math.sin(angle) * (r * 1.1);
    const x2 = cx + Math.cos(angle) * (r * 2.0);
    const y2 = cy + Math.sin(angle) * (r * 2.0);
    return { x1, y1, x2, y2 };
  });

  return (
    <svg
      width={viewSize}
      height={viewSize}
      viewBox={`0 0 ${viewSize} ${viewSize}`}
      className="sun-shimmer pointer-events-none"
      style={{ animationDelay: delay, animationDuration: dur, overflow: "visible" }}
      aria-hidden
    >
      <defs>
        {/* outer bloom glow */}
        <radialGradient id={`bloom-${delay.replace(".","")}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="rgba(255,200,50,0.45)" />
          <stop offset="40%"  stopColor="rgba(255,170,30,0.20)" />
          <stop offset="100%" stopColor="rgba(255,150,0,0)"     />
        </radialGradient>
      </defs>

      {/* bloom halo */}
      <circle cx={cx} cy={cy} r={r * 2.8}
        fill={`url(#bloom-${delay.replace(".","")}`} />

      {/* rays */}
      {rays.map((ray, i) => (
        <line key={i} x1={ray.x1} y1={ray.y1} x2={ray.x2} y2={ray.y2}
          stroke="rgba(255,185,20,0.75)"
          strokeWidth={size * 0.13}
          strokeLinecap="round" />
      ))}

      {/* core circle */}
      <circle cx={cx} cy={cy} r={r * 0.72}
        fill="rgba(255,210,60,0.90)" />

      {/* inner bright spot */}
      <circle cx={cx - r * 0.18} cy={cy - r * 0.18} r={r * 0.28}
        fill="rgba(255,245,180,0.85)" />
    </svg>
  );
}

export default function BackgroundDecorations() {
  const [light, setLight] = useState(false);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
    const obs = new MutationObserver(() =>
      setLight(document.documentElement.classList.contains("light"))
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* amber dimming overlay — light mode only, pulses with suns */}
      {light && (
        <div
          className="fixed inset-0 pointer-events-none z-0 sun-dim-overlay"
          aria-hidden
        />
      )}

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
        {ITEMS.map((s, i) =>
          light ? (
            <div key={i} className="absolute" style={{ top: s.top, left: s.left }}>
              <SunShape size={s.s} delay={s.d} dur={s.dur} />
            </div>
          ) : (
            <span
              key={i}
              className="star-twinkle absolute"
              style={{ top: s.top, left: s.left, fontSize: s.s, animationDelay: s.d, animationDuration: s.dur }}
            >
              ✦
            </span>
          )
        )}
      </div>
    </>
  );
}
