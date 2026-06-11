/* ══════════════════════════════════════════════════════════════
   SHOP FIVE — Premium UX enhancements
   - Scroll fade-in via IntersectionObserver (no libraries)
   - Enforce lazy-loading + async decoding on below-fold images
   - Header scrolled state (adds soft shadow)
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── Scroll fade-in ────────────────────────────────────────── */
  function initReveal() {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      return;
    }

    var selectors = [
      '.section__header',
      '.product-item',
      '.collection-item',
      '.text-with-icons__item',
      '.image-with-text',
      '.article-item',
      '.footer__block-item'
    ];

    var elements = document.querySelectorAll(selectors.join(','));

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sf-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {rootMargin: '0px 0px -8% 0px', threshold: 0.05});

    elements.forEach(function (element, index) {
      // Elements already in the viewport on load are shown immediately
      var rect = element.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        return;
      }

      element.classList.add('sf-reveal');
      // Small stagger inside grids for a premium cascade
      element.style.transitionDelay = (index % 4) * 60 + 'ms';
      observer.observe(element);
    });
  }

  /* ── Image loading hygiene ─────────────────────────────────── */
  function initLazyImages() {
    var foldLine = window.innerHeight * 1.25;

    document.querySelectorAll('img').forEach(function (img) {
      if (!img.hasAttribute('decoding')) {
        img.setAttribute('decoding', 'async');
      }

      if (img.hasAttribute('loading') || img.hasAttribute('fetchpriority')) {
        return;
      }

      var rect = img.getBoundingClientRect();

      // Never lazy-load above-the-fold imagery (hurts LCP)
      if (rect.top >= foldLine || rect.width === 0) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }

  /* ── Header scrolled state ─────────────────────────────────── */
  function initHeaderState() {
    var ticking = false;

    function update() {
      document.body.classList.toggle('sf-scrolled', window.scrollY > 12);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, {passive: true});

    update();
  }

  function init() {
    initReveal();
    initLazyImages();
    initHeaderState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
