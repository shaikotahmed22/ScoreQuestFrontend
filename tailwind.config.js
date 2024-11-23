/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          darkNavy: "#0B3D91",
          brightOrange: "#FF7043",
        },
        secondary: {
          coolGray: "#E0E0E0",
          slateGray: "#4A4A4A",
        },
        accentColor: {
          limeGreen: "#76FF03",
          skyBlur: "#42A5F5",
        },
        natural: {
          white: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
