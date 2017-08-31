var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass', function() {
  return gulp.src('app/sass/*.scss')
    .pipe(sass({
      outputStyle: "expanded"
    }).on('error', sass.logError))
    .pipe(gulp.dest('app/css'))
});

gulp.task('watch', function() {
  gulp.watch('app/sass/*.scss', ['sass']);
});

gulp.task('default', ['watch']);
