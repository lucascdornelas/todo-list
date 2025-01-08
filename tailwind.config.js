/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'localiza-green': '#01602a',
        'localiza-green-dark': '#004d22',
        'localiza-gray': '#f4f4f4',
        'localiza-text': '#333333',
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

