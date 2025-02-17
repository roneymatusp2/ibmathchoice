/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        school: {
          navy: '#002B49',
          red: '#A91B39',
          'dark-red': '#8B0025',
          white: '#FFFFFF',
        }
      },
    },
  },
  plugins: [],
};