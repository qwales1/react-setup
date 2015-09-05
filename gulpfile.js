var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var changed = require('gulp-changed');
var del = require('del');
var paths = {
  scripts : ['./src/javascripts/**/*.js',],
  styles : './src/stylesheets/main.scss',
  dist: './dist',
  images: './src/images/**/*',
  fonts: './src/fonts/**/*'
}
gulp.task('css',['clean'], function() {
  var stream = gulp.src(paths.styles)
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./build/stylesheets'));
  return stream;
});
gulp.task('js', ['clean'],function () {
  var stream = gulp.src(paths.scripts)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./build/javascripts'));
  return stream;
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['build']);
});

gulp.task('webpack', ['clean'], function(done){
  webpack(clientConfig).run(function(err, stats){
    if(err){
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    done();
  });
});


gulp.task('images', ['clean'], function(){
  var stream = gulp.src(paths.images)
    .pipe(gulp.dest('./build/images'));
    return stream;
});

gulp.task('fonts', ['clean'], function(){
  var stream = gulp.src(paths.fonts)
    .pipe(gulp.dest('./build/fonts'));
    return stream;
});

gulp.task('clean', function(done){
  del([paths.dist + '/**/*'], done);
});

gulp.task('build', ['clean','webpack','css','js','images','fonts']);

gulp.task('default', ['build']);
