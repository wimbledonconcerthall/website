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
  if (mainMenuItems) {
    for (const item of mainMenuItems) {
      if (window.location.pathname.includes(item.getAttribute('data-menu-item')) && !window.location.pathname.includes(`${item.getAttribute('data-menu-item')}-`)) {
        item.classList.add('active');
      } else if (item.getAttribute('data-menu-item') === 'home' && window.location.pathname === '/') {
        item.classList.add('active');
      }
    }
  }

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

  const particlesContainer = document.getElementById('particles-js');
  if (particlesContainer) {
    particlesJS.load('particles-js', 'json/particles.json', function() {
      console.log('callback - particles.js config loaded');
    });
  }

  // Image viewer
  let pics = document.querySelectorAll('.image');
  const viewer = document.getElementById('viewer');
  const viewerPhoto = document.getElementById('viewer-photo');
  const viewerClose = document.getElementById('viewer-close');

  viewerClose.addEventListener('click', e => {
    viewer.classList.remove('open');
  });

  if (viewer && viewerPhoto) {
    Array.from(pics).forEach(pic => {
      pic.addEventListener('click', e => {
        const picUrl = pic.getAttribute('src');
        viewer.classList.add('open');
        viewerPhoto.setAttribute('src', picUrl);
      });
    });
  }
});