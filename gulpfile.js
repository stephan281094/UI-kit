var gulp         = require('gulp');
var gutil        = require('gulp-util');
var coffee       = require('gulp-coffee');
var sass         = require('gulp-ruby-sass');
var autoPrefix   = require('gulp-autoprefixer');
var open         = require('gulp-open');
var bower        = require('gulp-bower');
var concat       = require('gulp-concat');
var runSequence  = require('run-sequence');

var paths = {
    javascripts: 'client/javascripts/*.coffee',
    stylesheets: 'client/stylesheets/*.sass',
    indexFile: './index.html',
    styles: {
        animatecss: 'libs/animate.css/animate.min.css',
        normalizecss: 'libs/normalize.css/normalize.css'
    }
}

gulp.task('bower', function(){
    return bower('./libs');
});

gulp.task('javascripts', function() {
    return gulp.src(paths.javascripts)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('build/javascripts/'));
});

gulp.task('stylesheets', function(){
    return gulp.src(paths.stylesheets)
        .pipe(sass({ style: 'compact' }))
        .pipe(autoPrefix('last 15 versions'))
        .pipe(concat('all.min.css'))
        .pipe(gulp.dest('build/stylesheets/'));
});

gulp.task('watch', function(){
    gulp.watch(paths.javascripts, ['javascripts']);
    gulp.watch(paths.stylesheets, function(){
        runSequence('stylesheets');
    });
});

gulp.task('open', function(){
    gulp.src(paths.indexFile)
        .pipe(open("<%file.path%>"));
});


gulp.task('default', function(){
    runSequence('bower', ['javascripts', 'stylesheets'], 'watch', 'open');
});
