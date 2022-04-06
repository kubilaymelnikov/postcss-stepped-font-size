# postcss-stepped-font-size

[PostCSS] plugin to generate stepped font size..

[PostCSS]: https://github.com/postcss/postcss

```css
  /* Input example */
.foo {
  stepped-font-size: 80px, 20px, (576px, 768px, 992px, 1200px, 1400px);
}
```

```css
/* Output example */
.foo {
  min-width: 0vw;
  line-height: normal;
}
@media (max-width: 576px) {
  .foo {
    font-size: 20px;
  }
}
@media (min-width: 576px) and (max-width: 768px) {
  .foo {
    font-size: 34px;
  }
}
@media (min-width: 768px) and (max-width: 992px) {
  .foo {
    font-size: 50.3px;
  }
}
@media (min-width: 992px) and (max-width: 1200px) {
  .foo {
    font-size: 65.4px;
  }
}
@media (min-width: 1200px) and (max-width: 1400px) {
  .foo {
    font-size: 80px;
  }
}
@media (min-width: 1400px) {
  .foo {
    font-size: 80px;
  }
}
```

## Usage

**Step 1:** Install plugin:

```sh
npm install --save-dev postcss postcss-stepped-font-size
```

**Step 2:** Check you project for existed PostCSS config: `postcss.config.js`
in the project root, `"postcss"` section in `package.json`
or `postcss` in bundle config.

If you do not use PostCSS, add it according to [official docs]
and set this plugin in settings.

**Step 3:** Add the plugin to plugins list:

```diff
module.exports = {
  plugins: [
+   require('postcss-stepped-font-size'),
    require('autoprefixer')
  ]
}
```

[official docs]: https://github.com/postcss/postcss#usage

# Tailwindcss Plugin
```
theme: {
  fontSize: {
    base: [
      '24px',
      {
        lineHeight: '1em',
        letterSpacing: '0.1em',
        fontWeigt: '600',
      },
      {
        minFontSize: '16px', // <- This needs to be added.
      },
    ],
  },
},
```
