'use strict';

let cprocess = require('child_process');
let del = require('del');
let dotenv = require('dotenv');
let gulp = require('gulp');
let autoprefixer = require('gulp-autoprefixer');
let preprocess = require('gulp-preprocess');
let sass = require('gulp-sass');
let sourcemaps = require('gulp-sourcemaps');
let ts = require('gulp-typescript');

dotenv.load();

// Server tasks.

gulp.task('server.build', gulp.series(server_clean, server_build_js));

// Client tasks.

gulp.task('client.build', gulp.series(client_clean, client_build_js));

// Public tasks.

gulp.task('public.build', gulp.series(public_clean, gulp.parallel(public_build_css, public_build_images, public_build_fonts)));

// Shared tasks.

gulp.task('play', gulp.series(gulp.parallel('server.build', 'client.build', 'public.build'), server_start, gulp.parallel(server_watch, client_watch, public_watch)));

/**
 * Server functions.
 */

// Clean

function server_clean() {
  return del('dist/server')
}

// Build

let serverProject = ts.createProject('app/server/tsconfig.json', {
  typescript: require('typescript'),
});

function server_build_js() {
  let result = gulp.src('{app/server,lib}/**/*.ts').pipe(sourcemaps.init()).pipe(preprocess({ context: { SERVER: true } })).pipe(ts(serverProject));

  return result.js.pipe(sourcemaps.write()).pipe(gulp.dest('dist/server'));
}

// Watch

function server_watch() {
  gulp.watch('{app/server,lib}/**/*.ts', gulp.series(server_build_js, server_kill, server_start));
}

// Start

var serverProcess = null;

function server_start(done) {
  let app = require('./dist/server/app/server/app').app;

  serverProcess = app.listen(8000, () => {
    console.log(`Listening on port: ${serverProcess.address().port}`);
    done();
  });
}

function server_kill(done) {
  if (serverProcess) {
    delete require.cache[require.resolve('./dist/server/app/server/app')];
    serverProcess.close();
  }

  done();
}

/**
 * Client functions.
 */

// Clean

function client_clean() {
  return del('dist/client')
}

// Build

let clientProject = ts.createProject('app/client/tsconfig.json', {
  typescript: require('typescript'),
});

function client_build_js() {
  let result = gulp.src('{app/client,lib}/**/*.ts').pipe(sourcemaps.init()).pipe(preprocess({ context: { CLIENT: true } })).pipe(ts(clientProject));

  return result.js.pipe(sourcemaps.init()).pipe(gulp.dest('dist/client'));
}

// Watch

function client_watch() {
  gulp.watch('app/client/**/*.ts', client_build_js);
}

/**
 * Public functions.
 */

// Clean

function public_clean() {
  return del('dist/public')
}

// Build

function public_build_css() {
  return gulp.src('public/css/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: 'node_modules' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/public'))
}

function public_build_images() {
  return gulp.src('public/images/**/*.{png,svg,jpg}').pipe(gulp.dest('dist/public'));
}

function public_build_fonts() {
  return gulp.src('public/fonts/**/*.woff').pipe(gulp.dest('dist/public'));
}

function public_watch() {
  gulp.watch('public/css/**/*.scss', public_build_css);
  gulp.watch('public/images/**/*.{png,svg,jpg}', public_build_images);
  gulp.watch('public/fonts/**/*.woff', public_build_fonts);
}
