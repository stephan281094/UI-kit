var gulp        = require('gulp');
var gutil       = require('gulp-util');
var bower       = require('gulp-bower');
var sass        = require('gulp-sass');
var coffee      = require('gulp-coffee');
var autoprefix  = require('gulp-autoprefixer');
var concat      = require('gulp-concat');
var minifycss   = require('gulp-minify-css');
var minifyjs    = require('gulp-uglify');
var webserver   = require('gulp-webserver');
var runSequence = require('run-sequence');

var config = {
    env: 'development'
}

var paths = {
    sass: './client/stylesheets/sass/*.scss',
    css: './client/stylesheets/css/*.css',
    coffee: './client/javascripts/coffee/*.coffee',
    js: './client/javascripts/js/*.js',
    libs: {
        css: {
            animate: './client/libs/animate.css/animate.min.css',
            normalize: './client/libs/normalize.css/normalize.css'
        },
        js: {
            // Add path of new js library
        }
    }
}

var webserver_config = {
    open: true,
    livereload: true
}


gulp.task('bower', function(){
    return bower('./client/libs');
});

gulp.task('sass', function(){
    return gulp.src(paths.sass)
        .pipe(sass({errLogToConsole: true}))
        .pipe(autoprefix('last 15 versions'))
        .pipe(gulp.dest('client/stylesheets/css/'));
});

gulp.task('coffee', function() {
    return gulp.src(paths.coffee)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('client/javascripts/js/'));
});

// Make sure to always put libraries first
gulp.task('concat_css', function(){
    return gulp.src([paths.libs.css.animate, paths.libs.css.normalize, paths.css])
        .pipe(concat('all.min.css'))
        .pipe(minifycss({keepBreaks:true}))
        .pipe(gulp.dest('./build/css/'));
});

// Make sure to always put libraries first
gulp.task('concat_js', function(){
    return gulp.src(paths.js)
        .pipe(concat('all.min.js'))
        .pipe(minifyjs())
        .pipe(gulp.dest('./build/js/'));
});

gulp.task('webserver', function() {
    gulp.src('./')
        .pipe(webserver(webserver_config));
});


gulp.task('default', function(){
    if(config.env === 'development'){
        runSequence('bower', ['sass', 'coffee'], 'webserver');
    }else{
        runSequence('bower', ['sass', 'coffee'], ['concat_css', 'concat_js'], 'webserver');
    }

    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.coffee, ['coffee']);
});
