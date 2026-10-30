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
        line: token("line"),
        line2: token("line2"),
        accent: token("accent"),
        onaccent: token("onaccent"),
        accentsoft: token("accentsoft"),
        accenttext: token("accenttext"),
        attn: token("attn"),
        attnsoft: token("attnsoft"),
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-inter-ext)", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      maxWidth: { page: "75rem" },
    },
  },
  plugins: [],
};

export default config;
