window.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('cookieDialog');
  const button = dialog.querySelector('.js-CookieCloseBtn');

  if (!document.cookie.includes('cookieConsent=accepted')) {
    dialog.show();
  }

  button.addEventListener('click', () => {
    document.cookie = 'cookieConsent=accepted; Max-Age=31536000; Path=/';
    dialog.close();
  });
});

// function toggleDarkMode() {
//   const isColorThemeDark = window.matchMedia('(prefers-color-scheme: dark)');
//   isColorThemeDark.matches ? document.body.classList.toggle('light-mode') : document.body.classList.toggle('dark-mode');
// }

if (DEV_MODE) {
  console.log('DEV_MODE');
}