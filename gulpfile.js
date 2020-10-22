const { src, dest, series, watch } = require('gulp')
const browserify = require('browserify')
const babelify = require('babelify')
const sass = require('gulp-sass')
sass.compiler = require('node-sass')
const source = require("vinyl-source-stream")
const nunjucks = require('gulp-nunjucks')
const del = require('del')
const config = require('./config/config')
const assetsConfig = require('./config/assets')

const type = config.project.type
const id = config.project.id

function copyCommonCSS() {
    let cssList = [];
    for (const asset of assetsConfig[type].css) {
        if ((asset.link).substr(0, 5) !== 'https') {
            cssList.push(`public/${asset.link}`)
        }
    }
    return src(cssList).pipe(dest(`dist/${id}/common/css`))
}

function copyCommonData() {
    return src([
        `public/common/data/*`
    ])
    .pipe(dest(`dist/${id}/common/data`))
}

function copyCommonImages() {
    return src([
        `public/common/images/*`
    ])
    .pipe(dest(`dist/${id}/common/images`))
}

function copyCommonJS() {
    let jsList = [];
    for (const asset of assetsConfig[type].js) {
        if ((asset.link).substr(0, 5) !== 'https') {
            jsList.push(`public/${asset.link}`)
        }
    }
    return src(jsList).pipe(dest(`dist/${id}/common/js`))
}


function copyCSS() {
    return src([
        `public/${type}/compiled/css/*.css`
    ])
    .pipe(dest(`dist/${id}/${type}/compiled/css`))
}

function copyData() {
    return src([
        `public/${type}/data/*`
    ])
    .pipe(dest(`dist/${id}/${type}/data`))
}

function copyImages() {
    return src([
        `public/${type}/images/*`
    ])
    .pipe(dest(`dist/${id}/${type}/images`))
}

function copyJS() {
    return src([
        `public/${type}/compiled/js/*.js`
    ])
    .pipe(dest(`dist/${id}/${type}/compiled/js`))
}

function compileHTML() {
    return src(`./templates/${type}/index.njk`)
        .pipe(nunjucks.compile(assetsConfig[type]))
        .pipe(dest(`./dist/${id}`))
}

function compileCSS() {
    return src(`./public/${type}/sass/**/*.scss`)
        .pipe(sass({
            includePaths: ['node_modules']
        }).on('error', sass.logError))
        .pipe(dest(`./public/${type}/compiled/css`));
}

function clean() {
    return del(`./dist`)
}

function scripts() {
    return (
        browserify({
            entries: [`./public/${type}/scripts/script.js`],
            transform: [babelify.configure({ presets: ["@babel/preset-env"] })]
        })
            .bundle()
            .pipe(source('main.js'))
            .pipe(dest(`./public/${type}/compiled/js`))
    )
}

function watchFiles() {
    watch(`./public/${type}/scripts/script.js`, scripts)
    watch(`./public/${type}/sass/**/*.scss`, compileCSS)
}


const copyAssets = series(copyCSS, copyData, copyImages, copyJS, copyCommonCSS, copyCommonData, copyCommonImages, copyCommonJS)
const build = series(clean, copyAssets, compileHTML)

exports.clean = clean
exports.assets = copyAssets
exports.html = compileHTML
exports.scripts = scripts
exports.css = compileCSS
exports.watch = watchFiles
exports.build = build
