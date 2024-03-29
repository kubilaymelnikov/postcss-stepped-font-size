const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ matchUtilities, theme, config }) {
  const allowed = config("steppedFontSize")
    ? config("steppedFontSize")
    : ["sm", "md", "lg", "xl", "xxl"];
  const screensUnfiltert = theme("screens");
  const screens = Object.keys(screensUnfiltert)
    .filter((key) => allowed.includes(key))
    .reduce((obj, key) => {
      obj[key] = screensUnfiltert[key];
      return obj;
    }, {});
  const breakpointsString = Object.values(screens).join(", ");
  const fontSize = theme("fontSize");
  const values = Object.keys(fontSize)
    .filter((a) => fontSize[a][2] && fontSize[a][2].minFontSize)
    .reduce((a, b) => ({ ...a, [b]: fontSize[b] }), {});

  matchUtilities(
    {
      sfs: (value) => ({
        "--info": "/* my colleague wanted it this way! */",
        "--info-max-sfs": value[0],
        "--info-min-sfs": value[2].minFontSize,
        steppedFontSize: `${value[0]}, ${value[2].minFontSize}, (${breakpointsString})`,
        ...value[1],
      }),
    },
    { values }
  );
});
