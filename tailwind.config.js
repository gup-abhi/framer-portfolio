/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "deep-purple": "#0A0906",
        purple: "#E8A020",
        "light-purple": "#D4940A",
        pink: "#FF5E3A",
        "light-pink": "#FFE8E0",
        "pink-two": "#FF5E3A",
        blue: "#2BBFB4",
        cream: "#F5EDD8",
        "retro-dark": "#1C1710",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        "source-code": ["Source Code Pro", "monospace"]
      },
      backgroundImage: {
        "gradient-rainbow": "linear-gradient( 64.5deg,  rgba(245,116,185,1) 14.7%, rgba(89,97,223,1) 88.7% );"
      },
      listStyleType:{
        arrow: "&#10148;"
      }
    },
    screens: {
      xs: "480px",
      sm: "768px",
      md: "1060px"
    }
  },
  plugins: [],
}
