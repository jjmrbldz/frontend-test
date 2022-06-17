const gulp  = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minify = require("gulp-minify");
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const del   = require('del');

gulp.task('style', () => {
    return gulp.src('src/assets/sass/style.scss')
        .pipe(concat('style.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/css/'));
});

gulp.task('js', () => {
    return gulp.src('src/assets/js/*.js', { allowEmpty: true })
        .pipe(minify({noSource: true}))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('minify-css',() => {
    return gulp.src('public/css/style.css')
      .pipe(sourcemaps.init())
      .pipe(cleanCSS())
      .pipe(concat('style.min.css'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('public/css/'));
  });

gulp.task('clean', () => {
    return del([
        'public/css/*.css',
    ]);
});

gulp.task('default', gulp.series(['clean', 'style', 'minify-css', 'js']));