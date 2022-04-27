module.exports = {
  mode: 'jit',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "color1":"#242C2D",
        "color2":"#202829",
        "color3":"#3C484C",
        "color4":"#2C3538",
        "color5":"#849FA8",
      },
      fontFamily:{
        "fixedsys": ['fixedsys']
      }
    }
  },
  plugins: [],
}
