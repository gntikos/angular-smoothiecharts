var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify')
    ngAnnotate =require('gulp-ng-annotate');

gulp.task('test', function() {
    gulp.src(['./js/directives.js'])
        .pipe(ngAnnotate())
        .pipe(gulp.dest('./dist'))
});

gulp.task('scripts', function() {
    gulp.src(['./vendor/smoothie/smoothie.js', './js/directives.js'])
        .pipe(concat('angular-smoothie.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});