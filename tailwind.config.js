/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('./src/assets/Capa 1.png')",
      },
      fontFamily: {
        "Inter-VariableFont": ["Inter-VariableFont"],
        "Inter-Bold": ["Inter-Bold"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
