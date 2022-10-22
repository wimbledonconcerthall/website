const themeKey = 'theme';
const privacyKey = 'privacy';

document.addEventListener("DOMContentLoaded", function() {
  const html = document.querySelector('html');
  const themeToggleButton = document.querySelector('.theme-toggle');
  const privacyPopup = document.getElementById('privacy-popup');
  const savedTheme = localStorage.getItem(themeKey);
  const acceptedPrivacy = localStorage.getItem(privacyKey);

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

  if (!acceptedPrivacy) {
    privacyPopup.style.display = 'flex';
    const privacyButton = document.getElementById('btn-close-privacy');
    privacyButton.addEventListener('click', e => {
      localStorage.setItem(privacyKey, true);
      privacyPopup.style.display = 'none';
    });
  }

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

  if (pics && viewer && viewerClose && viewerPhoto) {
    viewerClose.addEventListener('click', e => {
      viewer.classList.remove('open');
    });

    document.onkeydown = (evt) => {
      evt = evt || window.event;
      let isEscape = false;
      if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
      } else {
        isEscape = (evt.keyCode === 27);
      }
      if (isEscape) {
        viewer.classList.remove('open');
      }
    };

    Array.from(pics).forEach(pic => {
      pic.addEventListener('click', e => {
        const picUrl = pic.getAttribute('src');
        viewer.classList.add('open');
        viewerPhoto.setAttribute('src', picUrl);
      });
    });
  }
});