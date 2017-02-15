var gulp = require('gulp');
var concat = require('gulp-concat');
 
gulp.task('concat-js-lib', [], function() {
  return gulp.src('./public/js/libs/*.js')
    .pipe(concat('all-lib.js'))
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('concat-js', [], function() {
  return gulp.src('./public/js/game/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./public/dist/'));
});

gulp.task('default', ['concat-js-lib', 'concat-js'], function(){});