const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        tiny: '0.6rem',
      },
      colors: {
        veryDarkGray: 'hsl(0, 0%, 17%)',
        darkGray: 'hsl(0, 0%, 59%)',
      },
      backgroundImage: {
        pattern: "url('./images/pattern-bg.png')",
      },
      fontFamily: {
        sans: ['Rubik', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
