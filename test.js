import postcss from 'postcss';
import test    from 'ava';

import plugin from './';

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
