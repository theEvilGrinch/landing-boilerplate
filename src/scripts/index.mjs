import setColorTheme from './set-color-theme.mjs';
import setCookies from './show-cookies-dialog.mjs';
import insertCurrentYear from './update-copyright-year.mjs';

if (DEV_MODE) {
  console.log('DEV_MODE');
}

setColorTheme();
setCookies();
insertCurrentYear();

