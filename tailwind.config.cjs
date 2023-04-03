/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, js, jsx}", 
    "./src/**/*"
  ],
  theme: {
    screens: {
      'sm': '640px',
      // You can add more breakpoints here
    },
    extend: {
    },
  },
  plugins: [],
}
