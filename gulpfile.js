var gulp = require("gulp");
var sass = require("gulp-sass");
var watch = require("gulp-watch");
var batch = require('gulp-batch');
var connect = require('gulp-connect');

gulp.task('sass', function() {
    return gulp.src('./scss/main.scss')
    .pipe(sass().on('error', sass.logError))
   .pipe(gulp.dest('./assets/css/'));
});

gulp.task('connect', function() {
    connect.server({
        root: './',
        port: 8888,
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./index.html')
      .pipe(gulp.dest('./'))
      .pipe(connect.reload());
  });

gulp.task('watch', function() {
    watch('./scss/**/**.scss', batch(function(events, done) {
        gulp.start('sass', 'html', done);
    }));
});

gulp.task('default', ['watch']);