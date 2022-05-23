module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
          architect: 'Architects Daughter',
          antic: 'Antic'
        },
        colors: {
          purple: {
            50: '#EADDF8',
            100: '#D7C0F2',
            200: '#AC7CE4',
            300: '#853DD7',
            400: '#5D21A0',
            500: '#381460',
            600: '#2C104C',
            700: '#220C3B',
            800: '#160826',
            900: '#0C0415'
          },
          red: {
            50: '#FFF5F5',
            100: '#FFE5E5',
            200: '#FFCCCC',
            300: '#FFA8A8',
            400: '#FF7A7A',
            500: '#FF0000',
            600: '#E60000',
            700: '#CC0000',
            800: '#AD0000',
            900: '#7A0000'
          }
        }
      },
  },
  plugins: [],
}