/**
 * SERENLINK SOLUTIONS - CINEMATIC SLOW-PACED SPLASH SCREEN ENGINE
 * Fully isolated, responsive, and performance-optimized
 */

(function () {
  'use strict';

  function initSplashScreen() {
    const splash = document.getElementById('serenlinkSplashScreen');
    if (!splash) return;

    const skipBtn = document.getElementById('splashSkipBtn');
    let isDismissed = false;

    // 1. Lock body scrolling while splash is visible
    document.body.classList.add('splash-active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // 2. Dismiss function
    function dismissSplash() {
      if (isDismissed) return;
      isDismissed = true;

      // Add fade-out transition class
      splash.classList.add('splash-fade-out');
      splash.setAttribute('aria-hidden', 'true');

      // Restore body scrolling after CSS transition completes
      setTimeout(() => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.classList.remove('splash-active');
        splash.style.display = 'none';

        // Dispatch custom event when splash screen finishes
        window.dispatchEvent(new CustomEvent('serenlink:splashCompleted'));
      }, 850); // Matches CSS transition duration (0.85s)
    }

    // 3. Accessibility check (Reduced Motion)
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTimeout(dismissSplash, 400);
      return;
    }

    // 4. Majestic Slow Cinematic Timeline (~5.3 seconds)
    // - Scene 1: Initial Seed Particle (0.0s - 1.8s)
    // - Scene 2: Network Light Beams, Arcs & Orbiting Data (1.0s - 3.4s)
    // - Scene 3: Optical Energy Burst Bloom (2.9s - 3.8s)
    // - Scene 4: Unified SerenLink Solutions Logo Reveal (3.4s - 5.3s)
    // At ~5.3s, begin smooth 0.85s fade-out into the homepage.
    const autoDismissTimer = setTimeout(dismissSplash, 5300);

    // Hard fail-safe timeout guarantees website is never permanently blocked
    const failSafeTimer = setTimeout(dismissSplash, 6800);

    // 5. Interactive Skip Handlers
    if (skipBtn) {
      skipBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        clearTimeout(autoDismissTimer);
        clearTimeout(failSafeTimer);
        dismissSplash();
      });
    }

    // Clicking anywhere on the splash screen also skips
    splash.addEventListener('click', () => {
      clearTimeout(autoDismissTimer);
      clearTimeout(failSafeTimer);
      dismissSplash();
    });

    // Escape key skips
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !isDismissed) {
        clearTimeout(autoDismissTimer);
        clearTimeout(failSafeTimer);
        dismissSplash();
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplashScreen);
  } else {
    initSplashScreen();
  }
})();
