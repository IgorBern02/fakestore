// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    colors: {
      brand: "var(--color-brand)",
      surface: "var(--color-surface)",
    },
    fontFamily: {
      story: "var(--font-story), cursive",
      roboto: "var(--font-roboto), sans-serif",
    },
  },
  plugins: [],
};
