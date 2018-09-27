var gulp = 					require('gulp'),
		sass = 					require('gulp-sass'),
		browserSync = 	require('browser-sync'),
		concat = 				require('gulp-concat'),
		uglify = 				require('gulp-uglifyjs'),
		cssnano = 			require('gulp-cssnano'),
		rename = 				require('gulp-rename'),
		del = 					require('del'),
		imagemin = 			require('gulp-imagemin')
		pngquant = 			require('imagemin-pngquant'),
		cache = 				require('gulp-cache'),
		autoprefixer = 	require('gulp-autoprefixer'),
		notify       =  require("gulp-notify");

gulp.task('sass', function() {
	return gulp.src('src/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expanded'}).on('error', notify.onError()))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(gulp.dest('src/css'))
	.pipe(browserSync.reload({stream: true}));
});

// gulp.task('scripts', function(){
// 	return gulp.src([
// 		'src/vendor/jquery/dist/jquery.min.js',
// 		])
// 	.pipe(concat('vendor.js'))
// 	.pipe(uglify())
// 	.pipe(gulp.dest('src/js'));
// });

// gulp.task('css-vendor', ['sass'], function() {
// 	return gulp.src('src/css/vendor.css')
// 	.pipe(cssnano())
// 	.pipe(gulp.dest('src/css'));
// });

gulp.task('browser-sync', function(){
	browserSync({
		server: {	baseDir: 'src' },
		notify: false
	});
});

gulp.task('watch', ['browser-sync'], function() {
	gulp.watch(['src/sass/**/*.sass', 'src/sass/**/*.scss'], ['sass']);
	gulp.watch('src/*.html', browserSync.reload);
	gulp.watch('src/js/**/*.js', browserSync.reload);
});

// gulp.task('clean', function() {
// 	return del.sync('dist');
// });

// gulp.task('clearcache', function() {
// 	return cache.clearAll();
// });

// gulp.task('compress', function() {
// 	return gulp.src('src/img/**/*')
// 	.pipe(cache(imagemin({
// 		interlaced: true,
// 		progressive: true,
// 		svgoPlugins: [{removeViewBox: false}],
// 		use: [pngquant()]
// 	})))
// 	.pipe(gulp.dest('dist/img'));
// });

gulp.task('build', ['clean', 'css-vendor'], function(){
	var buildCss = gulp.src([
		'src/css/main.css', 
		'src/css/vendor.css'
		])
		.pipe(gulp.dest('dist/css'));

  var buildFonts = gulp.src('src/fonts/**/*')
  	.pipe(gulp.dest('dist/fonts'));

  var buildJs = gulp.src('src/js/**/*')
  	.pipe(gulp.dest('dist/js'));

  var buildHtml = gulp.src('src/*.html')
  	.pipe(gulp.dest('dist'));
});