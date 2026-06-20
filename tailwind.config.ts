import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "brand-bg": "#F5FAFB",
        "brand-surface": "#FFFFFF",
        "brand-surface-2": "#EDF6F4",
        "brand-accent": "#2DB89A",
        "brand-accent-light": "#D7F3EE",
        "brand-accent-dark": "#1A8872",
        "brand-text": "#0D1B2A",
        "brand-muted": "#5A6878",
        "brand-border": "#E2ECF0",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        whatsapp: "#25D366",
      },
      fontFamily: {
        display: ["var(--font-plus-jakarta)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
        "card-sm": "10px",
        pill: "50px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(0,0,0,0.04)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;

