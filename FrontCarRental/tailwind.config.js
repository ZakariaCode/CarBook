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
        'custom': '2px 20px 6px rgba(0, 0, 0, 0.5)',
      },
      colors:{
        primary:"#ffc727",
        dark:"#111111"
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

