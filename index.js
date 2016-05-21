var postcss = require('postcss');


var presets = [
    'recommended', // default
    'safe',
    'fixes-only',
    'fallbacks-only',
    'enable-all',
    'disable-all'
];
var defaultPreset = 'recommended';

var plugins = [
    {
        id:             'postcss-pseudoelements',
        plugin: require('postcss-pseudoelements'),
        options:        {},
        isSafe:         true,
        isRecommended:  true,
        isFallback:     false
    },
    {
        id:             'postcss-flexbugs-fixes',
        plugin: require('postcss-flexbugs-fixes'),
        options:        {},
        isSafe:         true,
        isRecommended:  true,
        isFallback:     false
    },
    {
        /*
            theoretically unsafe, as a browser might calculate
            a different precision of decimals, but in practice
            we want the same precision in all browsers anway.
            therefore we recommmend using this even in development mode
        */
        id:             'postcss-calc',
        plugin: require('postcss-calc'),
        options:        {},
        isSafe:         false,
        isRecommended:  true,
        isFallback:     false
    },
    {
        id:             'postcss-unroot',
        plugin: require('postcss-unroot'),
        options:        {},
        isSafe:         false,
        isRecommended:  true,
        isFallback:     true
    },
    {
        id:             'postcss-unopacity',
        plugin: require('postcss-unopacity'),
        options:        { method: 'copy', prefixed: true },
        isSafe:         false,
        isRecommended:  true,
        isFallback:     true
    },
    {
        id:             'pixrem',
        plugin: require('pixrem'),
        options:        {
            replace: false,
            html: true, // root value autodetection
            unitPrecision: 5
        },
        isSafe:         false,
        isRecommended:  true,
        isFallback:     true
    }

];

/*
    currently not used plugins - reason why
    postcss-unnth - potentially bloats files too much, not worth the few edge cases IMO
    postcss-unrgba - when using the 'clone'-method to preserve the desired color, it gets hard to create a custom fallback
*/

function isSafe(elem) { return elem.isSafe; } // eslint-disable-line brace-style
function isRecommended(elem) { return elem.isRecommended; } // eslint-disable-line brace-style
function isFallback(elem) { return elem.isFallback; } // eslint-disable-line brace-style
function isFix(elem) { return !elem.isFallback; } // eslint-disable-line brace-style


function evalPluginsFromPreset(preset) {
    var pluginsArr = plugins;
    if (preset === 'enable-all') {
        return pluginsArr;
    } else if (preset === 'disable-all') {
        return [];
    } else if (preset === 'fixes-only') {
        return pluginsArr.filter(isFix);
    } else if (preset === 'fallbacks-only') {
        return pluginsArr.filter(isFallback);
    } else if (preset === 'safe') {
        return pluginsArr.filter(isSafe);
    } else { // recommended
        return pluginsArr.filter(isRecommended);
    }

}


module.exports = postcss.plugin('postcss-fixes', function (opts) {
    opts = opts || {};
    if (opts.mode && opts.mode === 'safe') console.warn('[postcss-fixes] option "mode" was renamed to "preset". ');

    var preset = defaultPreset;
    if (opts.preset) {
        if (presets.indexOf(opts.preset) > -1) {
            preset = opts.preset;
        } else {
            console.warn('[postcss-fixes] option "preset": "' + opts.preset + '" is invalid and will be ignored');
        }
    }

    var usedPlugins = evalPluginsFromPreset(preset);

    var postcssInstance = postcss();

    usedPlugins.forEach(function (plugin) {
        postcssInstance.use(plugin.plugin(plugin.options));
    });

    return postcssInstance;
});
