import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink:   "#160F2E",
        deep:  "#0A0818",
        moon:  "#E8C97A",
        ember: "#E8622A",
        mist:  "#EAE8F2",
        gold:  "#C9A84C",
        rose:  "#C4607A",
        sky:   "#38BDF8",
        "sky-dark": "#0284C7",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body:    ["var(--font-body)"],
        script:  ["var(--font-script)"],
      },
    },
  },
} satisfies Config;
