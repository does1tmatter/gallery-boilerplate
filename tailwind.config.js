module.exports = {
  darkMode: 'class',
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
            50: '#',
            100: '#',
            200: '#',
            300: '#',
            400: '#',
            500: '#',
            600: '#',
            700: '#',
            800: '#',
            900: '#'
          }
        },
        backgroundImage: {
          sun: "url('@/assets/img/sun.svg')",
          moon: "url('@/assets/img/moon.png')",
        }
      },
  },
  plugins: [],
}