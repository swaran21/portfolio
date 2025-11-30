/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "omni-green": "#39ff14", // Classic neon green
        "omni-dark": "#050505",
        "omni-gray": "#1a1a1a",
      },
      boxShadow: {
        glow: "0 0 20px rgba(57, 255, 20, 0.7)",
        "glow-sm": "0 0 10px rgba(57, 255, 20, 0.5)",
      },
      fontFamily: {
        // You can add a sci-fi font here later
        sans: ["Inter", "sans-serif"],
      },
      clipPath: {
        hourglass:
          "polygon(0% 0%, 100% 0%, 60% 50%, 100% 100%, 0% 100%, 40% 50%)",
      },
    },
  },
  plugins: [],
};
