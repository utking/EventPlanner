/*eslint-env node */
var gulp = require('gulp');
var usemin = require('gulp-usemin');
var sourcemap = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

gulp.task('usemin', function() {
	return gulp.src('./index.html')
	.pipe(usemin({
		css: [ sourcemap.init(), rev(), sourcemap.write() ],
		html: [ minifyHtml({ empty: true }) ],
		js: [ sourcemap.init(), uglify(), rev(), sourcemap.write() ],
		inlinejs: [ uglify() ],
		inlinecss: [ minifyCss(), 'concat' ]
	}))
	.pipe(gulp.dest('dist/'));
});

gulp.task('partials', function () {
	gulp.
		src('js/views/**/*.html')
		.pipe(minifyHtml())
		.pipe(gulp.dest('dist/js/views/'));
});

gulp.task('fonts', function () {
	gulp.
		src('./bower_components/bootstrap/dist/fonts/**/*.*')
		.pipe(gulp.dest('dist/fonts/'));
});

gulp.task('default', ['fonts','partials','usemin']);
