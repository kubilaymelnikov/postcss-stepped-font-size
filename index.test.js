const postcss = require("postcss");

const plugin = require("./");

async function run(input, output, opts = {}) {
  let result = await postcss([plugin(opts)]).process(input, {
    from: undefined,
  });
  expect(result.css.replace(/(?:\r\n|\r|\n| )/g, "")).toEqual(
    output.replace(/(?:\r\n|\r|\n| )/g, "")
  );
  expect(result.warnings()).toHaveLength(0);
}

it("does something", async () => {
  await run(
    `
      a {
        stepped-font-size: 80px, 20px, (576px, 768px, 992px, 1200px, 1400px);
      }
    `,
    `
      a {
        min-width: 0vw;
        line-height: normal;
      }
      @media (max-width: 576px) {
        a {
          font-size: 20px;
        }
      }
      @media (min-width: 576px) and (max-width: 768px) {
        a {
          font-size: 34px;
        }
      }
      @media (min-width: 768px) and (max-width: 992px) {
        a {
          font-size: 50.3px;
        }
      }
      @media (min-width: 992px) and (max-width: 1200px) {
        a {
          font-size: 65.4px;
        }
      }
      @media (min-width: 1200px) and (max-width: 1400px) {
        a {
          font-size: 80px;
        }
      }
      @media (min-width: 1400px) {
        a {
          font-size: 80px;
        }
      }
    `,
    {}
  );
});
