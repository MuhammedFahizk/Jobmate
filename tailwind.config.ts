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
        muted: "var(--muted)",
        border: "var(--border)",
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          300: "var(--primary-300)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          900: "var(--primary-900)",
        },
        secondary: {
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          300: "var(--secondary-300)",
          500: "var(--secondary-500)",
          700: "var(--secondary-700)",
          900: "var(--secondary-900)",
        },
        accent: {
          400: "var(--accent-400)",
          500: "var(--accent-500)",
        },
        danger: {
          500: "var(--danger-500)",
        },
        "brand-bg": "var(--background)",
        "brand-surface": "#FFFFFF",
        "brand-surface-2": "var(--primary-50)",
        "brand-accent": "var(--primary-500)",
        "brand-accent-light": "var(--primary-100)",
        "brand-accent-dark": "var(--primary-700)",
        "brand-text": "var(--foreground)",
        "brand-muted": "var(--muted)",
        "brand-border": "var(--border)",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        whatsapp: "#25D366",
      },
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-ibm-plex)", "monospace"],
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

