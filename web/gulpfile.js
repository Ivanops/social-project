(function() {

  'use strict';
  var gulp    = require('gulp');

  /**
  * Gulp task to run the web server and live reload the changes in browser
  *
  * @usage
  *   $ gulp webserver --gulpfile gulpfile.js
  */

  var server  = require('gulp-server-livereload');
  var hostBindAddress=process.env.BIND_ADDRESS || "localhost";
  gulp.task('webserver', function() {
    gulp.src('.')
    .pipe(server({
          livereload: false,
      directoryListing: true,
      open:             true,
      log:              'debug',
      clientConsole:    true,
      port:             9191,
      host:             hostBindAddress
    }));
  });

  gulp.task('default', ['webserver']);
   
})();
