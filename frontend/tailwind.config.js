/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#6355D8",
          secondary: "#E16DDE",
          accent: "#37cdbe",
          neutral: "#9CA3AF",
          "base-100": "#ffffff",
        },
      },
    ],
  },
};
