var postcss = require('postcss');

var safePlugins = [
    {
        plugin:    require('postcss-pseudoelements'),
        options:  {}
    },
    {
        plugin:    require('postcss-flexbugs-fixes'),
        options:  {}
    }
];

/* unsafe, but recommended plugins, as they have have only insignificant side effects */
var recommendedPlugins = [
    {
        /*
            theoretically unsafe, as a browser might calculate
            a different precision of decimals, but in practice
            we want the same precision in all browsers anway.
            therefore we recommmend using this even in development mode
        */
        plugin:    require('postcss-calc'),
        options:  {}
    },
    {
        plugin:    require('postcss-unroot'), // unsafe due to a higher specificity of ":root" compared to "html"
        options:  {}
    },
    {
        plugin:    require('postcss-unopacity'), // -ms-filter behaves sometimes differently than opacity
        options:  { method: 'copy', prefixed: true }
    },
    {
        plugin:    require('pixrem'),
        options:  {
            replace: false,
            html: true, // root value autodetection
            unitPrecision: 5
        }
    }
];

/*
    currently not used plugins - reason why
    postcss-unnth - potentially bloats files too much, not worth the few edge cases IMO
    postcss-unrgba - when using the "clone"-method to preserve the desired color, it gets hard to create a custom fallback
*/


module.exports = postcss.plugin('postcss-fixes', function (opts) {
    var usedPlugins = safePlugins;

    if (typeof opts === 'object' && 'mode' in opts) {
        if (opts.mode === 'recommended') {
            usedPlugins = usedPlugins.concat(recommendedPlugins);
        }
    }

    var postcssInstance = postcss();

    usedPlugins.forEach(function (plugin) {
        postcssInstance.use(plugin.plugin(plugin.options));
    });

    return postcssInstance;
});
