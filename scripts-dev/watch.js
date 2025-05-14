 
import {watch} from 'fs';
import browserSync from 'browser-sync';
import {bundleJs, minifyHTML, compileSass} from './build.js';
import {projectPaths, config} from './build.config.js';

const bs = browserSync.create();

async function startServer() {
  bs.init(config.browserSync);
}

async function watchFiles() {
  const watchList = [
    {path: projectPaths.styles.srcDir, action: compileSass, label: 'SASS'},
    {path: projectPaths.html.index, action: minifyHTML, label: 'HTML'},
    {path: projectPaths.js.src, action: bundleJs, label: 'JS'}
  ];
  const lastEvent = new Map();
  watchList.forEach(({path: watchPath, action, label}) => {
    watch(watchPath, {recursive: true}, async (eventType, filename) => {
      const now = Date.now();
      if (lastEvent.has(label) && now - lastEvent.get(label) < 100) {return;}
      if (!filename || eventType !== 'change' || filename.includes('~')) {return;}
      lastEvent.set(label, now);
      try {
        await action(filename);
        bs.reload();
      } catch (err) {
        console.error(`WATCH ${label} ERR:`, err);
      }
    });

  });
}

async function init() {
  await Promise.all([
    startServer(),
    watchFiles()
  ]);
}

init().catch((err) => {
  console.error('INIT ERR:', err);
  process.exit(1);
});
