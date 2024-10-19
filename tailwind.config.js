/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{html,js,jsx,ts,tsx}",
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        26: "6.5rem",
        192: "48rem",
      },
    },
  },
  plugins: [],
};
