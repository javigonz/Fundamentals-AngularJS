// File: Gulpfile.js
'use strict';

var gulp      = require('gulp'),
    connect   = require('gulp-connect'),
    jshint    = require('gulp-jshint'),
    historyApiFallback = require('connect-history-api-fallback');

// Servidor web de desarrollo
gulp.task('server', function() {
  connect.server({
    root: './',
    hostname: '0.0.0.0',
    port: 8080,
    livereload: true,
    middleware: function(connect, opt) {
      return [ historyApiFallback ];
    }
  });
});


// Recarga el navegador cuando hay cambios en el HTML
gulp.task('html', function() {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});


// Busca errores en el JS y nos los muestra por pantalla
gulp.task('jshint', function() {
  return gulp.src('./app/app/**/*.js')
    .pipe(jshint('.jshintrc'))  
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

// Vigila cambios que se produzcan en el código
// y lanza las tareas relacionadas
gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./bower.json'], ['wiredep']);
});

// Por defecto, cuando escribamos 'gulp' en la consola, ejecutará las tareas que estén entre corchetes
gulp.task('default', ['server','watch', 'jshint']);


