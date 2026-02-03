/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        helvetica: [
          'Helvetica',
          'Helvetica Neue',
          'Arial',
          'system-ui',
          'sans-serif',
        ],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['"PT Sans Narrow"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
