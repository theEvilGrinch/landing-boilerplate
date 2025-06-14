function insertCurrentYear() {
  const copyright = document.querySelector('[data-copyright-year]');
  const currentYear = new Date().getFullYear();
  copyright.insertAdjacentText('beforeend', ` - ${currentYear}`);
}

export default insertCurrentYear;