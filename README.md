# PostCSS Fixes [![Build Status][ci-img]][ci]

[PostCSS] pack to fix known Browser Bugs, making it easier to write your CSS according to the official W3C Syntax.

[postcss-fixes](https://github.com/MattDiMu/postcss-fixes) differs from [cssnext](https://github.com/MoOx/postcss-cssnext) by doing only transformations for stable CSS Features, whereas cssnext is more progressively tries to implement features, which aren't official W3C recommendations yet and could therefore change/break in the future. Another alternative is [oldie](https://github.com/jonathantneal/oldie), which is Internet Explorer only, however.


## Used Plugins
Hint: An opinionated config for these plugins is used, to make them more future-safe

[pixrem](https://github.com/robwierzbowski/node-pixrem)
[postcss-calc](https://github.com/postcss/postcss-calc)
[postcss-flexbugs-fixes](https://github.com/luisrudge/postcss-flexbugs-fixes) (also in 'safe' mode)
[postcss-pseudoelements](https://github.com/axa-ch/postcss-pseudoelements) (also in 'safe' mode)
[postcss-unopacity](https://github.com/jonathantneal/postcss-unopacity)
[postcss-unroot](https://github.com/jonathantneal/postcss-unroot)


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


[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/MattDiMu/postcss-fixes.svg
[ci]:      https://travis-ci.org/MattDiMu/postcss-fixes


## Usage


```js
postcss([ require('postcss-fixes') ]) // do recommended transformations
```

```js
postcss([ require('postcss-fixes')({ mode: 'safe' }) ]) // do only very safe transformations
```

See [PostCSS](https://github.com/postcss/postcss) docs for examples for your environment.
