var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('default', function() {
  gulp.src('test/*.js').pipe(jasmine());
});