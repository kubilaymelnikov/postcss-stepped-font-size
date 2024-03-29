/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => {
  return {
    postcssPlugin: "postcss-stepped-font-size",
    Declaration: {
      "stepped-font-size": (decl) => {
        const splitValuAndUnit = (size) => ({
          _: size,
          value: parseFloat(/[.0-9]+/.exec(size)[0]),
          unit: /[a-z]+/i.exec(size)[0],
        });
        const selector = decl.parent.selector;
        const fontSizes = /(.*?)\(/
          .exec(decl.value)[1]
          .replace(/(\s)/g, "")
          .split(",")
          .filter((_) => !!_)
          .map(splitValuAndUnit);

        const breakpoints = /\((.*?)\)/
          .exec(decl.value)[1]
          .replace(/(\s)/g, "")
          .split(",")
          .map(splitValuAndUnit)
          .sort((x, y) => x.value - y.value);

        const maxWidth = breakpoints[breakpoints.length - 1];
        const minWidth = breakpoints.shift();
        const maxFontSize = fontSizes[0];
        const minFontSize = fontSizes[1];

        decl.parent.before(`
          ${selector} {
            min-width: 0vw;
            line-height: normal;
          }
        `);

        decl.parent.before(`
          @media (max-width: ${minWidth._}) {
            ${selector} {
              font-size: ${minFontSize._};
            }
          }
        `);

        var prevStep = minWidth;

        breakpoints.forEach((breakpoint) => {
          const targetStep = breakpoint;
          let size =
            Math.round(
              (minFontSize.value +
                ((maxFontSize.value - minFontSize.value) /
                  (maxWidth.value - minWidth.value)) *
                  (targetStep.value - minWidth.value)) *
                10
            ) / 10;

          decl.parent.before(`
            @media (min-width: ${prevStep._}) and (max-width: ${targetStep._}) {
              ${selector} {
                font-size: ${size}${minFontSize.unit};
              }
            }
          `);

          prevStep = targetStep;
        });

        decl.parent.before(`
          @media (min-width: ${maxWidth._}) {
            ${selector} {
              font-size: ${maxFontSize._};
            }
          }
        `);

        const parent = decl.parent;

        decl.remove();
        if (!parent.nodes.length) parent.remove();
      },
    },
  };
};

module.exports.postcss = true;
