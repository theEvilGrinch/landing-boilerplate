function setCookies() {
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

}

export default setCookies;