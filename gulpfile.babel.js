import del        from 'del'
import cprocess   from 'child_process'
import gulp       from 'gulp';
import sequence   from 'gulp-sequence'
import sourcemaps from 'gulp-sourcemaps'
import ts         from 'gulp-typescript'

/**
 * Shared tasks.
 */

let env = process.env.NODE_ENV || 'development'

let sharedConfig = {
  lib: 'lib'
}

gulp.task('play', sequence(['server.watch', 'client.watch'], 'server.start'));

/**
 * Server tasks.
 */

let serverProject = ts.createProject('app/server/tsconfig.json', {
  typescript: require('typescript')
});

let serverConfig = {
  src: 'app/server,bin', dest: ''
}

// Clean

gulp.task('server.clean', done => del(serverConfig.dest, done));

// Build

gulp.task('server.build.ts', () => {
  let result = gulp.src(`{${sharedConfig.lib},${serverConfig.src}}/**/*.ts`).pipe(ts(serverProject));

  return result.js.pipe(gulp.dest(serverConfig.dest));
})

gulp.task('server.build', sequence('server.clean', ['server.build.ts']));

// Watch

gulp.task('server.watch.ts', () =>
  gulp.watch(`{${sharedConfig.bin},${sharedConfig.lib},${serverConfig.src}}/**/*.ts`, () => sequence('server.build.ts', 'server.start')())
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

process.on('exit', () => {
  if (node) node.kill()
})

/**
 * Client tasks.
 */

let clientProject = ts.createProject('app/client/tsconfig.json', {
  typescript: require('typescript')
});

let clientConfig = {
  src: 'app/client', dest: 'public/assets',

  exts: {
    svg: "svg", images: "{png,jpg}", fonts: "{eot,svg,ttf,woff,woff2}"
  },

  deps: {
    development: [
      "angular2/bundles/angular2.dev.js",
      "angular2/bundles/router.dev.js",
      "systemjs/dist/system.js",
    ]
  }
}

// Clean

gulp.task('client.clean', done => del(clientConfig.dest, done));

// Build

gulp.task('client.build.ts', () => {
  let result = gulp.src(`{${sharedConfig.lib},${clientConfig.src}}/**/*.ts`, { base: clientConfig.src }).pipe(sourcemaps.init()).pipe(ts(clientProject));

  return result.js.pipe(sourcemaps.init()).pipe(gulp.dest(clientConfig.dest));
})

gulp.task('client.build.deps', () => {
  let deps = clientConfig.deps[env].reduce((deps, dep) =>
    deps.concat([`node_modules/${dep}`, `node_modules/${dep}.map`])
  , [])

  gulp.src(deps).pipe(gulp.dest(clientConfig.dest))
});

gulp.task('client.build.svg', () =>
  gulp.src(`${clientConfig.src}/assets/images/**/*.${clientConfig.exts.svg}`).pipe(gulp.dest(clientConfig.dest))
);

gulp.task('client.build.images', () =>
  gulp.src(`${clientConfig.src}/assets/images/**/*.${clientConfig.exts.images}`).pipe(gulp.dest(clientConfig.dest))
);

gulp.task('client.build.fonts', () =>
  gulp.src(`${clientConfig.src}/assets/fonts/**/*.${clientConfig.exts.fonts}`).pipe(gulp.dest(clientConfig.dest))
);

gulp.task('client.build', sequence('client.clean', ['client.build.deps', 'client.build.svg', 'client.build.fonts', 'client.build.images'], ['client.build.ts']));

// Watch

gulp.task('client.watch.ts', () =>
  gulp.watch(`{${clientConfig.lib},${clientConfig.src}}/**/*.ts`, ['client.build.ts'])
);

gulp.task('client.watch.deps', () =>
  gulp.watch(clientConfig.deps[env].map(dep => `node_modules/${dep}`), ['build.deps'])
);

gulp.task('client.watch.svg', () =>
  gulp.watch(`${clientConfig.src}/assets/images/**/*.${clientConfig.exts.svg}`, ['client.build.svg'])
)

gulp.task('client.watch.images', () =>
  gulp.watch(`${clientConfig.src}/assets/images/**/*.${clientConfig.exts.images}`, ['client.build.images'])
)

gulp.task('client.watch.fonts', () =>
  gulp.watch(`${clientConfig.src}/assets/fonts/**/*.${clientConfig.exts.fonts}`, ['client.build.fonts'])
)

gulp.task('client.watch', sequence('client.build', ['client.watch.ts', 'client.watch.deps', 'client.watch.svg', 'client.watch.images', 'client.watch.fonts']));
