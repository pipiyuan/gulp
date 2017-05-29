const gulp = require('gulp');
const eslint = require('gulp-eslint'); // 语法检查
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify'); // 最小化 js
const less = require('gulp-less');
const jade = require('gulp-jade'); 
const prefixer = require('gulp-autoprefixer')
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('gulp-cssnano');
const sequence = require('gulp-sequence');
const del = require('del');
const gulpif = require('gulp-if');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const sourcemaps = require('gulp-sourcemaps');
const babelify = require('babelify');

const server_port = 8080;

let folder = './dist/';
let build_folder = './build/';
let type = 'DEV';

const js = './src/scripts/moduls/**/*.js';
const entry = './src/scripts/entry/main.js';
const views = './src/views/**/*.jade';
const cssmain = './src/style/entries/*.less';
const cssdir = './src/style/**/*.less';
const images = './src/images/**/*';
const mockdata = './src/mock/**/*';

gulp.task('clear', function(){
	del.sync([folder]);
});

gulp.task('compile-js', function(){
	return 	gulp.src(js)
				.pipe(eslint())
				.pipe(eslint.format());
});

gulp.task('entry-js', function(){
	let b = browserify({
	    	entries: entry,
		    debug: true,
		    transform: [babelify.configure({
		      presets: ['es2015']
		    })]
	  	});

	return 	b.bundle()
		    .pipe(source('entry/main.js'))
		    .pipe(buffer())
		    .pipe(sourcemaps.init({ loadMaps: true }))
		      // Add other gulp transformations (eg. uglify) to the pipeline here.
		      // .on('error', util.log)
		    .pipe(sourcemaps.write('./'))
		    .pipe(gulp.dest(folder));
});

gulp.task('compile-library', function(){
	let libs = require('./package.json').dependencies;
	libs = Object.keys(libs).map(function(value, index, array){
		return gulp.src('./node_modules/' + value + '/**/*').pipe(gulp.dest(folder + 'libs/' + value + '/'));
	});
});

gulp.task('compile-page',function(){
	return	gulp.src(views)
				.pipe(jade())
				.on('error', function(error){
					console.dir(error);
					this.emit('end');
				})
				.pipe(gulp.dest(folder));
});

gulp.task('compile-less',function(){
	gulp.src(cssmain,{base: 'src/style/entries'})
		.pipe(less())
		.on('error', function(error){
			console.dir(error);
			this.emit('end');
		})
		.pipe(prefixer())
		.pipe(gulp.dest(folder+'/style'));
});

gulp.task('compile-image',function(){
	return	gulp.src(images)
				.pipe(jade())
				.pipe(gulp.dest(folder));

});

// 本地模拟json数据
gulp.task('compile-mock-data',function(){
	return	gulp.src(mockdata)
				.pipe(gulp.dest(folder));

});

gulp.task('watch',function(){
	gulp.watch(js,['compile-js', 'entry-js']);
	gulp.watch(views,['compile-page']);
	gulp.watch(cssdir,['compile-less']);
	gulp.watch(images,['compile-image']);
	gulp.watch(mockdata,['compile-mock-data']);
	gulp.watch(folder + '/**/*', {read: false }).on('change', function(event){
		browserSync.reload();
	});	
});

gulp.task('default', ['compile-js', 'compile-page', 'compile-less', 'compile-image', 'compile-library', 'compile-mock-data', 'entry-js']);

gulp.task('server', ['default'], function(){
	console.log('##Starting Server.......');
	browserSync.init({
		port: server_port,
		server: folder
	}, function(){
		gulp.run('watch');
	})
});

gulp.task('start', sequence(['clear', 'server']));

gulp.task('build', ['clear'], function()  {
    folder = build_folder;
    type = 'build';
    gulp.start('default');
});
















