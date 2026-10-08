/**
* Template Name: MyResume
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Updated: Jun 29 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector('.header-toggle');

  function headerToggle() {
    const header = document.querySelector('#header');
    if (!header || !headerToggleBtn) return;

    header.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.header-show')) {
        headerToggle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Cookie preferences floating button
   */
  const cookiePreferencesToggle = document.querySelector('.cookie-preferences-toggle');

  if (!cookiePreferencesToggle) {
    const cookiePreferencesBtn = document.createElement('button');
    cookiePreferencesBtn.type = 'button';
    cookiePreferencesBtn.className = 'cookie-preferences-toggle';
    cookiePreferencesBtn.setAttribute('aria-label', 'Open cookie settings');
    cookiePreferencesBtn.innerHTML = '<i class="bi bi-shield-check"></i>';

    cookiePreferencesBtn.addEventListener('click', () => {
      const settingsPanel = document.getElementById('cookie-settings-panel');
      if (!settingsPanel) return;

      populatePanelFromStoredConsent();
      settingsPanel.classList.add('is-visible');
      settingsPanel.setAttribute('aria-hidden', 'false');
    });

    document.body.appendChild(cookiePreferencesBtn);
  }

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector('.typed');
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Cookie consent banner
   */
  const COOKIE_CONSENT_KEY = 'techwaiv-cookie-consent';
  const DEFAULT_CONSENT = {
    necessary: true,
    analytics: false,
    preferences: false,
    marketing: false
  };

  function getStoredConsent() {
    try {
      const storedConsent = JSON.parse(localStorage.getItem(COOKIE_CONSENT_KEY));
      return storedConsent ? { ...DEFAULT_CONSENT, ...storedConsent } : null;
    } catch (error) {
      return null;
    }
  }

  function saveConsent(consent) {
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  }

  function buildCookieBanner() {
    if (document.getElementById('cookie-consent-banner')) {
      return;
    }

    const banner = document.createElement('div');
    banner.id = 'cookie-consent-banner';
    banner.className = 'cookie-consent-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', 'Cookie consent');
    banner.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-consent-copy">
          <div class="cookie-consent-icon" aria-hidden="true">
            <i class="bi bi-shield-check"></i>
          </div>
          <div>
            <h3 class="cookie-consent-title">Your privacy matters</h3>
            <p class="cookie-consent-text">
              We use essential cookies to keep this website secure and optional cookies to understand visits and improve
              your experience. <a href="privacy-policy.html" class="cookie-consent-link" data-cookie-action="customize">Manage preferences</a>
            </p>
          </div>
        </div>

        <div class="cookie-consent-actions">
          <button type="button" class="cookie-btn cookie-btn-secondary" data-cookie-action="essential">
            Reject optional
          </button>
          <button type="button" class="cookie-btn cookie-btn-primary" data-cookie-action="accept">
            Accept all
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(banner);

    banner.querySelector('[data-cookie-action="accept"]').addEventListener('click', () => {
      const consent = {
        necessary: true,
        analytics: true,
        preferences: true,
        marketing: true
      };

      saveConsent(consent);
      banner.classList.remove('is-visible');
      banner.setAttribute('aria-hidden', 'true');
    });

    banner.querySelector('[data-cookie-action="essential"]').addEventListener('click', () => {
      const consent = {
        necessary: true,
        analytics: false,
        preferences: false,
        marketing: false
      };

      saveConsent(consent);
      banner.classList.remove('is-visible');
      banner.setAttribute('aria-hidden', 'true');
    });

    const customizeLink = banner.querySelector('[data-cookie-action="customize"]');
    if (customizeLink) {
      customizeLink.addEventListener('click', (event) => {
        event.preventDefault();
        const settingsPanel = document.getElementById('cookie-settings-panel');
        if (settingsPanel) {
          settingsPanel.classList.add('is-visible');
          settingsPanel.setAttribute('aria-hidden', 'false');
        }
      });
    }

    return banner;
  }

  function buildCookieSettingsPanel() {
    if (document.getElementById('cookie-settings-panel')) {
      return;
    }

    const panel = document.createElement('div');
    panel.id = 'cookie-settings-panel';
    panel.className = 'cookie-settings-panel';
    panel.setAttribute('aria-hidden', 'true');
    panel.innerHTML = `
      <div class="cookie-settings-card" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
        <div class="cookie-settings-header">
          <div>
            <p class="cookie-settings-kicker">Privacy centre</p>
            <h3 id="cookie-settings-title">Cookie preferences</h3>
          </div>
          <button type="button" class="cookie-close-btn" data-cookie-action="close" aria-label="Close cookie settings">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>

        <p class="cookie-settings-intro">
          Choose which optional cookies you allow. Your choices apply across this website and can be changed at any time.
        </p>

        <div class="cookie-settings-list">
          <div class="cookie-settings-item">
            <div>
              <strong>Strictly necessary</strong>
              <p>Required for security, navigation and remembering your consent.</p>
            </div>
            <input type="checkbox" checked disabled>
          </div>

          <div class="cookie-settings-item">
            <div>
              <strong>Preferences</strong>
              <p>Remember choices that make the site easier to use.</p>
            </div>
            <input type="checkbox" data-cookie-category="preferences">
          </div>

          <div class="cookie-settings-item">
            <div>
              <strong>Analytics</strong>
              <p>Help us understand anonymous website usage and improve content.</p>
            </div>
            <input type="checkbox" data-cookie-category="analytics">
          </div>

          <div class="cookie-settings-item">
            <div>
              <strong>Marketing</strong>
              <p>Support relevant communications and campaign measurement.</p>
            </div>
            <input type="checkbox" data-cookie-category="marketing">
          </div>
        </div>

        <div class="cookie-settings-footer">
          <button type="button" class="cookie-btn cookie-btn-secondary cookie-btn-wide" data-cookie-action="essential">
            Reject optional
          </button>
          <button type="button" class="cookie-btn cookie-btn-wide" data-cookie-action="save">
            Save choices
          </button>
        </div>
      </div>
    `;

    panel.querySelector('[data-cookie-action="close"]').addEventListener('click', () => {
      panel.classList.remove('is-visible');
      panel.setAttribute('aria-hidden', 'true');
    });

    panel.querySelector('[data-cookie-action="save"]').addEventListener('click', () => {
      const consent = {
        necessary: true,
        analytics: panel.querySelector('[data-cookie-category="analytics"]').checked,
        preferences: panel.querySelector('[data-cookie-category="preferences"]').checked,
        marketing: panel.querySelector('[data-cookie-category="marketing"]').checked
      };

      saveConsent(consent);
      panel.classList.remove('is-visible');
      panel.setAttribute('aria-hidden', 'true');
      document.getElementById('cookie-consent-banner').classList.remove('is-visible');
      document.getElementById('cookie-consent-banner').setAttribute('aria-hidden', 'true');
    });

    document.body.appendChild(panel);

    return panel;
  }

  function populatePanelFromStoredConsent() {
    const storedConsent = getStoredConsent();
    const panel = document.getElementById('cookie-settings-panel');

    if (!panel || !storedConsent) {
      return;
    }

    panel.querySelector('[data-cookie-category="analytics"]').checked = !!storedConsent.analytics;
    panel.querySelector('[data-cookie-category="preferences"]').checked = !!storedConsent.preferences;
    panel.querySelector('[data-cookie-category="marketing"]').checked = !!storedConsent.marketing;
  }

  function initializeCookieConsent() {
    const storedConsent = getStoredConsent();

    buildCookieSettingsPanel();
    buildCookieBanner();

    if (storedConsent) {
      populatePanelFromStoredConsent();
      return;
    }

    const banner = document.getElementById('cookie-consent-banner');
    banner.classList.add('is-visible');
    banner.setAttribute('aria-hidden', 'false');
  }

  initializeCookieConsent();

})();