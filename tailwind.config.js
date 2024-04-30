/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./module/website/components/**/*.{js,ts,jsx,tsx}",
    "./module/website/containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "red-dark": "#E03A45",
      "yellow-primary": "#FFFF00",
      "green-dark": "#00FF00",
      "green-light": "#00FFCC",
      "black-bg": "#1E1E1E",
      "black-secondary": "#090909",
      "black-dark": "#000000",
      white: "#fff",
    },
    fontFamily: {
      exo: ["var(--font-exo)"],
      fugaz: ["var(--font-fugaz)"],
    },
    fontSize: {
      sm: "1.4rem",
      base: "1.6rem",
      lg: "1.8rem",
      xl: "2rem",
      "2xl": "3rem",
      "3xl": "4rem",
      "5xl": "6rem",
    },
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
        md: "18px",
        lg: "16px",
        xl: "10px",
        "2xl": "10px",
      },
    },
    screens: {
      sm: "600px",
      md: "767px",
      lg: "1100px",
      xl: "1350px",
      "2xl": "1650px",
    },
    extend: {},
  },
  plugins: [],
};
