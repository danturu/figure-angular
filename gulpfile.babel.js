import del      from 'del'
import cprocess from 'child_process'
import gulp     from 'gulp';
import sequence from 'gulp-sequence'
import ts       from 'gulp-typescript'

let serverProject = ts.createProject('app/server/tsconfig.json', {
  typescript: require('typescript')
});

let sharedConfig = {
  bin: 'bin', lib: 'lib', dest: 'dist'
}

let serverConfig = {
  src: 'app/server'
}

gulp.task('play', sequence('server.watch', 'server.start'));

// Clean

gulp.task('server.clean', (done) =>
  del(serverConfig.dest, done)
);

// Build

gulp.task('server.build.ts', () => {
  let result = gulp.src(`{${sharedConfig.bin},${sharedConfig.lib},${serverConfig.src}}/**/*.ts`).pipe(ts(serverProject));

  return result.js.pipe(gulp.dest(sharedConfig.dest));
})

gulp.task('server.build', sequence('server.clean', ['server.build.ts']));

// Watch

gulp.task('server.watch.ts', () =>
  gulp.watch(`{${sharedConfig.typings},${sharedConfig.lib},${serverConfig.src}}/**/*.ts`, () => sequence('server.build.ts', 'server.start')())
);

gulp.task('server.watch', sequence('server.build', ['server.watch.ts']));

// Start

var node;

gulp.task('server.start', () => {
  if (node) node.kill()

  node = cprocess.spawn('node', ['dist/bin/www'], { stdio: 'inherit' })

  node.on('close', (code) => {
    if (code === 8) gulp.log('Error detected, waiting for changes...');
  });
})

process.on('exit', () => {
  if (node) node.kill()
})
