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
            50: '#E1FBFF',
            100: '#C2F8FF',
            200: '#80F0FE',
            300: '#43E8FE',
            400: '#01E0FE',
            500: '#01AAC1',
            600: '#018798',
            700: '#016775',
            800: '#00434C',
            900: '#002429'
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