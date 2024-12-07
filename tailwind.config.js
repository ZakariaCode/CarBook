/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Définissez les fichiers où vous utilisez Tailwind
  theme: {
    extend: {
      colors: {
        customYellow: "#ffc727",
      },
      animation: {
        flash: "flash 1.5s infinite",
      },
      keyframes: {
        flash: {
          "0%, 100%": { opacity: "0" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
