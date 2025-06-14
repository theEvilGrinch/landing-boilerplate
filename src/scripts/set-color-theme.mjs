function setColorTheme() {
  const isBrowserThemeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const colorThemeButton = document.querySelector('[data-toggle-theme]');
  document.body.classList.add(isBrowserThemeDark ? 'dark-mode' : 'light-mode');

  colorThemeButton.addEventListener('click', () => {
    const isCurrentThemeDark = document.body.classList.contains('dark-mode');
    const setDarkTheme = () => document.body.classList.replace('light-mode', 'dark-mode');
    const setLightTheme = () => document.body.classList.replace('dark-mode', 'light-mode');
    isCurrentThemeDark ? setLightTheme() : setDarkTheme();
  });
}

export default setColorTheme;