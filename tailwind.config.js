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
        blue: {
          40: '#4A55A2',
          30: '#7895CB',
          20: '#A0BFE0',
          10: '#C5DFF8',
        },
        chartBlue: {
          10: 'rgb(70,70,225)',
        },
        chartGreen: {
          10: 'rgb(70,225,70)',
        },
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
