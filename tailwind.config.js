/** @type {import('tailwindcss').Config} */
export default {
  // We remove the darkMode line entirely to prevent any 
  // "accidental" dark mode switching from system preferences.
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#E89EB8',
          charcoal: '#0F172A',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}