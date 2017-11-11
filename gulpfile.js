var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var purify = require('gulp-purifycss');
var gulpCopy = require('gulp-copy');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var pump = require('pump');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var revReplace = require('gulp-rev-replace');
var rev = require('gulp-rev');
var cachebust = require('gulp-cache-bust');
var gutil = require('gulp-util');
var critical = require('critical').stream;

gulp.task('critical', function () {
    return gulp.src('build/*.html')
        .pipe(critical({base: 'build/', inline: true,minify:true, css: ['build/css/combined.css']}))
        .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
        .pipe(gulp.dest('build'));
});


gulp.task('css', function() {
    return gulp.src('./css/*.css')
      .pipe(purify(['index.html']))
      .pipe(cleanCss({}))
      .pipe(gulp.dest('./build/css'));
  });

function css() {
    return gulp.src('./build/css/*.css')
      .pipe(purify(['index.html']))
      .pipe(cleanCss({}))
      .pipe(gulp.dest('./build/css'));
  };

gulp.task('js', function(){
    return gulp.src('js/*.js')
        .pipe(uglify())
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

function minBuildHtml(){    
    return gulp.src('build/index.html')
        .pipe(htmlmin({collapseWhitespace: true,removeComments:true}))
        .pipe(gulp.dest('build'));
}

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
    .src(['submit.php','sys/.htaccess'])
    .pipe(gulpCopy('build', {}))
})


gulp.task('useref', function () {
    return gulp.src('index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCss()))        
      //  .pipe(revReplace())
        .pipe(gulp.dest('build'));
});

function cacheBust(){
    return gulp.src('build/index.html')
        .pipe(cachebust())
        .pipe(gulp.dest('build.index.test.html'))
}

gulp.task('build-prod',['min-html','copy-img','copy-fonts','css','js'], function(){
   
})


gulp.task('build',['useref','copy-img','copy-fonts','copy-other'], function(){
    css();
    minBuildHtml();
 })