/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#281B23",
        },
        secondary: {
          DEFAULT: "#d12942",
        },
        tertiary: {
          DEFAULT: "#D9C9A5",
        },
      },
      fontFamily: {
        cookie: ["Cookie", "cursive"],
      },
    },
  },
  plugins: [],
};
