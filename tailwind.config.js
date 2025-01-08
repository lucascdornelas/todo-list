/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'localiza-green': '#009739',
        'localiza-green-dark': '#007c2f',
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

