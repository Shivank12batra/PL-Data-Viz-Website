/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html, js, jsx}", 
    "./src/**/*"
  ],
  theme: {
    screens: {
      'sm': '640px',
    },
    extend: {
      backgroundColor: {
        'green-100': '#d1fae5', 
        'light-green': '#6EE7B7', 
      },
    },
  },
  plugins: [],
}

