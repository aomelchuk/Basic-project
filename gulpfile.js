/**
 * Created by a.omelchuk on 03.12.2015.
 */
'use strict'
var gulp = require('gulp'),
     rename = require("gulp-rename"),
     notify = require("gulp-notify"),
     autoprefixer = require('gulp-autoprefixer'),
     sass = require('gulp-sass'),
     concatCss = require('gulp-concat-css'),
     concat = require('gulp-concat'),
    cache = require('gulp-cache'),
    imagemin = require('gulp-imagemin'),
     minifyCss = require('gulp-minify-css'),
     connect = require('gulp-connect');


gulp.task('html', function() {
    gulp.src('dev/index.html')
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});
gulp.task('add-normalize', function() {
    gulp.src('node_modules/normalize.css/normalize.css')
        .pipe(gulp.dest('dev/css/'))
        .pipe(connect.reload());
});
gulp.task('connect', function() {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

// Images
gulp.task('images', function() {
    return gulp.src('dev/img/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/img'))
        .pipe(notify({ message: 'Images task complete' }));
});
gulp.task('sass', function () {
    gulp.src('dev/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dev/css/'));
});
gulp.task('css', function () {
    gulp.src('dev/css/*.css')
        .pipe(concatCss("style.css"))
        .pipe(autoprefixer({
            browsers: ['last 6 versions','> 1%', 'IE 7'],
            cascade: false
        }))
        .pipe(minifyCss())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('dist/'))
        .pipe(notify("css task done!"))
        .pipe(connect.reload());
});


gulp.task('watch', function() {
    gulp.watch('dev/scss/**/*.scss', ['sass'])
    gulp.watch('dev/css/*.css', ['css'])
    gulp.watch('dev/*.html', ['html'])
});

gulp.task('default',['connect','images','add-normalize','sass', 'css','html', 'watch']);