/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'white': '#FFFFFF',
      'black': '#000000',
      'accent': '#4A40F2',
      'accent-dark': '#3e34e3',
      'font': {
        'black': '#0D1216',
        // 'dark-blue': '#374151',
        'gray': '#555555',
        'gray-light': '#737373',
      },
      'gray': {
        100: '#FBFCFD',
        200: '#F5F5F5',
      },
      'green': '#22c55e'
    },
    extend: {
      boxShadow: {
        'btn': '0 8px #2e26be',
        'btn-clicked': '0 4px #2e26be',
      }
    },
  },
  plugins: [],
}