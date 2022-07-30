const themeKey = 'theme';
const consentKey = 'dataCaptureConsent';

function setConsentModalState(state) {
  const modalConsent = document.getElementById('modal-consent');
  if (state) {
    modalConsent.setAttribute('open', '');
  } else {
    modalConsent.removeAttribute('open');
    localStorage.setItem(consentKey, true);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  const html = document.querySelector('html');
  const themeToggleButton = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem(themeKey);
  const hasConsent = localStorage.getItem(consentKey);

  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
    if (hasConsent) {
      localStorage.setItem(themeKey, 'dark');
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
      html.setAttribute('data-theme', 'dark');
      if (hasConsent) {
        localStorage.setItem(themeKey, 'dark');
      }
    } else {
      html.setAttribute('data-theme', 'light');
      if (hasConsent) {
        localStorage.setItem(themeKey, 'light');
      }
    }
    utterancesTheme();
  });

  themeToggleButton.addEventListener('click', event => {
    if (html.getAttribute('data-theme') === 'dark') {
      html.setAttribute('data-theme', 'light');
      if (hasConsent) {
        localStorage.setItem(themeKey, 'light');
      }
    } else {
      html.setAttribute('data-theme', 'dark');
      if (hasConsent) {
        localStorage.setItem(themeKey, 'dark');
      }
    }
    utterancesTheme();
  });

  // Top nav active element
  const mainMenuItems = document.querySelectorAll('#main-menu li');
  mainMenuItems && mainMenuItems.forEach(item => {
    if (window.location.pathname.includes(item.getAttribute('data-menu-item'))) {
      item.classList.add('active');
    }
  });

  // Modal consent
  if (!hasConsent && !window.location.pathname.includes('/privacy')) {
    setConsentModalState(true);
  }
  if (hasConsent && !window.location.host.includes('localhost')) {
    initDataCapture();
  }
});