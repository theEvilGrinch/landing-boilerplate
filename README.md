# SEO-Optimized Responsive Product Landing Page

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[![Support me on Boosty](https://img.shields.io/badge/Boosty-Support%20me-%23f15f2c?style=for-the-badge)](https://boosty.to/theEvilGrinch/donate)
[![Donate](https://img.shields.io/badge/Donate-%23702ff4?style=for-the-badge)](https://yoomoney.ru/to/410016288289737)

A production-ready, high-performance landing page template built with modern web technologies. This boilerplate provides a solid foundation for creating fast, accessible, and maintainable landing pages with zero runtime dependencies.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
- [Build System](#build-system)
  - [Available Scripts](#available-scripts)
  - [Browser Launch Scripts](#browser-launch-scripts)
- [Theming](#theming)
- [Security](#security)
- [Required Customization](#required-customization)
- [Additional Features](#additional-features)
- [Contributing](#contributing)
- [License](#license)

## Features

- **SEO Optimized** - Semantic HTML, meta tags, and Schema.org structured data for product landing pages
- **Blazing Fast** - Built with ESBuild for lightning-fast builds
- **Modern CSS** - SCSS with CSS Custom Properties for theming
- **Security First** - Content Security Policy (CSP) compliant
- **Accessibility** - WCAG 2.1 compliant with proper ARIA attributes
- **Fully Responsive** - Optimized for mobile and desktop devices
- **Developer Experience** - Live reload and modern tooling
- **Dark/Light Mode** - Automatic theme detection with manual override
- **Cookie Consent** - Basic cookie consent functionality
- **Structured Data** - Built-in Schema.org markup for products, organizations, and breadcrumbs
- **Zero Dependencies** - No JavaScript framework required

## Project Structure

**Branch Structure**  
  - `master`: Base landing page template 
  - `product`: Template with [schema.org](https://schema.org) microdata for product landing pages (current branch)
  - `service`: Template with [schema.org](https://schema.org) microdata for service-oriented landing pages

```
landing-boilerplate/
├── assets/                  # Static assets
│   ├── fonts/               # Custom fonts
│   ├── img/                 # Image assets
│   └── manifest.webmanifest # Web App Manifest
├── build-system/            # Build configuration
│   ├── build.config.js      # Build settings
│   ├── build.js             # Production build script
│   ├── watch.js             # Development watch script
│   ├── open-incognito-chromium.zsh   # Chromium private mode launcher
│   └── open-incognito-firefox.zsh    # Firefox private mode launcher
├── src/                              # Source files
│   ├── scripts/                      # JavaScript modules
│   │   ├── index.mjs                 # Main JS entry point
│   │   ├── set-color-theme.mjs       # Theme management
│   │   ├── show-cookies-dialog.mjs   # Cookie consent
│   │   └── update-copyright-year.mjs # Dynamic year update
│   ├── styles/                       # SCSS styles
│   │   ├── core/                     # Core SCSS utilities
│   │   │   ├── _index.scss           # Core utilities entry point
│   │   │   ├── _mixins.scss          # SCSS mixins/helpers
│   │   │   └── _variables.scss       # SCSS variables
│   │   ├── _fonts.scss               # Font face declarations
│   │   ├── _template-styles.scss     # Base template styles
│   │   ├── main.scss                 # Main SCSS entry point
│   │   └── reset.css                 # CSS reset
│   ├── 404.html                      # Custom 404 page
│   └── index.html                    # Main HTML template
├── node_modules/                     # Dependencies and tools
├── .gitignore                        # Git ignore rules
├── .stylelintrc.json                 # Stylelint configuration
├── eslint.config.js                  # ESLint configuration
├── LICENSE                           # MIT License
├── package.json                      # Project configuration
├── package-lock.json                 # Dependencies lock file
└── README.md                         # Project documentation
```

## Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- npm 9.0.0 or higher

### Development Dependencies

The project uses the following development dependencies for building and optimization:
- esbuild@0.25.0 - JavaScript bundler and minifier
- sass@1.85.1 - CSS preprocessor
- browser-sync@3.0.3 - Development server with live reload
- html-minifier-terser@7.2.0 - HTML minification
- sharp@0.34.1 - Image optimization
- svgo@3.3.2 - SVG optimization
- eslint@9.22.0 - JavaScript linting
- stylelint@16.16.0 - CSS/SCSS linting
- @stylistic/stylelint-plugin@3.1.2 - Stylelint plugin for style rules
- gh-pages@6.3.0 - GitHub Pages deployment
- fs-extra@11.3.0 - Enhanced file system operations
- png2icons@2.0.1 - Favicon generation
- globals@16.0.0 - Global variables for ESLint
- postcss-scss@4.0.9 - SCSS syntax support for PostCSS
- imagemin@9.0.1 - Image optimization
- imagemin-pngquant@10.0.0 - PNG optimization plugin for imagemin

### Favicon Generation

The build script automatically generates favicons in multiple formats from source files.

To use this feature, add these files to `assets/img/`:
- `icon_src.svg` - Vector source for SVG favicon
- `icon_src_512.png` (512x512px) - Source for PNG favicons
- `icon-mask.png` (512x512px) - Maskable icon (can be created using [maskable.app](https://maskable.app/editor))

The build process will generate:
- ICO format for legacy browsers
- SVG favicon for modern browsers
- PNG favicons (16x16, 32x32, 48x48)
- Apple Touch Icon
- Web App manifest icons

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/theEvilGrinch/landing-boilerplate.git
   cd landing-boilerplate
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with hot reloading:

```bash
npm run dev
```

This will start a local development server at `http://localhost:3000` with live reload.

### Production Build

Create an optimized production build:

```bash
npm run build
```

The production-ready files will be output to the `dist` directory.

## Build System

The project uses a custom build system with the following features:

- **ESBuild** for JavaScript bundling and minification
- **Sass** for CSS preprocessing
- **HTML Minifier** for HTML optimization
- **Image optimization** with Sharp, Imagemin and SVGO
- **Development server** with Browsersync

### Production Build Optimizations

The build system applies these optimizations in production mode:

- **JavaScript**:
  - Minification and bundling with esbuild
  - Removal of `console` and `debugger` statements
  - ESM module format

- **CSS**:
  - SCSS compilation with compression
  - No source maps

- **HTML**:
  - Minification with whitespace/comment removal
  - CSS/JS minification
  - Removal of redundant attributes

- **Images**:
  - Compress JPEGs to 75% quality using MozJPEG 
  - Compress PNGs at 75% quality (compression level 9)
  - Compress WebP to 75% quality 
  - Compress AVIF to 70% quality (effort 5)
  - Minify SVGs with SVGO 
  - Generate favicons in multiple formats

### Browser Launch Scripts

In the `build-system/` directory, there are two shell scripts for launching browsers in incognito/private mode:
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

### Available Scripts

- `npm run dev` - Start development server with live reload
- `npm run build` - Create production build
- `npm run clean` - Clean the dist directory
- `npm run stylelint:fix` - Fix stylelint issues
- `npm run eslint:fix` - Fix ESLint issues
- `npm run deploy` - Deploy to GitHub Pages (requires gh-pages)

## Theming

The template implements a theme system with the following behavior:
- On page load, it automatically detects and applies the user's preferred color scheme from their browser/OS settings
- Users can manually toggle between light and dark themes using the 'Change theme' button in the interface
- The selected theme preference is saved in localStorage for consistency across page visits

## Security

- **Content Security Policy (CSP)** - Configured via the `CSP` variable in `build.config.js`. Note that CSP is only injected in production builds to avoid conflicts with the development server. The default policy is set to `default-src 'self'` for maximum security.
- **Cookie Consent** - The implementation uses a cookie named `cookieConsent` with a one-year expiration (`Max-Age=31536000`). The cookie is set to `accepted` when the user interacts with the consent dialog.
- **No Unsafe Inline Scripts** - All JavaScript is properly bundled and doesn't rely on inline scripts or eval()

## Required Customization

Before using this template, make sure to:
- Remove all template placeholders and demo content
- Replace all `<!-- TODO -->` comments with actual content
- Update all metadata in `package.json`, `assets/manifest.webmanifest`, and `src/index.html`
- Replace the favicon and other assets in the `assets` directory

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

## Additional Features

- Automatic copyright year update in the footer
- Responsive design optimized for all device sizes
- Clean, semantic HTML5 markup
- Optimized asset loading

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⚡ Maintained by [@theEvilGrinch](https://github.com/theEvilGrinch)