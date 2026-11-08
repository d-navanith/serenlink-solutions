/**
 * SERENLINK SOLUTIONS - CINEMATIC SPLASH SCREEN ENGINE
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
    function dismissSplash(isFast) {
      if (isDismissed) return;
      isDismissed = true;

      if (autoDismissTimer) clearTimeout(autoDismissTimer);
      if (failSafeTimer) clearTimeout(failSafeTimer);

      if (isFast) {
        splash.classList.add('splash-fast-exit');
      } else {
        splash.classList.add('splash-fade-out');
      }
      splash.setAttribute('aria-hidden', 'true');

      const delay = isFast ? 240 : 700;
      setTimeout(() => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.classList.remove('splash-active');
        splash.style.display = 'none';

        // Dispatch custom event when splash screen finishes
        window.dispatchEvent(new CustomEvent('serenlink:splashCompleted'));
      }, delay);
    }

    // 3. Accessibility check (Reduced Motion)
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dismissSplash(true);
      return;
    }

    // 4. Majestic Cinematic Auto-Dismiss Timers (Play full sequence ~5.3s)
    const autoDismissTimer = setTimeout(() => dismissSplash(false), 5300);
    const failSafeTimer = setTimeout(() => dismissSplash(true), 6800);

    // 5. Dedicated Skip Button Handler
    function handleSkipEvent(e) {
      if (e) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
      }
      dismissSplash(true);
    }

    // Explicit Skip Button listeners (mouse & touch)
    if (skipBtn) {
      skipBtn.addEventListener('click', handleSkipEvent);
      skipBtn.addEventListener('pointerdown', handleSkipEvent);
      skipBtn.addEventListener('touchstart', handleSkipEvent, { passive: false });
    }

    // Allow user to dismiss with Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !isDismissed) {
        handleSkipEvent(e);
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
