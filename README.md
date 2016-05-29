# PostCSS Fixes [![Build Status][ci-img]][ci] [![Code Climate](https://codeclimate.com/github/MattDiMu/postcss-fixes/badges/gpa.svg)](https://codeclimate.com/github/MattDiMu/postcss-fixes) [![dependencies](https://david-dm.org/MattDiMu/postcss-fixes.svg)] (https://david-dm.org/MattDiMu/postcss-fixes) [![devDependencies](https://david-dm.org/MattDiMu/postcss-fixes/dev-status.svg)](https://david-dm.org/MattDiMu/postcss-fixes)

[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/MattDiMu/postcss-fixes.svg
[ci]:      https://travis-ci.org/MattDiMu/postcss-fixes


[PostCSS] pack to fix known Browser Bugs, making it easier to write your CSS according to the official W3C Syntax.

[postcss-fixes](https://github.com/MattDiMu/postcss-fixes) differs from [cssnext](https://github.com/MoOx/postcss-cssnext) by doing only transformations for stable CSS Features, whereas cssnext is more progressively tries to implement features, which aren't official W3C recommendations yet and could therefore change/break in the future. Another alternative is [oldie](https://github.com/jonathantneal/oldie), which is Internet Explorer only, however.


## Used Plugins
Hint: An opinionated config for these plugins is used, to make them more future-safe
* [pixrem](https://github.com/robwierzbowski/node-pixrem)
* [postcss-calc](https://github.com/postcss/postcss-calc)
* [postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes) (also in 'safe' mode)
* [postcss-pseudoelements](https://github.com/axa-ch/postcss-pseudoelements) (also in 'safe' mode)
* [postcss-unopacity](https://github.com/jonathantneal/postcss-unopacity)
* [postcss-unroot](https://github.com/jonathantneal/postcss-unroot)


## Example (many more transformations)
```css
::before {
    flex: 1;
    opacity: .5;
    height: 2.5rem;
}
```

```css
:before {
    flex: 1 1 0%; /* fix some flexbox issues */
    -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)"; /* opacity for IE */
    opacity: .5;
    height: 40px; /* rem to px fallback */
    height: 2.5rem;
}
```

### Recommended Usage
[postcss-fixes](https://github.com/MattDiMu/postcss-fixes) is recommended to be used in conjunction with [autoprefixer](https://github.com/postcss/autoprefixer) and [cssnano](https://github.com/ben-eb/cssnano) (optimizations)

```js
/* for developement */
postcss([
    require('postcss-fixes')(),
    require('autoprefixer')()
])

/* for production */
postcss([
    require('postcss-fixes')(),
    require('autoprefixer')(),
    require('cssnano')({
        'safe': true, // I would recommend using cssnano only in safe mode
        'calc': false // calc is no longer necessary, as it is already done by postcss-fixes due to precision rounding reasons
    })
])
```
See [PostCSS](https://github.com/postcss/postcss) docs for examples for your environment (e.g. if you are using a task runner like grunt, gulp, broccoli, webpack, etc.).


## Options
### `preset`
* `recommended` (default)
* `safe`
* `fixes-only`
* `fallbacks-only`
* `enable-all`
* `disable-all`

This would look like this:

```js
postcss([
    require('postcss-fixes')({ preset: 'safe' }) // do only very safe transformations
])
```
