"use client";
import { useEffect, useState } from "react";

// Reduced from 41 → 20 items for performance.
// Light mode uses CSS text suns (no SVG paint), dark mode uses ✦ stars.
const ITEMS = [
  { top:"4%",  left:"3%",  s:9,  d:"0s",   dur:"2.6s" },
  { top:"6%",  left:"22%", s:7,  d:"0.8s", dur:"3.1s" },
  { top:"3%",  left:"52%", s:8,  d:"1.5s", dur:"2.4s" },
  { top:"7%",  left:"75%", s:6,  d:"0.3s", dur:"3.5s" },
  { top:"5%",  left:"91%", s:7,  d:"1.1s", dur:"2.8s" },
  { top:"20%", left:"8%",  s:7,  d:"1.2s", dur:"2.9s" },
  { top:"18%", left:"38%", s:8,  d:"1.6s", dur:"2.7s" },
  { top:"22%", left:"62%", s:6,  d:"0.9s", dur:"3.0s" },
  { top:"19%", left:"88%", s:7,  d:"1.7s", dur:"2.8s" },
  { top:"38%", left:"4%",  s:6,  d:"0.5s", dur:"3.4s" },
  { top:"40%", left:"28%", s:8,  d:"1.9s", dur:"2.4s" },
  { top:"36%", left:"55%", s:6,  d:"0.6s", dur:"3.8s" },
  { top:"42%", left:"82%", s:7,  d:"1.2s", dur:"2.7s" },
  { top:"58%", left:"12%", s:7,  d:"1.6s", dur:"2.5s" },
  { top:"55%", left:"45%", s:6,  d:"1.1s", dur:"2.9s" },
  { top:"60%", left:"72%", s:8,  d:"0.4s", dur:"3.3s" },
  { top:"75%", left:"6%",  s:7,  d:"0.7s", dur:"2.7s" },
  { top:"72%", left:"38%", s:6,  d:"1.8s", dur:"3.1s" },
  { top:"78%", left:"68%", s:7,  d:"1.0s", dur:"3.4s" },
  { top:"88%", left:"88%", s:6,  d:"0.6s", dur:"3.0s" },
];

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
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden>
      {ITEMS.map((s, i) =>
        light ? (
          // CSS text sun — zero SVG/paint overhead
          <span
            key={i}
            className="sun-shimmer absolute select-none"
            style={{
              top: s.top,
              left: s.left,
              fontSize: s.s * 2,
              lineHeight: 1,
              color: "rgba(180,120,10,0.55)",
              animationDelay: s.d,
              animationDuration: s.dur,
              willChange: "transform, opacity",
            }}
          >
            ☀
          </span>
        ) : (
          <span
            key={i}
            className="star-twinkle absolute select-none"
            style={{
              top: s.top,
              left: s.left,
              fontSize: s.s,
              animationDelay: s.d,
              animationDuration: s.dur,
              willChange: "transform, opacity",
            }}
          >
            ✦
          </span>
        )
      )}
    </div>
  );
}
