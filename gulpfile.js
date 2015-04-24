var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var wiredep = require('wiredep');

var app = {
  src: 'src',
  scss: 'src/**/*.scss',
  js: 'src/**/*.js',
  build: 'build',
  target: 'target'
};

gulp.task('scss', function() {
  return gulp.src(app.scss)
    .pipe(plugins.sass())
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.concatCss('main.css'))
    .pipe(plugins.minifyCss({compatibility: 'ie8'}))
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(app.build + '/css'));
});

gulp.task('clean', function() {
  return gulp.src([app.build, app.target], {read: false})
    .pipe(plugins.clean());
});

gulp.task('jshint', function() {
  return gulp.src(app.js)
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('js', ['jshint'], function() {

  return gulp.src([app.js, app.build])
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.ngAnnotate({single_quotes: true, gulpWarnings: false}))
    .pipe(plugins.uglify())
    .pipe(plugins.sourcemaps.write())
    .pipe(gulp.dest(app.target + '/js'));
});

// Injecting dependencies to the HTML
gulp.task('inject', function() {
  var injectOptions = {
    ignorePath: [app.build],
    addRootSlash: false
  };

  var target = gulp.src(app.src + '/index.html');
  var scriptSources = gulp
    .src([app.target + '/**/*.js'])
    .pipe(plugins.angularFilesort());

  var cssSources = gulp
    .src([app.build + '/**/*.css']);

  var wiredepOpts = {
    ignorePath: '..',
    exclude: ['jquery', 'bootstrap.js', 'bootstrap.css']
  };

  var assets = plugins.useref.assets();

  return target
    .pipe(wiredep.stream(wiredepOpts))
    .pipe(plugins.inject(scriptSources, injectOptions))
    .pipe(plugins.inject(cssSources, injectOptions))
    .pipe(gulp.dest(app.build))
    .pipe(assets)
    .pipe(plugins.if('*.js', plugins.uglify()))
    .pipe(assets.restore())
    .pipe(plugins.useref())
    .pipe(gulp.dest(app.build));
});

gulp.task('serve', ['build'], function() {

  browserSync.init({
    host: 'localhost',
    port: 8000,
    server: app.build
  });

  //gulp.watch(app.scss, ['scss', reload]);
  //gulp.watch(app.js, ['js', reload]);
});

gulp.task('build', function(callback) {
  runSequence('clean',
    ['scss', 'js'],
    'inject',
    callback);
});

gulp.task('default', ['build'], function() {
});
