const gulp = require('gulp') ;
const nunjucks = require('gulp-nunjucks') ;
const COMPILE = {
    SRC: '/src/**.html',
    DEST: '/dist'
};

exports.default = () => (
    gulp.src('index.html')
        .pipe(nunjucks.compile({name: 'Sindre'}))
        .pipe(gulp.dest('dist'))
);
