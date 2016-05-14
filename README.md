# PostCSS Fixes [![Build Status][ci-img]][ci]

[PostCSS] pack to fix known Browser Bugs. Is "safe" by default and therefore won't make any undesired changes to your CSS

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/MattDiMu/postcss-fixes.svg
[ci]:      https://travis-ci.org/MattDiMu/postcss-fixes

```css
.foo {
    /* Input example */
}
```

```css
.foo {
  /* Output example */
}
```

## Usage

```js
postcss([ require('postcss-fixes') ])
```

See [PostCSS] docs for examples for your environment.
