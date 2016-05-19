var gulp = require('gulp');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');

gulp.task('default', function(){
	return gutil.log('Gulp is up and running');
});

gulp.task('jshint', function(){
	return gulp.src('src/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('watch', function(){
	gulp.watch('src/*.js', ['jshint']);
});