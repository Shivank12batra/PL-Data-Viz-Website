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
      textSizes: {
        'md': '1.125rem', // You can adjust this to your desired size
      }
    },
  },
  plugins: [],
}
