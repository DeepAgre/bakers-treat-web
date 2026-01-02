/** @type {import('tailwindcss').Config} */
export default {
  // THIS LINE IS THE FIX: It tells Tailwind to only use Dark Mode 
  // when we manually add the "dark" class to the HTML tag.
  darkMode: 'class', 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}