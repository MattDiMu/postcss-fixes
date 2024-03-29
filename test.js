const postcss = require('postcss');
const test = require('ava');
const plugin = require('./index.js');

function run(t, input, output, opts = { }) {
    return postcss([ plugin(opts) ]).process(input)
        .then( result => {
            t.deepEqual(result.css, output);
            t.deepEqual(result.warnings().length, 0);
        });
}


test('pseudo-selectors adapted, no config given', t => {
    return run(t, 'a::before{ }', 'a:before{ }', {});
});

test('pseudo-selectors adapted, default config', t => {
    return run(t, 'a::before{ }', 'a:before{ }', { });
});

test('opacity fallback, safe mode', t => {
    return run(t, '.class{opacity: .5;}', '.class{opacity: .5;}', { preset: 'safe' });
});

test('opacity fallback, default config', t => {
    return run(t, '.class{opacity: .5;}', '.class{-ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=50)";opacity: .5;}', { });
});

test('rem to px fallback, default config', t => {
    return run(t, 'main{font-size:2.5rem;}', 'main{font-size:40px;font-size:2.5rem;}', { });
});

test('rem to px fallback with custom root font size, default config', t => {
    return run(t, 'main{font-size:2.5rem;}html{font-size:10px;}', 'main{font-size:25px;font-size:2.5rem;}html{font-size:10px;}', { });
});

test('change nth-child(n) to 1n', t => {
    return run(t, '*:nth-child(n){font-size:2.5rem;}', '*:nth-child(1n){font-size:40px;font-size:2.5rem;}', { });
});

test('fallback for vmin', t => {
    return run(t, '*:nth-child(n){height:25vmin;}', '*:nth-child(1n){height:25vm;height:25vmin;}', { });
});
