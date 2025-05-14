In the `assets/img` folder, you need to add an SVG image `icon_src.svg` and a PNG image `icon_src_512.png` with a resolution of 512x512 pixels.  
This is required for the `generate-favicon.js` script (`npm run generate-favicon`) to generate favicons in `dist` folder based on these files.

You must also manually create `icon-mask.png` image with a resolution of 512x512 pixels and place it in the `assets/img` folder before run build script.  
You can create a maskable icon using the service [maskable.app](https://maskable.app/editor).