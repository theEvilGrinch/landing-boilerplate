/**
 * @type {import('fs-extra').default}
 */
import fs from 'fs-extra';
import {minify} from 'html-minifier-terser';
import * as sass from 'sass';
import {build} from 'esbuild';
import {readFile, writeFile, mkdir} from 'fs/promises';
import {existsSync} from 'fs';
import path from 'path';
import sharp from 'sharp';
import png2icons from 'png2icons';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import {optimize} from 'svgo';
import {projectPaths, config, DEV_MODE, CSP} from './build.config.js';

export async function minifyHTML() {
  try {
    const files = await fs.readdir(projectPaths.html.srcDir);
    const pages = files.filter((file) => file.endsWith('.html'));
    for (const page of pages) {
      let content = await fs.readFile(path.join(projectPaths.html.srcDir, page), 'utf8');
      if (path.basename(page) === 'index.html' && !DEV_MODE) {
        content = content.replace('<!-- CSP_META -->', `<meta http-equiv="Content-Security-Policy" content="${CSP}">`);
        const minified = await minify(content, config.html);
        fs.writeFile(path.join(projectPaths.distDir, page), minified);
      } else {
        fs.writeFile(path.join(projectPaths.distDir, page), content);
      }
    }
    console.log('HTML OK');
  } catch (err) {
    console.error('HTML ERR:', err);
  }
}

async function optimizeImages() {
  await fs.mkdirp(projectPaths.images.distDir, {recursive: true});
  const files = await fs.readdir(projectPaths.images.srcDir);

  await Promise.all(files.map(async (file) => {
    const input = path.join(projectPaths.images.srcDir, file);
    const output = path.join(projectPaths.images.distDir, file);
    const ext = path.extname(file).toLowerCase();

    if (projectPaths.images.exclude.some(ex => ex === file)) { return; }

    try {
      switch (ext) {
      case '.jpg':
      case '.jpeg':
        await sharp(input).jpeg(config.images.jpeg).toFile(output);
        break;
      case '.png':
        await sharp(input).png(config.images.png).toFile(output);
        break;
      case '.webp':
        await sharp(input).webp(config.images.webp).toFile(output);
        break;
      case '.avif':
        await sharp(input).avif(config.images.avif).toFile(output);
        break;
      case '.svg':
        const svgContent = await fs.readFile(input, 'utf8');
        const optimizedSvg = optimize(svgContent).data;
        await fs.writeFile(output, optimizedSvg);
        break;
      default:
        await fs.copy(input, output);
        break;
      }
    } catch (err) {
      console.error(`IMG ERR: ${file}:`, err);
    }
  })
  );
  console.log('IMG OK');
}

export async function compileSass() {
  try {
    const result = sass.compile(projectPaths.styles.src, config.sass);
    await fs.writeFile(projectPaths.styles.dist, result.css);
    console.log('SASS OK');
  } catch (err) {
    console.error('SASS ERR:', err);
  }
}

export async function bundleJs() {
  try {
    await build(config.esbuild);
    console.log('JS OK');
  } catch (err) {
    console.error('JS ERR:', err);
  }
}

async function copyFiles() {
  try {
    fs.copy(projectPaths.assetsDir, projectPaths.distDir, {
      overwrite: true,
      filter: (src) => {
        const rel = path.relative(projectPaths.assetsDir, src);
        const parts = rel.split(path.sep);
        return parts[0] !== path.parse(projectPaths.images.srcDir).base;
      }
    });
    console.log('FILE COPY OK');
  } catch (err) {
    console.error('FILE COPY ERR:', err);
  }
}

async function generateFavicons() {
  const srcPng = path.join(projectPaths.images.srcDir, 'icon_src_512.png');
  const srcSvg = path.join(projectPaths.images.srcDir, 'icon_src.svg');

  if (!existsSync(projectPaths.distDir)) {
    await mkdir(projectPaths.distDir, {recursive: true});
  }

  const pngBuffer = await readFile(srcPng);

  const optimizedPngBuffer = await sharp(pngBuffer).
    resize(32, 32, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}}).
    png({compressionLevel: 9, palette: true, colors: 128}).toBuffer();

  const icoBuffer = png2icons.createICO(optimizedPngBuffer, 2, 256, true);
  await writeFile(path.join(projectPaths.distDir, 'favicon.ico'), icoBuffer);

  const pngSizes = [
    {name: 'favicon-16x16.png', size: 16},
    {name: 'favicon-32x32.png', size: 32},
    {name: 'favicon-48x48.png', size: 48},
    {name: 'apple-touch-icon.png', size: 180},
    {name: 'icon-192.png', size: 192},
    {name: 'icon-512.png', size: 512}
  ];

  await Promise.all(pngSizes.map(async ({name, size}) => {
    try {
      const outputPath = path.join(projectPaths.distDir, name);
      await sharp(pngBuffer).resize(size, size, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}}).
        png({compressionLevel: 6}).toFile(outputPath);

      await imagemin([outputPath], {
        destination: projectPaths.distDir,
        plugins: [imageminPngquant({quality: [0.7, 0.85]})]
      });
      console.log('PNG ICON OK |', name);

    } catch (err) {
      console.error(`Failed to process ${name}:`, err.message);
    }
  })
  );

  try {
    const svgContent = await readFile(srcSvg, 'utf8');
    const optimizedSvg = optimize(svgContent, {
      multipass: true,
      plugins: [{
        name: 'preset-default',
        params: {overrides: {removeViewBox: false}}
      }]
    });
    await writeFile(path.join(projectPaths.distDir, 'favicon.svg'), optimizedSvg.data);
    console.log('SVG ICON OK | favicon.svg');
  } catch (err) {
    console.warn('SVG not found or failed to optimize:', err.message);
  }
}

async function runBuild() {
  await fs.emptyDir(projectPaths.distDir);

  await Promise.all([
    generateFavicons(),
    minifyHTML(),
    bundleJs(),
    copyFiles(),
    compileSass()
  ]);
  await optimizeImages();
}

runBuild().catch((err) => console.error('BUILD ERR:', err));