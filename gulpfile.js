'use strict';

var gulp = require('gulp'),
	jade = require("gulp-jade"),
	sass = require("gulp-sass"),
	browserSync = require("browser-sync"),
	prettify = require("gulp-prettify"),
	wiredep = require('wiredep').stream,
	concatCss = require('gulp-concat-css'),
	imagemin = require('gulp-imagemin'),
	reload = browserSync.reload;


// =========================================
// =========================================
// ====== Локальная разработка APP =========

// Компилируем Jade в html
gulp.task('jade', function(){
	gulp.src('app/templates/index.jade')
		.pipe(jade())
		.on('error',  log)
		.pipe(prettify({indent_size: 3}))
		.pipe(gulp.dest('app/'))
		.pipe(reload({stream: true}));
});

// Подключаем ссылки на bower components
gulp.task('wiredep', function(){
	gulp.src('app/templates/common/*.jade')
		.pipe(wiredep({
			exclude: ['modernizr.js'],
			ignorePath: /^(\.\.\/)*\.\./
		}))
		.pipe(gulp.dest('app/templates/common/'));
});

// Работа с Sass
gulp.task('sass', function() {
    return gulp.src('app/sass/*.scss')
        .pipe(sass({
            sourceComments: 'map'
        }))
        .pipe(concatCss("bundle.css"))
        .pipe(gulp.dest('app/css/'));
});

// Запускаем локальный сервер (только после компиляции jade)
gulp.task('server', ['jade', 'sass'], function(){
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});

// Слежка и запуск задач
gulp.task('watch', function(){
	gulp.watch('app/templates/**/*.jade', ['jade']);
	gulp.watch('bower.json', ['wiredep']);
	gulp.watch('app/sass/*.scss', ['sass']);
	gulp.watch([
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', reload);
});

// Задача по умолчанию
gulp.task('default', ['server', 'watch']);


// Картинки
gulp.task('images', function(){
	return gulp.src('app/img/**/*')
		.pipe(imagemin({
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('dist/img'));
});

// Проверка сборки
gulp.task('server-dist', function(){
	browserSync({
		notify: false,
		port: 9000,
		server: {
			baseDir: 'dist'
		}
	});
});


// =========================================
// =========================================
// ================ Функции ================

// Более наглядный вывод ошибок
var log = function (error){
	console.log([
		'',
		"----------ERROR MASSAGE START---------",
		("[" + error.name + " in " + error.plugin + "]"),
		error.message,
		"----------ERROR MASSAGE END----------",
		''
	].join('\n'));
	this.end();
};

