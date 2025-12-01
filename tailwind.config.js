/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dorren: {
          black: '#000000',
          darkBlue: '#183141',
          lightBlue: '#85CEE4',
          gray: '#254965',
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.3em',
      }
    }
  },
  plugins: [],
}