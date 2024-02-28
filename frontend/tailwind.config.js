/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '2px 2px 5px rgba(0, 0, 0, 0.4)',
      }
    },
  },
  plugins: [],
}

