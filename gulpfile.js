var gulp = require('gulp'),

	// HTML / jade ---------------------------------------- */
	jade        = require('gulp-jade'),

	// CSS / ruby Sass  ----------------------------------- */
	rubySass    = require('gulp-ruby-sass'),
	filter = require('gulp-filter'),
	mq = require('gulp-combine-mq')
	sourcemaps  = require('gulp-sourcemaps'),

	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant'),

	/* Browser server sync -------------------------------- */
	browserSync = require('browser-sync'),
	shell = require('gulp-shell'),
	reload      = browserSync.reload;


/**
 * ----------------------------------------------------------------
 * setting
 * ----------------------------------------------------------------
 */


var config = {
	// Jade
	'jade': {
		'pretty': true
	},
	// ruby Sass / sourcemaps, 사용
	'ruby_sass': { // 옵션: Git Bash or Terminal ⇒ sass -h
		'default-encoding' : 'utf-8',    // Windows 환경에서 CP949 오류 발생 시
		'style'            : 'expanded', // compact, compressed, nested, expanded
		'sourcemap'        : true,
		// 'no-cache'         : true
	},
	'ruby_sass_sourcemaps': {
		'dir': 'maps',
		'options': {
			'includeContent' : false,
			'sourceRoot'     : 'source'
		}
	},
	// Browser-sync 브라우져 확인 가능
	'browserSync': { // 옵션: http://www.browsersync.io/docs/options/
		'server'  : ['dist'],
		'notify'  : false,
	}
};

/**
 * ----------------------------------------------------------------
 * gulp task command
 * ----------------------------------------------------------------
 */

// 기본 업무 실행, jade sass 사용, Sass 엔진 선택 & 사용 , browserSync 사용
gulp.task('default', [
	'jade',
	'sass',
	'image',
], function() {
	browserSync(config.browserSync)
	gulp.start('watch');
});

// watch로 실시간 변화 감지
gulp.task('watch', function() {
	gulp.watch(['src/**/*.jade'], ['watch:jade']);
	gulp.watch(['src/sass/**/*'], ['sass']);
});

gulp.task('watch:jade', ['jade'], reload);

// 변경 업무: Jade → HTML
gulp.task('jade', function() {
	return gulp.src('src/jade/**/!(_)*.jade')
		.pipe( jade( config.jade ) )
		.on('error', errorLog)
		.pipe( gulp.dest('dist') );
});

// 변경 업무: (sass|scss) → CSS
gulp.task('sass', function() {
	// gulp-ruby-sass 사용 시에는 디렉토리 명만 입력할 것!

	return rubySass('src/sass', config.ruby_sass)
		.on('error', rubySass.logError)
		.pipe( sourcemaps.write(config.ruby_sass_sourcemaps.dir, config.ruby_sass_sourcemaps.options) )
		// .pipe(mq())
		.pipe( gulp.dest('dist/css') )
		.pipe( filter('**/*.css') )
		.pipe( reload({stream: true}) );
});

// 변경 업무: images 디렉토리 이동 및 최적화 수행
gulp.task('image', function () {
	gulp.src('image/**/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe( gulp.dest('dist/image') );
});

gulp.task('clean', shell.task('rm -rf dist')); //clean 입력시 dist 폴더 제거

// 오류 발생 시에도 watch 업무 중단하지 않음.
function errorLog(error) {
	console.error(error.message);
	this.emit('end');
}