var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify')
    ngAnnotate = require('gulp-ng-annotate');

gulp.task('default', function() {
    gulp.src(['./vendor/smoothie/smoothie.js', './js/directives.js'])
        .pipe(concat('angular-smoothie.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});