/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          900: "#064e3b",
          800: "#065f46",
          700: "#047857",
          600: "#059669",
          500: "#10b981",
          100: "#d1fae5",
          50: "#ecfdf5",
        },
        gold: {
          500: "#d4a843",
          400: "#e2bd5b",
          300: "#f0d78a",
          200: "#f5e6b0",
        },
        cream: "#fefcf3",
        charcoal: "#1a1a2e",
      },
      fontFamily: {
        amiri: ["var(--font-amiri)", "serif"],
        jakarta: ["var(--font-jakarta)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
