"use client";

interface Props {
  text: string;
  sub?: string;
  align?: "left" | "center" | "right";
}

// Performance fix: animate whole words instead of every character.
// This drops ~120 individual animations down to ~10 word-level ones.
export default function WaveSlogan({ text, sub, align = "center" }: Props) {
  const lines = text.split(/<br\s*\/?>/i);

  let wordIndex = 0;

  return (
    <div className={`w-full px-4 sm:px-8 md:px-12 py-10 md:py-16 text-${align} overflow-hidden`}>
      <p
        className="font-script leading-snug"
        style={{
          fontSize: "clamp(1.6rem, 4.5vw, 4.5rem)",
          filter: "drop-shadow(0 0 16px rgba(232,201,122,.25))",
        }}
      >
        {lines.map((line, li) => {
          const words = line.split(" ");
          return (
            <span key={li} style={{ display: "block" }}>
              {words.map((word, wi) => {
                const idx = wordIndex++;
                return (
                  <span key={wi} style={{ display: "inline-block", whiteSpace: "pre" }}>
                    <span
                      style={{
                        display: "inline-block",
                        color: "var(--gold)",
                        animation: "sloganWave 3.8s ease-in-out infinite",
                        animationDelay: `${idx * 0.12}s`,
                        willChange: "transform",
                      }}
                    >
                      {word}
                    </span>
                    {wi < words.length - 1 ? "\u00A0" : ""}
                  </span>
                );
              })}
            </span>
          );
        })}
      </p>
      {sub && (
        <p className="mt-2 text-mist/40 text-[10px] sm:text-xs tracking-[.18em] uppercase font-bold">
          {sub}
        </p>
      )}
    </div>
  );
}
