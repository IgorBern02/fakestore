// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    colors: {
      background: "var(--color-background)",
      primary: "var(--color-primary)",
      secondary: "var(--color-secondary)",
      muted: "var(--color-muted)",
      text: "var(--color-text)",
    },
    fontFamily: {
      story: ["var(--font-story)"],
      roboto: ["var(--font-roboto)"],
    },
  },
  plugins: [],
};
