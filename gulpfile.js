var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
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
  html: 'src/**/*.html',
  build: 'build',
  target: 'target'
};

gulp.task('scss', function() {
  return gulp.src(app.scss)
    .pipe($.sass())
    .pipe($.sourcemaps.init())
    .pipe($.concatCss('main.css'))
    .pipe($.minifyCss({compatibility: 'ie8'}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(app.build + '/css'));
});

gulp.task('clean', function() {
  return gulp.src([app.build, app.target], {read: false})
    .pipe($.clean());
});

gulp.task('jshint', function() {
  return gulp.src(app.js)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('js', ['jshint', 'config'], function() {

  return gulp.src([app.js, app.build])
    .pipe($.sourcemaps.init())
    .pipe($.ngAnnotate({single_quotes: true, gulpWarnings: false}))
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(app.target + '/js'));
});

gulp.task('html', function() {
  return gulp.src(app.html)
    .pipe($.minifyHtml({empty: true, spare: true, quotes: true}))
    .pipe($.angularTemplatecache({module: 'yepinessApp'}))
    .pipe(gulp.dest(app.target + '/js'));
});

gulp.task('config', function() {

  var configFile = require('./' + app.src + '/config.json');

  return $.ngConstant({
    name: 'config',
    constants: configFile['development'],
    stream: true
  })
    .pipe(gulp.dest(app.target));
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
    .pipe($.angularFilesort());

  var cssSources = gulp
    .src([app.build + '/**/*.css']);

  var wiredepOpts = {
    ignorePath: '..',
    exclude: ['jquery', 'bootstrap.js', 'bootstrap.css']
  };

  var assets = $.useref.assets();

  return target
    .pipe(wiredep.stream(wiredepOpts))
    .pipe($.inject(scriptSources, injectOptions))
    .pipe($.inject(cssSources, injectOptions))
    .pipe(gulp.dest(app.build))
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: 'ie8'})))
    .pipe(assets.restore())
    .pipe($.useref())
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
    ['scss', 'js', 'html'],
    'inject',
    callback);
});

gulp.task('default', ['build'], function() {
});
