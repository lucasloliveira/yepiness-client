var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*']
});
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');

var app = {
  src: 'src',
  styles: 'src/**/*.scss',
  images: 'src/images/*',
  scripts: 'src/**/*.js',
  html: 'src/**/*.html',
  dist: 'dist',
  libs: 'libs',
  build: {
    root: 'build',
    styles: 'build/styles',
    scripts: 'build/scripts',
    images: 'build/images'
  }
};

gulp.task('clean', function() {
  return gulp.src([app.build.root, app.dist], {read: false})
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.clean());
});

gulp.task('styles', function() {
  return gulp.src(app.styles)
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.sass())
    .pipe($.concatCss('main.css'))
    .pipe($.cssmin())
    .pipe(gulp.dest(app.build.styles))
    .pipe(browserSync.stream());
});

gulp.task('fonts', function() {
  return gulp
    .src(app.libs + '/**/*.{eot,svg,ttf,woff,woff2}', {base: app.libs})
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.flatten())
    .pipe(gulp.dest(app.dist + '/fonts'));
});

gulp.task('lint', function() {
  return gulp.src(app.scripts)
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('scripts', ['lint'], function() {
  return gulp.src(app.scripts)
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.ngAnnotate())
    .pipe(gulp.dest(app.build.scripts))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  gulp.src(app.images)
    .pipe($.image())
    .pipe(gulp.dest(app.build.images));
});

gulp.task('template', function() {
  var templateHeader = '(function() { \'use strict\'; angular.module("<%= module %>"<%= standalone %>).run(["$templateCache", function($templateCache) {';
  var templateFooter = '}]) })();';
  return gulp.src(app.html)
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.minifyHtml({empty: true, spare: true, quotes: true}))
    .pipe($.angularTemplatecache('templates.js', {
      module: 'app',
      templateHeader: templateHeader,
      templateFooter: templateFooter
    }))
    .pipe(gulp.dest(app.build.scripts))
    .pipe(browserSync.stream());
});

gulp.task('constants:dev', function() {
  var configFile = require('./' + app.src + '/config.json');

  return $.ngConstant({
    name: 'config',
    constants: configFile['development'],
    stream: true
  })
    .pipe(gulp.dest(app.build.scripts));
});

gulp.task('constants:prod', function() {
  var configFile = require('./' + app.src + '/config.json');

  return $.ngConstant({
    name: 'config',
    constants: configFile['production'],
    stream: true
  })
    .pipe(gulp.dest(app.build.scripts));
});

gulp.task('inject', function() {

  var injectOptions = {
    ignorePath: [app.build.root],
    addRootSlash: true
  };

  var scriptSources = gulp
    .src(app.build.root + '/**/*.js')
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.angularFilesort());

  var cssSources = gulp
    .src('build/**/*.css');

  return gulp.src(app.src + '/index.html')
    .pipe($.plumber({errorHandler: onError}))
    .pipe($.inject(cssSources, injectOptions))
    .pipe($.inject(scriptSources, injectOptions))
    .pipe(wiredep())
    .pipe(gulp.dest(app.build.root));
});

gulp.task('build:dev', function(callback){
  runSequence('clean',
    ['images', 'styles', 'scripts', 'template', 'constants:dev'],
    'inject',
    callback);
});

gulp.task('build:prod', function(callback){
  runSequence('clean',
    ['styles', 'scripts', 'template', 'constants:prod'],
    'inject',
    callback);
});

gulp.task('serve', ['build:dev'], function(){
  browserSync.init({
    host: 'localhost',
    port: 8000,
    server: {
      baseDir: [app.build.root],
      middleware: require('connect-modrewrite')([
        '^/api/(.*)$ http://localhost:3000/$1 [P]',
        '^[^\\.]*$ /index.html [L]'
      ]),
      routes: {'/libs': './libs'}
    }
  });

  gulp.watch(app.styles, ['styles']);
  gulp.watch(app.images, ['images']);
  gulp.watch(app.scripts, ['js-watch']);
  gulp.watch(app.html, ['html-watch']);
});

gulp.task('js-watch', ['scripts'], browserSync.reload);
gulp.task('html-watch', ['template'], browserSync.reload);

gulp.task('dist', ['build:prod', 'fonts'], function() {
  var assets = $.useref.assets();

  return gulp.src(app.build.root + '/*.html', {base: app.build.root})
    .pipe($.plumber({errorHandler: onError}))
    .pipe(assets)
    .pipe($.debug())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssmin()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(app.dist));

});

gulp.task('useref', function() {
  var assets = $.useref.assets();

  return gulp.src(app.build.root + '/*.html', {base: app.build.root})
    .pipe($.plumber({errorHandler: onError}))
    .pipe(assets)
    .pipe($.debug())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssmin()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest(app.dist));
});

gulp.task('start', ['dist'], function() {
  browserSync.init({
    host: 'localhost',
    port: 8000,
    server: {
      baseDir: [app.dist],
      middleware: require('connect-modrewrite')([
        '^/api/(.*)$ http://localhost:3000/$1 [P]',
        '^[^\\.]*$ /index.html [L]'
      ])
    }
  });
});

gulp.task('default', ['build:dev'], function() {
});

function onError(err) {
  $.util.log($.util.colors.red('ERROR: ') + $.util.colors.cyan(err.plugin) + ' - ' + err.message);
  this.emit('end');
}