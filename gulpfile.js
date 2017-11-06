var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var purify = require('gulp-purifycss');
var gulpCopy = require('gulp-copy');
var htmlmin = require('gulp-htmlmin');
var minify = require('gulp-minify');

gulp.task('css', function() {
    return gulp.src('./css/*.css')
      .pipe(purify(['index.html']))
      .pipe(cleanCss({}))
      .pipe(gulp.dest('./build/css'));
  });

gulp.task('js', function(){
    return gulp.src('js/*.js')
        .pipe(minify({ ext:{
            src:'.js',
            min:'.js'
        }}))
        .pipe(gulp.dest('build/js'));
});

gulp.task('copy-html', function(){
    return gulp
    .src('index.html')
    .pipe(gulpCopy('build', {}));
})

gulp.task('min-html', function(){
    return gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true,removeComments:true}))
        .pipe(gulp.dest('build'));
})

gulp.task('copy-img', function(){
    return gulp
    .src('img/**/*.*')
    .pipe(gulpCopy('build', {}));
})

gulp.task('copy-fonts', function(){
    return gulp
    .src('fonts/**/*.*')
    .pipe(gulpCopy('build', {}));
})

gulp.task('copy-other', function(){
    return gulp
    .src(['submit.php','.htaccess'])
    .pipe(gulpCopy('build', {}))
})

gulp.task('build-prod',['min-html','copy-img','copy-fonts','copy-other','css','js'], function(){

})