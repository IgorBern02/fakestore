// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    colors: {
      background: "var(--color-background)",
      primary: "var(--color-primary)",
      "primary-hover": "var(--color-primary-hover)",
      secondary: "var(--color-secondary)",
      destaque: "var(--color-destaque)",
      "text-primary": "var(--color-text-primary)",
      "text-secondary": "var(--color-text-secondary)",
      // light: "var(--color-light)",
      // border: "var(--color-border)",
      // dark: "var(--color-dark)",
      // highlight: "var(--color-highlight)",
    },
    fontFamily: {
      story: ["var(--font-story)"],
      roboto: ["var(--font-roboto)"],
      epilogue: ["var(--font-epilogue)"],
    },
  },
  keyframes: {
    fadeIn: {
      "0%": { opacity: 0, transform: "scale(95%)" },
      "100%": { opacity: 1, transform: "scale(100%)" },
    },
  },
  animation: {
    fadeIn: "fadeIn 0.15s ease-out forwards",
  },
  plugins: [],
};
