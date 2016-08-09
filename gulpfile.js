'use strict';
const gulp = require('gulp');
const mocha = require('gulp-mocha');
const eslint = require('gulp-eslint');

let appFiles = ['./server.js', './lib/*.js', './models/*.js', '/routes/*.js'];

gulp.task('lint:all', () => {
  gulp.src(appFiles)
    .pipe(eslint())
    .pipe(eslint.format());
  gulp.src('./tests/test_harness.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('mocha', () => {
  gulp.src('./tests/test_harness.js')
    .pipe(mocha());
});

gulp.task('default', ['lint:all', 'mocha']);
