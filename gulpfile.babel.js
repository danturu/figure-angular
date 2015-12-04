import cprocess from 'child_process'
import del from 'del'
import dotenv from 'dotenv'
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer'
import preprocess from 'gulp-preprocess'
import sass from 'gulp-sass'
import sequence from 'gulp-sequence'
import sourcemaps from 'gulp-sourcemaps'
import ts from 'gulp-typescript'

let env = process.env.NODE_ENV || 'development'

dotenv.load();

/**
 * Shared tasks.
 */

let sharedConfig = {
  lib: 'lib',
}

gulp.task('play', sequence(['server.watch', 'client.watch'], 'server.start'));

/**
 * Server tasks.
 */

let serverProject = ts.createProject('app/server/tsconfig.json', {
  typescript: require('typescript'),
});

let serverConfig = {
  src: 'app/server,bin',
  dest: '',
}

// Clean

gulp.task('server.clean', done => del(serverConfig.dest, done));

// Build

gulp.task('server.build.ts', () => {
  let result = gulp.src(`{${sharedConfig.lib},${serverConfig.src}}/**/*.ts`)
    .pipe(preprocess({ context: { SERVER: true } }))
    .pipe(ts(serverProject));

  return result.js.pipe(gulp.dest(serverConfig.dest));
})

gulp.task('server.build', (done) => sequence('server.clean', ['server.build.ts'], done));

// Watch

gulp.task('server.watch.ts', () =>
  gulp.watch(`{${sharedConfig.bin},${sharedConfig.lib},${serverConfig.src}}/**/*.ts`, ['server.restart'])
);

gulp.task('server.watch', sequence('server.build', ['server.watch.ts']));

// Start

var node;

gulp.task('server.start', () => {
  if (node) node.kill()

  node = cprocess.spawn('node', ['bin/www'], { stdio: 'inherit' })

  node.on('close', (code) => {
    if (code === 8) gulp.log('Error detected, waiting for changes...');
  });
})

gulp.task('server.restart', (done) => sequence('server.build.ts', 'server.start', done));

process.on('exit', () => {
  if (node) node.kill()
})

/**
 * Client tasks.
 */

let clientProject = ts.createProject('app/client/tsconfig.json', {
  typescript: require('typescript'),
});

let clientConfig = {
  src: 'app/client',
  dest: 'public/assets',

  exts: {
    assets: "{svg,png,jpg,eot,svg,ttf,woff,woff2}"
  },

  deps: {
    development: [
      "angular2/bundles/angular2.dev.js",
      "angular2/bundles/router.dev.js",
      "systemjs/dist/system.js",
      "firebase/lib/firebase-web.js",
    ]
  },
}

// Clean

gulp.task('client.clean', done => del(clientConfig.dest, done));

// Build

gulp.task('client.build.ts', () => {
  let result = gulp.src(`{${sharedConfig.lib},${clientConfig.src}}/**/*.ts`)
    .pipe(sourcemaps.init())
    .pipe(preprocess({ context: { CLIENT: true } }))
    .pipe(ts(clientProject));

  return result.js.pipe(sourcemaps.write()).pipe(gulp.dest(clientConfig.dest));
})

gulp.task('client.build.sass', () =>
  gulp.src(`${clientConfig.src}/assets/**/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(sass({ includePaths: 'node_modules' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(clientConfig.dest))
);

gulp.task('client.build.deps', () => {
  let deps = clientConfig.deps[env].reduce((deps, dep) =>
    deps.concat([`node_modules/${dep}`, `node_modules/${dep}.map`])
  , [])

  gulp.src(deps).pipe(gulp.dest(clientConfig.dest))
});

gulp.task('client.build.assets', () =>
  gulp.src(`${clientConfig.src}/assets/**/*.${clientConfig.exts.assets}`).pipe(gulp.dest(clientConfig.dest))
);

gulp.task('client.build', (done) => sequence('client.clean', ['client.build.deps', 'client.build.assets'], ['client.build.ts', 'client.build.sass'], done));

// Watch

gulp.task('client.watch.ts', () =>
  gulp.watch(`{${sharedConfig.lib},${clientConfig.src}}/**/*.ts`, ['client.build.ts'])
);

gulp.task('client.watch.sass', () =>
  gulp.watch(`${clientConfig.src}/assets/**/*.scss`, ['client.build.sass'])
)

gulp.task('client.watch.deps', () =>
  gulp.watch(clientConfig.deps[env].map(dep => `node_modules/${dep}`), ['client.build.deps'])
);

gulp.task('client.watch.assets', () =>
  gulp.watch(`${clientConfig.src}/assets/**/*.${clientConfig.exts.assets}`, ['client.build.assets'])
)

gulp.task('client.watch', sequence('client.build', ['client.watch.ts', 'client.watch.sass', 'client.watch.deps', 'client.watch.assets']));
