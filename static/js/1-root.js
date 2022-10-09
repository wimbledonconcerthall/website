const themeKey = 'theme';

document.addEventListener("DOMContentLoaded", function() {
  const html = document.querySelector('html');
  const themeToggleButton = document.querySelector('.theme-toggle');
  const savedTheme = localStorage.getItem(themeKey);

  if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
  } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    html.setAttribute('data-theme', 'dark');
    localStorage.setItem(themeKey, 'dark');
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem(themeKey, 'dark');
    } else {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem(themeKey, 'light');
    }
  });

  themeToggleButton.addEventListener('click', event => {
    if (html.getAttribute('data-theme') === 'dark') {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem(themeKey, 'light');
    } else {
      html.setAttribute('data-theme', 'dark');
      localStorage.setItem(themeKey, 'dark');
    }
  });

  // Top nav active element
  const mainMenuItems = document.querySelectorAll('#main-menu li');
  mainMenuItems && mainMenuItems.forEach(item => {
    if (window.location.pathname.includes(item.getAttribute('data-menu-item'))) {
      item.classList.add('active');
    }
  });

  // Side menu
  const toggleMenuButton = document.getElementById('menu-toggle');
  const closeMenuButton = document.getElementById('close-side-menu');
  const sideMenu = document.getElementById('side-menu');

  function toggleMenu() {
    if (sideMenu.classList.contains('open')) {
      sideMenu.classList.remove('open');
    } else {
      sideMenu.classList.add('open');
    }
  }

  toggleMenuButton.addEventListener('click', toggleMenu);
  closeMenuButton.addEventListener('click', toggleMenu);


  // Collapsibles
  let myLabels = document.querySelectorAll('.lbl-toggle');

  Array.from(myLabels).forEach(label => {
    label.addEventListener('keydown', e => {
      // 32 === spacebar
      // 13 === enter
      if (e.which === 32 || e.which === 13) {
        e.preventDefault();
        label.click();
      };
    });
  });
});