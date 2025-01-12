/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode:"class",
  theme: {
    extend: {
      dropShadow: {
        'custom': '2px 20px 6px 2px_10px_6px_rgba(0, 0, 0, 0.5)',
      },
      colors:{
        primary:"#ffc727",
        dark:"#111111",
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
      container:{
        center:true,
        padding:{
          default:"1rem",
          sm:"3rem",
        },
      }
    },
  },
  plugins: [],
}
