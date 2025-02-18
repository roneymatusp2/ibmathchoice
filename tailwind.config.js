/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'school-navy': '#1e3a8a', // você pode ajustar essa cor
        'school-red': '#dc2626',  // você pode ajustar essa cor
      },
    },
  },
  plugins: [],
}