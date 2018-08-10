const gulp = require('gulp'); //Brings tools in our file
const sass = require('gulp-sass');

gulp.task('styles', function() {
  gulp.src('./sass/**/*.scss') //Take everything in sass
  .pipe(sass().on('error', sass.logError)) // Compile it using sass
  .pipe(gulp.dest('./public/css')); // Dump it into public as a css file
});

//Watch task
gulp.task('default',function() {
  gulp.watch('./sass/**/*.scss',['styles']); // Watches file for change
});