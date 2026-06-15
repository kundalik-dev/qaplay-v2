/* =====================================================
   QA PLAYGROUND - app.js v1.0
   Handles:
     1. Theme toggle (dark / light) + localStorage
     2. Nav scroll shrink
     3. Active nav link on scroll (IntersectionObserver)
     4. Scroll-reveal fade-up animations
     5. FAQ / accordion
     6. Animated stat counters
     7. Mobile menu toggle
   ===================================================== */

(function () {
  'use strict';

  /* ---------------------------------------------------
     1. THEME TOGGLE
     --------------------------------------------------- */

  const THEME_KEY = 'qap-theme';
  const html = document.documentElement;
  const toggleBtn = document.getElementById('theme-toggle');
  const THEME_REVEAL_DURATION = 760;
  let themeToggleTimer = null;
  let themeRevealTimer = null;

  function getTheme() {
    return html.getAttribute('data-theme') || 'dark';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    if (toggleBtn) {
      const nextLabel = theme === 'dark' ? 'light' : 'dark';
      const icon = theme === 'dark' ? '☀️' : '🌙';
      toggleBtn.innerHTML = `<span class="theme-toggle-icon" aria-hidden="true">${icon}</span>`;
      toggleBtn.setAttribute('aria-label', `Switch to ${nextLabel} theme`);
      toggleBtn.title = `Switch to ${nextLabel} theme`;
    }
  }

  function clearThemeTransitionLayer() {
    document.querySelectorAll('.theme-transition-layer').forEach((layer) => layer.remove());
  }

  function setThemeTransitionGeometry() {
    if (!toggleBtn) return null;

    const rect = toggleBtn.getBoundingClientRect();
    const originX = rect.left + rect.width / 2 >= window.innerWidth / 2 ? window.innerWidth : 0;
    const originY = rect.top + rect.height / 2 >= window.innerHeight / 2 ? window.innerHeight : 0;
    const farthestX = Math.max(originX, window.innerWidth - originX);
    const farthestY = Math.max(originY, window.innerHeight - originY);
    const finalRadius = Math.hypot(farthestX, farthestY);

    html.style.setProperty('--theme-origin-x', `${originX}px`);
    html.style.setProperty('--theme-origin-y', `${originY}px`);
    html.style.setProperty('--theme-final-radius', `${finalRadius}px`);

    return { originX, originY, finalRadius };
  }

  function runThemeReveal(nextTheme) {
    if (!toggleBtn || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(nextTheme);
      return;
    }

    const geometry = setThemeTransitionGeometry();
    const canUseViewTransition = typeof document.startViewTransition === 'function';

    if (canUseViewTransition) {
      html.classList.add('theme-transition-active');

      const transition = document.startViewTransition(() => {
        setTheme(nextTheme);
      });

      transition.finished.finally(() => {
        html.classList.remove('theme-transition-active');
      });
      return;
    }

    clearThemeTransitionLayer();

    if (!geometry) {
      setTheme(nextTheme);
      return;
    }

    const layer = document.createElement('span');
    layer.className = `theme-transition-layer to-${nextTheme}`;
    layer.style.setProperty('--theme-origin-x', `${geometry.originX}px`);
    layer.style.setProperty('--theme-origin-y', `${geometry.originY}px`);
    layer.style.setProperty('--theme-final-radius', `${geometry.finalRadius}px`);
    document.body.appendChild(layer);

    requestAnimationFrame(() => {
      layer.classList.add('is-active');
    });

    if (themeRevealTimer) clearTimeout(themeRevealTimer);
    themeRevealTimer = setTimeout(() => {
      setTheme(nextTheme);
    }, Math.round(THEME_REVEAL_DURATION * 0.38));

    layer.addEventListener(
      'animationend',
      () => {
        layer.remove();
      },
      { once: true }
    );
  }

  // Init on load (theme already applied by inline script, just sync button state)
  setTheme(getTheme());

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const nextTheme = getTheme() === 'dark' ? 'light' : 'dark';

      toggleBtn.classList.remove('is-switching');
      void toggleBtn.offsetWidth;
      toggleBtn.classList.add('is-switching');

      runThemeReveal(nextTheme);

      if (themeToggleTimer) clearTimeout(themeToggleTimer);
      themeToggleTimer = setTimeout(() => {
        toggleBtn.classList.remove('is-switching');
      }, 620);
    });
  }


  /* ---------------------------------------------------
     2. NAV SCROLL SHRINK
     --------------------------------------------------- */

  const nav = document.getElementById('nav');

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ---------------------------------------------------
     3. ACTIVE NAV LINK (scroll spy)
     --------------------------------------------------- */

  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (navLinks.length > 0 && 'IntersectionObserver' in window) {
    const sectionIds = Array.from(navLinks).map((a) => a.getAttribute('href').slice(1));
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
            });
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach((sec) => spyObserver.observe(sec));
  }


  /* ---------------------------------------------------
     4. SCROLL-REVEAL FADE-UP
     --------------------------------------------------- */

  if ('IntersectionObserver' in window) {
    const fadeEls = document.querySelectorAll('.fade-up');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            const delay = i * 80;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.10, rootMargin: '0px 0px -40px 0px' }
    );

    fadeEls.forEach((el) => revealObserver.observe(el));
  } else {
    document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'));
  }


  /* ---------------------------------------------------
     5. FAQ / ACCORDION
     --------------------------------------------------- */

  function initAccordion(container) {
    if (!container) return;

    container.querySelectorAll('.accordion-trigger').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.accordion-item');
        const body = item.querySelector('.accordion-body');
        const inner = item.querySelector('.accordion-inner');
        const isOpen = item.classList.contains('open');

        container.querySelectorAll('.accordion-item.open').forEach((openItem) => {
          if (openItem !== item) {
            openItem.classList.remove('open');
            openItem.querySelector('.accordion-body').style.maxHeight = null;
            openItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('open');
          body.style.maxHeight = null;
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('open');
          body.style.maxHeight = (inner ? inner.scrollHeight : body.scrollHeight) + 'px';
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  document.querySelectorAll('.accordion').forEach(initAccordion);


  /* ---------------------------------------------------
     6. ANIMATED STAT COUNTERS
     --------------------------------------------------- */

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1400;
    const start = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOutCubic(progress) * target);

      const span = el.querySelector('span');
      el.childNodes[0].nodeValue = prefix + value;
      if (span) span.textContent = suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    const span = el.querySelector('span');
    if (span) {
      if (!el.childNodes[0] || el.childNodes[0].nodeType !== Node.TEXT_NODE) {
        el.insertBefore(document.createTextNode('0'), span);
      } else {
        el.childNodes[0].nodeValue = '0';
      }
    }

    requestAnimationFrame(tick);
  }

  if ('IntersectionObserver' in window) {
    const statEls = document.querySelectorAll('.stat-num[data-target]');

    if (statEls.length > 0) {
      const statObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCounter(entry.target);
              statObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      statEls.forEach((el) => statObserver.observe(el));
    }
  }


  /* ---------------------------------------------------
     7. MOBILE MENU TOGGLE
     --------------------------------------------------- */

  const menuBtn = document.getElementById('nav-menu-btn');
  const mobileNav = document.getElementById('nav-mobile');

  if (menuBtn && mobileNav) {
    function openMenu() {
      menuBtn.classList.add('open');
      mobileNav.classList.add('open');
      mobileNav.setAttribute('aria-hidden', 'false');
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.setAttribute('aria-label', 'Close menu');
      document.body.style.overflow = 'hidden';

      mobileNav.querySelectorAll('[tabindex="-1"]').forEach((el) => el.removeAttribute('tabindex'));
    }

    function closeMenu() {
      menuBtn.classList.remove('open');
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Open menu');
      document.body.style.overflow = '';

      mobileNav.querySelectorAll('a').forEach((el) => el.setAttribute('tabindex', '-1'));
    }

    menuBtn.addEventListener('click', () => {
      mobileNav.classList.contains('open') ? closeMenu() : openMenu();
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
        closeMenu();
        menuBtn.focus();
      }
    });
  }


  /* ---------------------------------------------------
     UTILITY: smooth-scroll polyfill for anchor links
     --------------------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight + 16 : 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
