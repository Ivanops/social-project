(function() {

  'use strict';
  var gulp        = require('gulp');
  var concat      = require('gulp-concat');
  var uglify      = require('gulp-uglify');
  var stylus      = require('gulp-stylus');
  var cleanCSS    = require('gulp-clean-css');
  var cssBase64   = require('gulp-css-base64');
  var embed       = require('gulp-angular-embed-templates');
  var order       = require("gulp-order");
  var runSeq      = require('run-sequence').use(gulp);
  var clean       = require('gulp-clean');
  var server      = require('gulp-server-livereload');
  var wiredep     = require('wiredep').stream;
  var browserSync = require('browser-sync').create();

  gulp.task('build', function() {
    runSeq('convert-css', 'vendor-js', 'minify-js', 'minify-css', 'clean-files', 'copy-files');
  });

  gulp.task('deploy', function() {
    runSeq('development', 'serve');
  });

  gulp.task('development', function() {
    runSeq('convert-css', 'minify-js', 'minify-css', 'clean-files', 'copy-files', 'bower');
  });

  /**
   * Gulp task to convert .styl files to css files
   *
   * @usage
   *  $ gulp convert-css --gulpfile gulpfile.js
   */

  gulp.task('convert-css', function () {
    gulp.src(['src/styles/*.styl'], { base: './' })
    .pipe(stylus())
    .pipe(gulp.dest('./'));
  });

  /**
  * Gulp task to minify js and embed html templates files
  *
  * @usage
  *   $ gulp minify-js  --gulpfile gulpfile.js
  */
  gulp.task('minify-js', function () {
    return gulp.src([
      'src/social-component.module.js',
      'src/**/*.controller.js',
      'src/**/*.component.js',
      'src/**/*.js',
      'src/**/*.min.js'])
    .pipe(embed())
    .pipe(concat('set.social.components.min.js'))
    .pipe(gulp.dest('dist/'));
  });

  /**
   * Gulp task to minify vendor files
   *
   * @usage
   *   $ gulp vendor-js  --gulpfile gulpfile.js
   */
  gulp.task('vendor-js', function () {
    gulp.src([
      './node_modules/zinfinitescroll/zInfiniteScroll.js',
      './node_modules/ng-content-editable/dist/ng-content-editable.min.js',
      './node_modules/angular-bootstrap-contextmenu/contextMenu.js',
      './node_modules/moment/min/moment.min.js',
      './node_modules/angular-moment/angular-moment.js',
      './node_modules/sockjs-client/dist/sockjs.js',
      './node_modules/stompjs/lib/stomp.js'
    ])
    .pipe(order([
      "**/*/zInfiniteScroll.js",
      "**/*/ng-content-editable.min.js",
      "**/*/contextMenu.js",
      "**/*/moment.min.js",
      "**/*/angular-moment.js",
      "**/*/sockjs.js",
      "**/*/stomp.js"
    ], { base: './' }))
    .pipe(concat('set.social.vendor.min.js'))
    .pipe(gulp.dest('dist/'));
  });

  /**
  * Gulp task to minify css files
  *
  * @usage
  *   $ gulp minify-css  --gulpfile gulpfile.js
  */
  gulp.task('minify-css', function() {
    return gulp.src(['src/styles/*.css'])
      .pipe(cssBase64(
      {
        maxWeightResource: 1000000000,
        extensionsAllowed: ['.gif', '.jpg', '.png']
      }
      ))
      .pipe(concat('set.social.components.min.css'))
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('dist/'));
  });

    /**
     * Gulp task to clean minified files on angular-template-web folder
     *
     * @usage
     *  $ gulp clean-files --gulpfile gulpfile.js
     */

    gulp.task('clean-files', function () {
      return gulp.src([
        './client/set.social.components.min.js',
        './client/set.social.components.min.css',
        'src/styles/*.css'])
      .pipe(clean({ read: false, force: true }));
    });

    /**
     * Gulp task to copy minified files on angular-template-web folder
     *
     * @usage
     *  $ gulp copy-files --gulpfile gulpfile.js
     */

    gulp.task('copy-files', function () {
      gulp.src([
         './dist/set.social.components.min.js',
        './dist/set.social.components.min.css'
        /* './dist/set.social.vendor.min.js'*/])
      .pipe(gulp.dest('./client'));
    });

    gulp.task('bower', function () {
      gulp.src('./client/index.html')
        .pipe(wiredep())
        .pipe(gulp.dest('./client'));
    });

    gulp.task('webserver',  function() {
      gulp.src('.')
      .pipe(server({
        livereload:       true,
        directoryListing: true,
        open:             true,
        log:              'debug',
        clientConsole:    false,
        port:             9191,
        host:             'localhost'
      }));
    });

    gulp.task('serve', function(){
      browserSync.init({
        server: "./client"
      });

      gulp.watch('./client/**/*.*').on('change', function(){ browserSync.reload();});
      gulp.watch('./src/**/*.*').on('change', function(){ runSeq('development');})
    })

  gulp.task('last', ['build']);
  gulp.task('default', ['deploy']);

})();
