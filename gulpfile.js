const { src, dest, series } = require('gulp') ;
const nunjucks = require('gulp-nunjucks') ;
const del = require('del') ;

function assets() {
    return src('./public/**/*')
        .pipe(dest('./dist'))
}

function html() {
    return src('index.njk')
        .pipe(nunjucks.compile({name: 'Sindre'}))
        .pipe(dest('./dist'))
}

function clean() {
    return del('./dist')
}

const build = series(clean, assets, html)

exports.clean = clean
exports.assets = assets
exports.html = html
exports.build = build
