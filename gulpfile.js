const { src, dest, series, watch } = require('gulp')
const browserify = require("browserify")
const babelify = require("babelify")
const source = require("vinyl-source-stream")
const nunjucks = require('gulp-nunjucks')
const del = require('del')
const config = require('./config')

const type = config.project.type

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

function scripts() {
    return (
        browserify({
            entries: [`./public/${type}/scripts/script.js`],
            transform: [babelify.configure({ presets: ["@babel/preset-env"] })]
        })
            .bundle()
            .pipe(source('main.js'))
            .pipe(dest(`./public/${type}/js`))
    )
}

function watchFiles() {
    watch(`./public/${type}/scripts/script.js`, scripts)
}


const build = series(clean, assets, html)

exports.clean = clean
exports.assets = assets
exports.html = html
exports.scripts = scripts
exports.watch = watchFiles
exports.build = build
