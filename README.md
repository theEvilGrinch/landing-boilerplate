# landing-template

A modern, production-grade template for creating high-performance landing pages with automated asset processing, advanced optimization, and seamless deployment workflows.

## Table of Contents

- [Key Features](#key-features)
- [Project Structure](#project-structure)
- [Dev Commands](#dev-commands)
- [Build Features](#build-features)
- [Notes](#notes)
  - [Favicon Generation](#favicon-generation)
  - [Browser Launch Scripts](#browser-launch-scripts)
  - [Required Customization](#required-customization)
  - [GitHub Pages Deployment](#github-pages-deployment)
- [License](#license)

## Key Features

- **Vendored `node_modules`**  
  All dependencies are included in the repository under the `node_modules` directory.  
  **No need to run `npm install`.**  
  This ensures deterministic builds and eliminates dependency drift.

- **Proven Compatibility**  
  The project is tested and guaranteed to work with **Node.js v23.9.0** and **npm 11.3.0**.

- **Branch Structure**  
  - `master`: Base landing page template
  - `product`: Template with [schema.org](https://schema.org) microdata for product landing pages
  - `service`: Template with microdata for service-oriented landing pages (current branch) 

## Project Structure
```
landing-template/
├── dist/                            # Production-ready build output
├── assets/                
│   ├── img/             
│   │   ├── icon_src_512.png         # PNG source file for favicon generation
│   │   ├── icon_src.svg             # SVG source file for favicon generation
│   │   └── readme.md                # Details about favicon generation requirements
│   ├── fonts/                       # Optimized web fonts
│   └── manifest.webmanifest         # Web App Manifest
├── src/                       
│   ├── index.html                   # Main HTML template
│   ├── 404.html                     # Custom error page with animation
│   ├── main.js                      # JavaScript entry point
│   └── styles/             
│       ├── main.scss                # Main stylesheet entry point
│       ├── reset.css                # CSS reset and normalizer
│       ├── _custom.scss             # Custom styles and overrides
│       ├── _fonts.scss              # Font definitions
│       └── core/                    # Core SCSS modules
│           ├── _index.scss          # Core module entry point
│           ├── _variables.scss      # Global variables
│           └── _mixins.scss         # Reusable mixins
├── scripts-dev/            
│   ├── build.js                     # Main build script
│   ├── build.config.js              # Build configuration
│   ├── watch.js                     # Source file watcher
│   ├── open-incognito-chromium.zsh  # Launch Chromium in incognito mode
│   └── open-incognito-firefox.zsh   # Launch Firefox in incognito mode
├── node_modules/                    # Vendored dependencies
├── .eslintrc.json                   # ESLint configuration
├── .stylelintrc.json                # Stylelint configuration
├── package.json                     # Project metadata and scripts
└── README.md                        # Project documentation
```

## Dev Commands
- `npm run build` - Build project for production
- `npm run dev` - Start development server with live reload
- `npm run clean` - Empty the `dist` directory contents
- `npm run stylelint:fix` - Fix SCSS style issues
- `npm run eslint:fix` - Fix JavaScript code style
- `npm run deploy` - Deploy to GitHub Pages
- `npm run predeploy` - Build before deployment

## Build Features
- HTML minification with customizable options
- SCSS compilation and minification
- JavaScript bundling and optimization with esbuild
- Image optimization for multiple formats (JPEG, PNG, WebP, AVIF)
- Automated GitHub Pages deployment
- Favicon generation from source image:
  - ICO format for legacy browsers
  - SVG favicon for modern browsers
  - PNG favicons (16x16, 32x32, 48x48)
  - Apple Touch Icon
  - Web App manifest icons

## Notes

### Favicon Generation
The build script requires specific source files for favicon generation. Add these files to `assets/img/`:
- `icon_src.svg` - vector source for SVG favicon
- `icon_src_512.png` (512x512px) - source for PNG favicons
- `icon-mask.png` (512x512px) - maskable icon, You can create it using [maskable.app](https://maskable.app/editor)

### Browser Launch Scripts

In the `scripts-dev/` directory, there are two shell scripts for launching browsers in incognito/private mode:
- `open-incognito-chromium.zsh` — launches Chromium-based browsers
- `open-incognito-firefox.zsh` — launches Firefox

These scripts are used by BrowserSync to open the development server in incognito mode. They require a bash or zsh shell.

By default, `chromium` and `firefox-developer-edition` are used. If needed, you can change the browser by modifying the `browser` option in `build.config.js`:
```javascript
browserSync: {
  // browser: 'firefox-developer-edition', // default browser
  // browser: path.join(__dirname, 'open-incognito-chromium.zsh'),
  browser: path.join(__dirname, 'open-incognito-firefox.zsh')
}
```

### Required Customization
Ensure you replace all placeholders with your project-specific values:

- **package.json:**
  - `name`: your project name
  - `author`: your name/organization
  - `description`: project description
  - `repository.url`: your repository URL
  - `homepage`: your GitHub Pages URL
  - `keywords`: relevant keywords for your project
  - `license`: your project license
  - `version`: your project version
  - `bugs.url`: your issue tracker URL

- **assets/manifest.webmanifest:**
  - `name`: your app name
  - `short_name`: abbreviated app name
  - `description`: app description
  - `theme_color`: your brand color
  - `background_color`: app background color

- **src/index.html:**
  - `<title>`: your page title
  - `<meta name="description">`: page description
  - `<meta name="canonical">`: canonical URL
  - `<meta name="theme-color"`>: your brand color
  - `<meta name="msapplication-TileColor">`: sets the tile background color for pinned sites on Windows
  - `<meta name="msapplication-navbutton-color">`: sets the navigation button color for pinned sites on Windows
  - `<meta name="apple-mobile-web-app-status-bar-style">`: sets the status bar color for iOS devices
  - `<meta name="apple-mobile-web-app-title">`: sets the title for iOS devices
  - `<meta name="geo.region">`: your region code (e.g., "US" for the United States)
  - `<meta name="geo.placename">`: your city or locality
  - Open Graph and Twitter Card meta tags 
  - Schema.org microdata in ld+json script tag

### GitHub Pages Deployment
Before deploying to GitHub Pages, make sure the `repository.url` field in `package.json` is correctly set. Then run `npm run deploy` to publish the site.

## License

MIT Licensed - See [LICENSE](LICENSE) for details.

---

⚡ Maintained by [@theEvilGrinch](https://github.com/theEvilGrinch)