var gulp = require('gulp'),
	jsuglify = require('gulp-uglify'),
	minifyCss = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	jshint = require('gulp-jshint'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

gulp.task('serve', function(){

	browserSync.init({
		server: './'
	});
	
	gulp.watch('js/*.js', ['jshint']);
	gulp.watch('css/*.sass', ['sass']);
	gulp.watch('*.html').on('change', reload);
});


gulp.task('uglify-js', function(){
	return gulp.src('js/*.js')
	.pipe(jsuglify())
	.pipe(gulp.dest('dist/js'));
});

gulp.task('sass', function(){
	// gets directory
	return gulp.src('./css/*.sass')
	// pipes through sass function: optional param for no bloat syntax
	.pipe(sass({indentedSyntax: true}))
	// then runs the outputted css through a minifer
	.pipe(minifyCss())
	// and delivers is to this location
	.pipe(gulp.dest('./dist/css'))
	.pipe(reload({stream: true}));
});

gulp.task('jshint', function(){
	return gulp.src('js/*.js')
	.pipe(jshint())
	.pipe(jshint.reporter('jshint-stylish'))
	.pipe(jsuglify())
	.pipe(gulp.dest('./dist/js'))
	.pipe(reload({stream: true}));
});

gulp.task('default', ['serve']);