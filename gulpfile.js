var gulp         = require('gulp');
var gutil        = require('gulp-util');
var coffee       = require('gulp-coffee');
var sass         = require('gulp-ruby-sass');
var autoprefixer = require('gulp-autoprefixer');
var open         = require('gulp-open');

var paths = {
    javascripts: 'client/javascripts/*.coffee',
    stylesheets: 'client/stylesheets/*.sass',
    indexFile: './index.html'
}

gulp.task('javascripts', function() {
    gulp.src(paths.javascripts)
        .pipe(coffee({bare: true}).on('error', gutil.log))
        .pipe(gulp.dest('build/javascripts/'));
});

gulp.task('stylesheets', function(){
    gulp.src(paths.stylesheets)
        .pipe(sass({ style: 'compressed' }))
        .pipe(autoprefixer('last 15 versions'))
        .pipe(gulp.dest('build/stylesheets/'));
});

gulp.task('open', function(){
    gulp.src(paths.indexFile)
        .pipe(open("<%file.path%>"));
});

gulp.task('watch', function(){
    gulp.watch(paths.javascripts, ['javascripts']);
    gulp.watch(paths.stylesheets, ['stylesheets']);
});

gulp.task('default', ['watch', 'javascripts', 'stylesheets', 'open']);
