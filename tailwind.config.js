/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006D77',
        secondary: '#2C6E49',
        accent: '#83C5BE',
        warmGray: '#4A4A4A',
        backgroundLight: '#F8F9FA',
        backgroundSecondary: '#EDF2F4',
      },
      fontFamily: {
        headline: ['Inter', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
        accent: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'gradient': 'linear-gradient(to right bottom, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
