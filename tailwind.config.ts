import type { Config } from "tailwindcss";

const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
    extend: {
      colors: {
        bg: token("bg"),
        bg2: token("bg2"),
        bg3: token("bg3"),
        ink: token("ink"),
        ink2: token("ink2"),
        ink3: token("ink3"),
        line: "var(--line)",
        line2: "var(--line2)",
        accent: token("accent"),
        onaccent: token("onaccent"),
        accentsoft: "var(--accentsoft)",
        accenttext: token("accenttext"),
        attn: token("attn"),
        attnsoft: token("attnsoft"),
        surface: token("surface"),
        good: token("good"),
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: { page: "75rem" },
    },
  },
  plugins: [],
};

export default config;
