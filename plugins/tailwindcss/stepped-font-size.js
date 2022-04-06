const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ matchUtilities, theme }) {
  const breakpointsString = Object.values(theme('screens')).join(', ')
  const fontSize = theme('fontSize')
  const values = Object.keys(fontSize)
    .filter((a) => fontSize[a][2] && fontSize[a][2].minFontSize)
    .reduce(
      (a, b) => ({
        ...a,
        [b]: fontSize[b],
      }),
      {}
    )

  matchUtilities(
    {
      sfs: (value) => ({
        steppedFontSize: `${value[0]}, ${value[2].minFontSize}, (${breakpointsString})`,
        ...value[1],
      }),
    },
    { values }
  )
})
