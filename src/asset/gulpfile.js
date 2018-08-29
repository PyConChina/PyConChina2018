var gulp = require('gulp');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var paths = {
  styles: {
    src: 'css/style.css',
    dest: 'css/'
  },
  scripts: {
    src: 'js/usejs/*.js',
    dest: 'js/'
  }
}
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(less())
    .pipe(cleanCSS())
    // pass in options to the stream
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

function scripts() {
  return gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(uglify())
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.scripts.dest));
}

exports.styles = styles;
exports.scripts = scripts;
var build = gulp.parallel(styles, scripts)
gulp.task('build', build);
gulp.task('default', build);