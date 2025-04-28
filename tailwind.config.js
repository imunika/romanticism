/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./app/**/*.{jsx,tsx}",
    // "./components/**/*.{jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // sans is font by default
        sans: ['"Helvetica"', "var(--font-raleway)", "sans-serif"],
        taviraj: ["var(--font-taviraj)", "sans-serif"],
        italiana: ["var(--font-italiana)", "sans-serif"],
        antic_didone: ["var(--font-antic_didone)", "sans-serif"],
      },
      backgroundImage: {
        hero10: "url('/images/arch_costantine.jpg')",
        hero11: "url('/images/turret_gable.jpeg')",
        hero12: "url('/images/chocorua.jpg')",
        hero13: "url('/images/wild_horse.jpg')",
        hero14: "url('/images/american_crow.jpeg')",
      },
    },
  },
  plugins: [],
};
