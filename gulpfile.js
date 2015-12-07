'use strict';
/* jslint node: true */

var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('default', function () {
  gulp.src('./async_await.js')
    .pipe(babel({
      plugins: [
        [
          'transform-async-to-module-method', {
            module: 'bluebird',
            method: 'coroutine'
          }
        ],
        'babel-plugin-transform-es2015-modules-commonjs'
      ]
    }))
    .pipe(
      gulp.dest('./dist')
    );
});
