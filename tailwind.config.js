/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        element: {
          darkmode: "hsl(209,23%,22%)",
          lightmode: "hsl(0,0%,100%)",
        },
        background: {
          darkmode: "hsl(207,26%,17%)",
          lightmode: "hsl(0,0%,98%)",
        },
        text: {
          darkmode: "hsl(0, 0%, 100%)",
          lightmode: "hsl(200,15%,8%)",
        },
        input: {
          darkmode: "hsl(209,23%,22%)",
          lightmode: "hsl(0,0%,52%)",
        },
      },
      fontFamily: {
        main: ["Nunito Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
