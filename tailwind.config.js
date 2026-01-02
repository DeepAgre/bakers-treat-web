/** @type {import('tailwindcss').Config} */
export default {
  // Add 'selector' to be extra sure it ignores the system media query
  darkMode: ['class', '[class="dark"]'], 
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}