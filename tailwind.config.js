/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        cBlue: '#1E3A5F',
        cWhite: '#F5F5F5',
        cBlack: '#000000',
        cPink:  '#EFB0A1',

      },
      fontFamily:
      {
        'custom': ['MyFont', 'poppins'],
        'custom': ['MyFont2', 'Maitree'],
      }

    },
  },
  plugins: [],
}

