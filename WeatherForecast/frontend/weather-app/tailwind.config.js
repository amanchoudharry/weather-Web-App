/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-medium': 'float 7s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'snowfall': 'snowfall 6s linear infinite',
        'rainfall': 'rainfall 1s linear infinite',
        'lightning': 'lightning 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        snowfall: {
          '0%': {
            transform: 'translateY(0) translateX(0)',
            opacity: 0,
          },
          '10%': {
            opacity: 1,
          },
          '90%': {
            opacity: 1,
          },
          '100%': {
            transform: 'translateY(100vh) translateX(20px)',
            opacity: 0,
          },
        },
        rainfall: {
          '0%': {
            transform: 'translateY(0)',
            opacity: 0,
          },
          '10%': {
            opacity: 0.8,
          },
          '100%': {
            transform: 'translateY(100vh)',
            opacity: 0.8,
          },
        },
        lightning: {
          '0%, 100%': {
            opacity: 0,
            transform: 'scaleY(1)',
          },
          '5%, 25%': {
            opacity: 1,
            transform: 'scaleY(1.2)',
          },
          '15%, 20%': {
            opacity: 0,
            transform: 'scaleY(1)',
          },
          '50%': {
            opacity: 0,
          }
        },
      },
    },
  },
  plugins: [],
}

