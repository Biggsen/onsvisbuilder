const { src, dest, series, watch } = require('gulp')
const browserify = require("browserify")
const babelify = require("babelify")
const source = require("vinyl-source-stream")
const nunjucks = require('gulp-nunjucks')
const del = require('del')
const config = require('./config')
const assetsConfig = require('./config/assets')

const type = config.project.type

function copyCommonCSS() {
    let cssList = [];
    for (const asset of assetsConfig[type].css) {
        if ((asset.link).substr(0, 1) === '/') {
            cssList.push(`public${asset.link}`)
        }
    }
    return src(cssList).pipe(dest('dist/common/css'))
}

function copyCommonData() {
    return src([
        `public/common/data/*`
    ])
    .pipe(dest(`dist/common/data`))
}

function copyCommonImages() {
    return src([
        `public/common/images/*`
    ])
    .pipe(dest(`dist/common/images`))
}

function copyCommonJS() {
    let jsList = [];
    for (const asset of assetsConfig[type].js) {
        if ((asset.link).substr(0, 1) === '/') {
            jsList.push(`public${asset.link}`)
        }
    }
    return src(jsList).pipe(dest('dist/common/js'))
}


function copyCSS() {
    return src([
        `public/${type}/css/*.css`
    ])
    .pipe(dest(`dist/${type}/css`))
}

function copyData() {
    return src([
        `public/${type}/data/*`
    ])
    .pipe(dest(`dist/${type}/data`))
}

function copyImages() {
    return src([
        `public/${type}/images/*`
    ])
    .pipe(dest(`dist/${type}/images`))
}

function copyJS() {
    return src([
        `public/${type}/js/*.js`
    ])
    .pipe(dest(`dist/${type}/js`))
}

function compileHTML() {
    return src(`./templates/${type}/index.njk`)
        .pipe(nunjucks.compile(assetsConfig[type]))
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


const copyAssets = series(copyCSS, copyData, copyImages, copyJS, copyCommonCSS, copyCommonData, copyCommonImages, copyCommonJS)
const build = series(clean, copyAssets, compileHTML)

exports.clean = clean
exports.assets = copyAssets
exports.html = compileHTML
exports.scripts = scripts
exports.watch = watchFiles
exports.build = build
