import path from 'path';
import {fileURLToPath} from 'url';

export const DEV_MODE = process.env.NODE_ENV === 'development';
// Content Security Policy
export const CSP = 'default-src \'self\';';
export const CSP_DEV_MODE = 'default-src \'self\'; script-src \'self\' \'unsafe-inline\' http://localhost:63342 http://localhost:3000;';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.dirname(__dirname);

export const projectPaths = {
  srcDir: path.join(rootDir, 'src'),
  distDir: path.join(rootDir, 'dist'),
  assetsDir: path.join(rootDir, 'assets'),
  html: {
    index: path.join(rootDir, 'src', 'index.html'),
    srcDir: path.join(rootDir, 'src')
  },
  styles: {
    src: path.join(rootDir, 'src', 'styles', 'main.scss'),
    srcDir: path.join(rootDir, 'src', 'styles'),
    dist: path.join(rootDir, 'dist', 'main.css')
  },
  js: {
    src: path.join(rootDir, 'src', 'scripts', 'index.mjs'),
    dist: path.join(rootDir, 'dist', 'index.mjs'),
    scriptsDir: path.join(rootDir, 'src', 'scripts')
  },
  images: {
    srcDir: path.join(rootDir, 'assets', 'img'),
    distDir: path.join(rootDir, 'dist'),
    exclude: ['icon_src_512.png', 'icon_src.svg', 'readme.md']
  }
};

export const config = {
  browserSync: {
    files: [
      path.posix.join(projectPaths.distDir, '**', '*.{html,css,js}')
    ],
    ignore: [
      path.posix.join(projectPaths.distDir, 'pagefind', '**', '*')
    ],
    server: {
      baseDir: projectPaths.distDir,
      middleware: [(req, res, next) => {
        if (req.url.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store');
        }
        next();
      }]
    },
    injectChanges: true,
    notify: false,
    browser: path.join(__dirname, 'open-incognito-firefox.zsh')
    // browser: path.join(__dirname, 'open-incognito-chromium.zsh'),
    // browser: 'firefox-developer-edition',
    // browser: 'chromium',
    // proxy: 'myDomain.local',
    // logLevel: 'debug',
    // port: 3000,
    // Configuration for injecting the BrowserSync snippet into HTML files
    // snippetOptions: {
    //   rule: {
    //     match: /<\/head>/i, // Match the closing </head> tag
    //     fn: function(snippet, match) {
    //       return snippet + match; // Inject the snippet before the closing </head> tag
    //     }
    //   }
    // }
  },

  html: {
    collapseWhitespace: true,
    removeComments: true,
    minifyCSS: true,
    minifyJS: {compress: {expression: false, sequences: false}},
    processScripts: ['application/ld+json'],
    removeAttributeQuotes: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  },
  sass: {
    style: 'compressed',
    sourceMap: false
  },

  esbuild: {
    entryPoints: [projectPaths.js.src],
    outfile: projectPaths.js.dist,
    minify: true,
    bundle: true,
    format: 'esm',
    sourcemap: false,
    define: {
      DEV_MODE: `${process.env.NODE_ENV === 'development'}`,
      timestamp: `${Date.now()}`
    },
    drop: process.env.NODE_ENV === 'development' ? [] : ['console', 'debugger']
  },
  images: {
    jpeg: {quality: 75, mozjpeg: true},
    png: {quality: 75, compressionLevel: 9},
    webp: {quality: 75},
    avif: {quality: 70, effort: 5}
  }
};