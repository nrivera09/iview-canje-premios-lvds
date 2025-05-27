/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["TTNormsPro", "sans-serif"],
      },
      screens: {
        xs: { max: "400px" },
      },
      keyframes: {
        "marquee-full": {
          "0%": { left: "-10%" },
          "100%": { left: "100%" },
        },
      },
      animation: {
        "marquee-full": "marquee-full 1.5s linear infinite",
        "marquee-full-delay-1": "marquee-full 1.5s linear infinite 0.3s",
        "marquee-full-delay-2": "marquee-full 1.5s linear infinite 0.6s",
      },
    },
    fontSize: {
      base: "1rem",
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
