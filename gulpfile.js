var gulp = require('gulp');
var minify = require('gulp-minify-css');
var rev = require('gulp-rev-append');

gulp.task('minify', function () {
    return gulp.src('src/style.css')
        .pipe(minify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('rev', function () {
    return gulp.src('./index.html')
        .pipe(rev())
        .pipe(gulp.dest('.'));
});

gulp.task('default', ['minify', 'rev']);
