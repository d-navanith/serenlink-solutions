/**
 * SERENLINK SOLUTIONS - CINEMATIC SPLASH SCREEN ENGINE
 * Plays on initial website entry and on every browser refresh/reload.
 * Unskippable full brand sequence (~5.3s) revealing the Home Hero section.
 */

(function () {
  'use strict';

  function initSplashScreen() {
    const splash = document.getElementById('serenlinkSplashScreen');
    if (!splash) return;

    const navEntry = (window.performance && performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || null;
    const isReload = navEntry
      ? navEntry.type === 'reload'
      : Boolean(window.performance && performance.navigation && performance.navigation.type === 1);

    let hasSeenSplash = false;
    let forceSplash = false;
    try {
      hasSeenSplash = sessionStorage.getItem('serenlink_splash_seen') === '1';
      forceSplash = sessionStorage.getItem('serenlink_force_splash') === '1';
      if (forceSplash) {
        sessionStorage.removeItem('serenlink_force_splash');
      }
    } catch (e) {
      hasSeenSplash = false;
    }

    const urlForcesSplash = window.location.search.indexOf('splash=1') !== -1;
    const shouldPlaySplash = !hasSeenSplash || isReload || forceSplash || urlForcesSplash;

    // If user clicked "Home" or brand logo during internal browsing (not first visit and not a reload),
    // go straight to the Home Hero section without replaying the intro.
    if (!shouldPlaySplash) {
      splash.style.display = 'none';
      splash.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.body.classList.remove('splash-active');
      window.scrollTo(0, 0);
      window.dispatchEvent(new CustomEvent('serenlink:splashCompleted'));
      return;
    }

    try {
      sessionStorage.setItem('serenlink_splash_seen', '1');
    } catch (e) {}

    let isDismissed = false;

    // 1. Ensure page is at top Hero section and lock scrolling while splash plays
    window.scrollTo(0, 0);
    document.body.classList.add('splash-active');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // 2. Smooth cinematic fade-out after full intro completes
    function finishSplash() {
      if (isDismissed) return;
      isDismissed = true;

      if (autoDismissTimer) clearTimeout(autoDismissTimer);
      if (failSafeTimer) clearTimeout(failSafeTimer);

      splash.classList.add('splash-fade-out');
      splash.setAttribute('aria-hidden', 'true');

      setTimeout(() => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.body.classList.remove('splash-active');
        splash.style.display = 'none';
        window.scrollTo(0, 0);

        // Notify smooth-scroll and hero animations that splash has completed
        window.dispatchEvent(new CustomEvent('serenlink:splashCompleted'));
      }, 700);
    }

    // 3. Play full cinematic sequence (~4.35s) with 5.8s fail-safe
    const autoDismissTimer = setTimeout(finishSplash, 4350);
    const failSafeTimer = setTimeout(finishSplash, 5800);
  }

  // Run immediately or on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSplashScreen);
  } else {
    initSplashScreen();
  }
})();
