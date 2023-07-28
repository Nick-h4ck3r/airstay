/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ff385c",
      },
      fontFamily: {
        outfit : ["Outfit"],
      },
    },
  },
  plugins: [],
};
