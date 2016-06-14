var 
	gulp          = require('gulp'),
	nodemon       = require('gulp-nodemon'),
	livereload    = require('gulp-livereload');



gulp.task('watch', function () {
	livereload.listen();

  	gulp.watch(["public/css/"]).on("change", function() {
  		livereload.changed;
  	});
  	gulp.watch(["public/js/*.js"]).on("change", function() {
  		livereload.changed;
  	});
  	gulp.watch('public/js/lib/**/*', ['bundle-libraries-auto']).on("change", function() {
  		livereload
  	});

});



gulp.task('nodemon', function (cb) {
  var started = false;
  return nodemon({
    script: 'app.js',
    nodeArgs: ['']
  }).on('start', function () {
    if (!started) {
      console.log('gulpfile>nodemon not started')
      setTimeout(function () {
        //open(config.siteUrl.development)
      }, 2000);

      cb();
      started = true;
    }
  });
});

gulp.task('default', function () {
  gulp.start('nodemon', 'watch');
});