import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm cream background tones
        cream: {
          DEFAULT: "#FBF6EC",
          50: "#FDFBF5",
          100: "#FBF6EC",
          200: "#F4ECDB",
          300: "#EBDFC8",
        },
        // Olive green accents
        olive: {
          DEFAULT: "#5E6B33",
          light: "#8A9A5B",
          dark: "#454F25",
        },
        // Deep red / pepper paste red accents
        pepper: {
          DEFAULT: "#A6321E",
          light: "#C24A33",
          dark: "#7E2415",
        },
        // Dark readable text (warm near-black)
        ink: {
          DEFAULT: "#241E16",
          soft: "#4A4034",
          muted: "#6B6152",
        },
        gold: {
          DEFAULT: "#C08A2D",
          light: "#D9A94E",
        },
        line: "#E7DDCB",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(36,30,22,0.04), 0 8px 24px -12px rgba(36,30,22,0.18)",
        "card-hover": "0 2px 4px rgba(36,30,22,0.06), 0 16px 36px -16px rgba(36,30,22,0.28)",
      },
      maxWidth: {
        container: "80rem",
      },
    },
  },
  plugins: [],
};

export default config;
