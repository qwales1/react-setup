var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var changed = require('gulp-changed');
var del = require('del');
var paths = {
  styles : './src/stylesheets/main.scss',
  dist: './dist',
  images: './src/images/**/*',
  fonts: './src/fonts/**/*',
  index: './src/index.html'
}
gulp.task('css',['clean'], function() {
    return gulp.src(paths.styles)
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/stylesheets'));
});

gulp.task('watch', function() {
  gulp.watch(paths.src, ['build']);
});

gulp.task('webpack', ['clean'], function(done){
  webpack(webpackConfig).run(function(err, stats){
    if(err){
      console.log('Error', err);
    } else {
      console.log(stats.toString());
    }
    done();
  });
});

gulp.task('index', ['clean'], function(){
    return gulp.src(paths.index)
    .pipe(gulp.dest(paths.dist));
})

gulp.task('images', ['clean'], function(){
     return gulp.src(paths.images)
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('fonts', ['clean'], function(){
     return gulp.src(paths.fonts)
    .pipe(gulp.dest('./dist/fonts'));

});

gulp.task('clean', function(done){
  return del([paths.dist + '/**/*']);
});

gulp.task('build', ['clean','index','webpack','css','images','fonts']);

gulp.task('default', ['build']);
