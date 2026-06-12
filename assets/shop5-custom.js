/* ══════════════════════════════════════════════════════════════
   SHOP FIVE — Custom motion engine (no libraries)
   - Parallax scroll          [data-sf-parallax="<speed>"]
   - Entrance on load         .sf-entrance inside [data-sf-entrance-root]
   - Staggered scroll reveal  auto-applied to cards/sections
   - Horizontal scroll rails  [data-sf-rail] with arrows + drag
   - Image lazy hygiene, sticky-header state
   ══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isRTL = document.documentElement.dir === 'rtl';

  /* ── 1. Parallax ───────────────────────────────────────────────
     Elements declare speed: <div data-sf-parallax="0.3">
     The layer translates at (scroll progress × speed × range). */
  function initParallax() {
    if (reducedMotion) return;

    var layers = Array.prototype.slice.call(document.querySelectorAll('[data-sf-parallax]'));
    if (!layers.length) return;

    var items = layers.map(function (el) {
      return {el: el, speed: parseFloat(el.getAttribute('data-sf-parallax')) || 0.25};
    });

    var ticking = false;

    function update() {
      var vh = window.innerHeight;

      items.forEach(function (item) {
        var rect = item.el.getBoundingClientRect();

        if (rect.bottom < -120 || rect.top > vh + 120) return;

        // -1 (element below viewport) … +1 (element above viewport)
        var progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
        var shift = -progress * item.speed * 100;

        item.el.style.transform = 'translate3d(0,' + shift.toFixed(2) + 'px,0)';
      });

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, {passive: true});
    window.addEventListener('resize', onScroll, {passive: true});
    update();
  }

  /* ── 2. Entrance on load ───────────────────────────────────────
     Children with .sf-entrance get --sf-entrance-delay by index,
     then the root receives .sf-entrance-go to start the cascade. */
  function initEntrance() {
    document.querySelectorAll('[data-sf-entrance-root]').forEach(function (root) {
      var children = root.querySelectorAll('.sf-entrance');

      if (reducedMotion) {
        root.classList.add('sf-entrance-go');
        return;
      }

      children.forEach(function (child, i) {
        child.style.setProperty('--sf-entrance-delay', (120 + i * 140) + 'ms');
      });

      window.requestAnimationFrame(function () {
        root.classList.add('sf-entrance-go');
      });
    });
  }

  /* ── 3. Staggered scroll reveal ────────────────────────────── */
  function initReveal() {
    if (reducedMotion || !('IntersectionObserver' in window)) return;

    var selectors = [
      '.section__header',
      '.product-item',
      '.sf-category-card',
      '.collection-item',
      '.text-with-icons__item',
      '.sf-standard__item',
      '.image-with-text',
      '.article-item'
    ];

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('sf-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {rootMargin: '0px 0px -8% 0px', threshold: 0.05});

    document.querySelectorAll(selectors.join(',')).forEach(function (element) {
      var rect = element.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) return;

      // Stagger within the element's own row: delay by index among siblings
      var siblings = element.parentElement ? Array.prototype.indexOf.call(element.parentElement.children, element) : 0;
      element.style.setProperty('--sf-stagger', (siblings % 5) * 90 + 'ms');
      element.classList.add('sf-reveal');
      observer.observe(element);
    });
  }

  /* ── 4. Horizontal scroll rails ──────────────────────────────
     <div data-sf-rail>
       <div data-sf-rail-track> …cards… </div>
       <button data-sf-rail-prev> / <button data-sf-rail-next>   */
  function initRails() {
    document.querySelectorAll('[data-sf-rail]').forEach(function (rail) {
      var track = rail.querySelector('[data-sf-rail-track]');
      if (!track) return;

      var prev = rail.querySelector('[data-sf-rail-prev]');
      var next = rail.querySelector('[data-sf-rail-next]');

      function step() {
        var card = track.querySelector(':scope > *');
        return card ? card.getBoundingClientRect().width + 16 : track.clientWidth * 0.8;
      }

      function go(direction) {
        var amount = step() * 2 * direction * (isRTL ? -1 : 1);
        track.scrollBy({left: amount, behavior: reducedMotion ? 'auto' : 'smooth'});
      }

      if (prev) prev.addEventListener('click', function () { go(-1); });
      if (next) next.addEventListener('click', function () { go(1); });

      function updateArrows() {
        var max = track.scrollWidth - track.clientWidth - 2;
        var pos = Math.abs(track.scrollLeft);

        if (prev) prev.toggleAttribute('disabled', pos <= 2);
        if (next) next.toggleAttribute('disabled', pos >= max);
      }

      track.addEventListener('scroll', updateArrows, {passive: true});
      window.addEventListener('resize', updateArrows, {passive: true});
      updateArrows();

      // Drag-to-scroll on fine pointers
      var isDown = false, startX = 0, startScroll = 0, moved = false;

      track.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse') return;
        isDown = true;
        moved = false;
        startX = e.clientX;
        startScroll = track.scrollLeft;
        track.style.scrollSnapType = 'none';
        track.style.cursor = 'grabbing';
      });

      window.addEventListener('pointermove', function (e) {
        if (!isDown) return;
        var dx = e.clientX - startX;
        if (Math.abs(dx) > 4) moved = true;
        track.scrollLeft = startScroll - dx;
      });

      window.addEventListener('pointerup', function () {
        if (!isDown) return;
        isDown = false;
        track.style.scrollSnapType = '';
        track.style.cursor = '';
      });

      // Suppress accidental link clicks after a drag
      track.addEventListener('click', function (e) {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      }, true);
    });
  }

  /* ── 5. Image loading hygiene ──────────────────────────────── */
  function initLazyImages() {
    var foldLine = window.innerHeight * 1.25;

    document.querySelectorAll('img').forEach(function (img) {
      if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
      if (img.hasAttribute('loading') || img.hasAttribute('fetchpriority')) return;

      var rect = img.getBoundingClientRect();
      if (rect.top >= foldLine || rect.width === 0) img.setAttribute('loading', 'lazy');
    });
  }

  /* ── 6. Sticky header state ────────────────────────────────── */
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
    initEntrance();
    initParallax();
    initReveal();
    initRails();
    initLazyImages();
    initHeaderState();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
