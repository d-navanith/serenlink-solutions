/**
 * SERENLINK SOLUTIONS - CINEMATIC SLOW-PACED SPLASH SCREEN ENGINE
 * Fully isolated, responsive, and performance-optimized
 */

(function () {
  'use strict';

  function initSplashScreen() {
    const splash = document.getElementById('serenlinkSplashScreen');
    if (!splash) return;

    // Check if user already saw the splash screen in this browser session
    try {
      if (sessionStorage.getItem('serenlink_splash_viewed') === '1') {
        splash.style.display = 'none';
        document.body.classList.remove('splash-active');
        window.dispatchEvent(new CustomEvent('serenlink:splashCompleted'));
        return;
      }
    } catch (e) {
      // Ignore storage errors in private browsing modes
    }

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

      try {
        sessionStorage.setItem('serenlink_splash_viewed', '1');
      } catch (e) {}

      if (autoDismissTimer) clearTimeout(autoDismissTimer);
      if (failSafeTimer) clearTimeout(failSafeTimer);

      if (isFast) {
        splash.classList.add('splash-fast-exit');
      } else {
        splash.classList.add('splash-fade-out');
      }
      splash.setAttribute('aria-hidden', 'true');

      const delay = isFast ? 220 : 700;
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

    // 4. Majestic Cinematic Auto-Dismiss Timers
    const autoDismissTimer = setTimeout(() => dismissSplash(false), 5300);
    const failSafeTimer = setTimeout(() => dismissSplash(true), 6800);

    // 5. Interactive Instant Skip Handlers
    function handleSkipEvent(e) {
      if (e) {
        if (e.cancelable) e.preventDefault();
        e.stopPropagation();
      }
      dismissSplash(true);
    }

    // Explicit Skip Button listeners (instant on mouse/touch/pointer)
    if (skipBtn) {
      skipBtn.addEventListener('click', handleSkipEvent);
      skipBtn.addEventListener('pointerdown', handleSkipEvent);
      skipBtn.addEventListener('touchstart', handleSkipEvent, { passive: false });
    }

    // Clicking / tapping anywhere on the splash backdrop also dismisses immediately
    splash.addEventListener('click', handleSkipEvent);
    splash.addEventListener('pointerdown', (e) => {
      handleSkipEvent(e);
    });

    // Any keyboard press dismisses (Escape, Space, Enter, etc.)
    window.addEventListener('keydown', (e) => {
      if (!isDismissed) {
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
