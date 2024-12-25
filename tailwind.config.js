/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    container: {
      center: true,
      padding: '1rem !important',
    },
    opacity: {
      "0-pct": "0%",
      "5-pct": "5%",
      "6-pct": "6%",
      "10-pct": "10%",
      "15-pct": "15%",
      "16-pct": "16%",
      "20-pct": "20%",
      "25-pct": "25%",
      "30-pct": "30%",
      "35-pct": "35%",
      "40-pct": "40%",
      "45-pct": "45%",
      "50-pct": "50%",
      "55-pct": "55%",
      "60-pct": "60%",
      "65-pct": "65%",
      "70-pct": "70%",
      "75-pct": "75%",
      "80-pct": "80%",
      "85-pct": "85%",
      "90-pct": "90%",
      "95-pct": "95%",
      "100-pct": "100%"
    },
    colors: {
      ...colors,
    },
    extend: {
      colors: {
        primary: '#0E9E73',
        secondary: '#153E66',
        cardinal: '#C1272D',
        mangoOrange: '#F7863F',
        halfBaked: '#7EC8DC',
        davyGrey: '#54585C'
      }
    },
  },
  plugins: [
    plugin(function({ addComponents  }) {
      addComponents({
      })
    })
  ],
}
