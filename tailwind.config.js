/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#040103',
        secondary: '#fdf2f9',
        primaryBtn: '#e44963',
        secondaryBtn: '#fae9e0',
        accent: '#e47d49',
      },
    },
    gridTemplateColumns: {
      fluid: 'repeat(auto-fit, minmax(20rem, 1fr))',
    },
    fontFamily: {
      inter: ['inter', 'sans-serif'],
    },
  },
  plugins: [],
};
