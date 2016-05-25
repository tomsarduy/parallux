var gulp       = require('gulp');
var gutil      = require('gulp-util');
var jshint     = require('gulp-jshint');
var sass       = require('gulp-sass');
var cleanCSS   = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');

gulp.task('default', ['jshint', 'compile-css', 'compile-js', 'compile-demos', 'watch']);

// JSHint task in case you want to modify the plugin
// keep the same code style
gulp.task('jshint', function(){
	return gulp.src('src/*.js')
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'));
});


// Compile the SASS file, the not minified one support sourcemaps 
// in case you want to use it for deployment
gulp.task('compile-css', function(){
	return gulp.src('src/*.scss')
			.pipe(sourcemaps.init())
				.pipe(sass())
			.pipe(sourcemaps.write(''))
			.pipe(gulp.dest('dist/'))
			.pipe(cleanCSS())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist/'));
});

gulp.task('compile-demos', function(){
	return gulp.src('demos/scss/*.scss')
			.pipe(sass())
			.pipe(gulp.dest('demos/css/'))
});

// Minify the Javascript file
gulp.task('compile-js', function(){
	return gulp.src('src/*.js')
			.pipe(sourcemaps.init())
				.pipe(uglify())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest('dist/'));
});

// Task to compile the demos CSS
gulp.task('watch', function(){
	gulp.watch('src/*.js', ['jshint', 'compile-js']);
	gulp.watch('demos/scss/*.scss', ['compile-demos']);
	gulp.watch('src/*.scss', ['compile-css']);
});
