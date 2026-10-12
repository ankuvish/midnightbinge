"use client";

interface Props {
  text: string;
  sub?: string;
  align?: "left" | "center" | "right";
}

export default function WaveSlogan({ text, sub, align = "center" }: Props) {
  // split on <br/> to preserve line breaks
  const lines = text.split(/<br\s*\/?>/i);
  let globalIndex = 0;

  return (
    <div className={`w-full px-4 sm:px-8 md:px-12 py-10 md:py-16 text-${align} overflow-hidden`}>
      <p
        className="font-script leading-snug"
        style={{
          fontSize: "clamp(1.6rem, 4.5vw, 4.5rem)",
          filter: "drop-shadow(0 0 18px rgba(232,201,122,.3))",
        }}
      >
        {lines.map((line, li) => (
          <span key={li} style={{ display: "block" }}>
            {line.split("").map((char) => {
              const i = globalIndex++;
              return (
                <span
                  key={i}
                  style={{
                    display: "inline-block",
                    color: char === " " ? undefined : "var(--gold)",
                    whiteSpace: char === " " ? "pre" : undefined,
                    animation: char !== " " ? `sloganWave 3.5s ease-in-out infinite` : undefined,
                    animationDelay: `${i * 0.045}s`,
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              );
            })}
          </span>
        ))}
      </p>
      {sub && (
        <p className="mt-2 text-mist/40 text-[10px] sm:text-xs tracking-[.18em] uppercase font-bold">
          {sub}
        </p>
      )}
    </div>
  );
}
