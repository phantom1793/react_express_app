const gulp = require('gulp');
const sass = require('gulp-sass');
const webpackStream = require('webpack-stream');
const webpack = require('webpack');
const nodemon = require('gulp-nodemon');
const browserSync = require('browser-sync');
const webpackConfig = require('./webpack.config');

// nodemon + browserSync で ファイル更新時にブラウザをリロード
gulp.task('browser', ['nodemon'], function () {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    port: '4000',
    files: [
      'views/**/*.*',
      'public/dist/**/*.js',
      'public/images/*.*',
      'public/css/*.css'
    ]
  });
});
// nodemon起動
gulp.task('nodemon', function (cb) {
  var started = false;

  return nodemon({
    script: 'bin/www'
  }).on('start', function () {
    if(!started) {
      cb();
      started = true;
    }
  });
});
// webpack
gulp.task('webpack', function () {
  return webpackStream(webpackConfig, webpack)
        .pipe(gulp.dest('./public/dist'));
});
// sass
gulp.task('sass', function () {
  return gulp.src('./public/sass/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css/style.css'));
});

gulp.task('default', ['browser'], function () {
  gulp.start(['webpack','sass']);
  gulp.watch('./public/sass/**/*.scss', ['sass']);
  gulp.watch('./public/src/**/*.js', ['webpack']); 
});
