/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Exact video palette tokens:
        board: {
          bg: "#080B11",
          card: "#121722",
          cardHover: "#161D2B",
          border: "#1C2436",
          borderLight: "rgba(255, 255, 255, 0.08)",
        },
        lime: {
          DEFAULT: "#D4FF00",
          glow: "#CCFF00",
          dim: "#A3D900",
          dark: "#1F2900",
          light: "#E5FF4D",
        },
        pastel: {
          coral: "#FF6384",
          lime: "#D4FF00",
          lavender: "#B5A7FE",
          cyan: "#38BDF8",
        },
        mutedSlate: "#8E99A8",
      },
      backgroundImage: {
        "board-radial":
          "radial-gradient(circle at 50% 0%, rgba(212, 255, 0, 0.08) 0%, transparent 60%)",
        "card-gradient":
          "linear-gradient(180deg, #131824 0%, #10141F 100%)",
      },
      boxShadow: {
        "lime-glow": "0 0 25px -4px rgba(212, 255, 0, 0.35)",
        "lime-sm": "0 0 12px -2px rgba(212, 255, 0, 0.4)",
        "card-dark": "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "ecg-sweep": "ecgSweep 2s linear infinite",
      },
      keyframes: {
        ecgSweep: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        }
      }
    },
  },
  plugins: [],
};
