// src/app/core/storage/darkMode.js
import VueCookies from 'vue-cookies';

export function aplicarModoOscuro() {
  const isDarkMode = VueCookies.get('dark_mode') === 'true';

  document.body.classList.toggle('dark-mode', isDarkMode);

  const fondo = isDarkMode
    ? "url('https://4kwallpapers.com/images/walls/thumbs_3t/9376.jpg')"
    : "url('https://4kwallpapers.com/images/walls/thumbs_3t/9380.jpg')";

  document.body.style.backgroundImage = fondo;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundAttachment = 'fixed';
  document.body.style.backgroundPosition = 'center';
}

export function toggleDarkMode() {
  const actual = VueCookies.get('dark_mode') === 'true';
  VueCookies.set('dark_mode', !actual, '1d');
  aplicarModoOscuro();
}
