/*!
 * docsifyfooter
 * v1.0.0
 * https://github.com/sbaerlocher/docsify.docsifyfooter.git
 * (c) 2018 Simon Baerlocher
 * MIT license
 */

function docsifyfooter(hook) {
    var footer = [
        '<hr/>',
        '<footer>',
        '<span>&copy; 2020 庚子 <a href="mailto:goldentianya@foxmail.com">' + $docsify.name + '</a></span>',
        '<span> | </span>',
        '<span> 从心开始的地方</a></span> | docsify ',
        window.Docsify.version,
        '</footer>'
    ].join('');

    hook.afterEach(function (html) {
        return html + footer;
    });
}

window.$docsify = window.$docsify || {};
window.$docsify.plugins = [docsifyfooter].concat(window.$docsify.plugins || []);
