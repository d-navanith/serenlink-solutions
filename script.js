/**
 * SERENLINK SOLUTIONS (PVT) LTD
 * Enterprise Security Engine & Dynamic Architecture
 */

// Production Automatic HTTPS Upgrade
(function enforceSecureTransport() {
  if (
    typeof window !== 'undefined' &&
    window.location &&
    window.location.protocol === 'http:' &&
    !['localhost', '127.0.0.1'].includes(window.location.hostname)
  ) {
    window.location.replace('https:' + window.location.href.substring(window.location.protocol.length));
  }
})();

// Client-side HTML Entity Sanitizer to prevent DOM XSS
function sanitizeSecurityString(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * SERENLINK SOLUTIONS (PVT) LTD
 * Theme: OnRamp 2025 Dynamic Engine & TKWIT Navigation
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroPhraseCycle();
  initNavbarScrollMorph();
  initAnimatedMetrics();
  initScrollReveals();
  initDropdownMenus();
  initHomeNavigation();
  initMobileNavigation();
  initSectorPillTabs();
  initNetworkCalculator();
  initQuoteModal();
  initContactForm();
  initSmoothScroll();
  initIndustryCardsAndModal();
  initSolutionsHubFilter();
  initFaqAccordion();
});

/* ==========================================================================
   1. ONRAMP 2025 HERO PHRASE CYCLING (Exact animation from video)
   Cycles through:
   - "Smoother workflows"
   - "Zero-latency optical fiber"
   - "Ironclad cybersecurity"
   - "Scalable systems"
   ========================================================================== */
function initHeroPhraseCycle() {
  const phraseBox = document.getElementById('heroPhraseBox');
  if (!phraseBox) return;

  const phrases = Array.from(phraseBox.querySelectorAll('.hero-cycling-phrase'));
  if (phrases.length === 0) return;

  let currentIndex = 0;

  // Set initial states
  phrases.forEach((el, idx) => {
    el.classList.remove('active', 'outgoing');
    if (idx === 0) {
      el.classList.add('active');
    }
  });

  function rollToNext() {
    const currentEl = phrases[currentIndex];
    currentIndex = (currentIndex + 1) % phrases.length;
    const nextEl = phrases[currentIndex];

    // Outgoing phrase rolls upward and blurs out
    currentEl.classList.remove('active');
    currentEl.classList.add('outgoing');

    // Next phrase enters from bottom
    nextEl.classList.remove('outgoing');
    nextEl.classList.add('active');

    // Clean up outgoing class after transition completes
    setTimeout(() => {
      currentEl.classList.remove('outgoing');
    }, 700);
  }

  // Roll every 2.8 seconds
  setInterval(rollToNext, 2800);
}

/* ==========================================================================
   2. TKWIT-STYLE DROPDOWN MENUS (Desktop & Mobile)
   ========================================================================== */
/* ==========================================================================
   HOME STANDARD: clicking Home / logo always shows the home page hero section
   ========================================================================== */
function initHomeNavigation() {
  const isHomePage = /(^|\/)(index\.html)?$/.test(window.location.pathname);
  if (!isHomePage) return;

  document.querySelectorAll('a[href="index.html"], a[href="./"], a[href="/"]').forEach(link => {
    if (!link.closest('.main-header') && !link.closest('.footer-brand')) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
      if (window.serenlinkLenis) {
        window.serenlinkLenis.scrollTo(0, { duration: 1.4 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });
}

function initDropdownMenus() {
  const navItems = document.querySelectorAll('.nav-item.has-dropdown');
  let activeTimer = null;

  navItems.forEach(item => {
    const trigger = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');

    if (!trigger || !dropdown) return;

    // Generous hover grace timer to prevent sudden disappearing on mouse move
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1080) {
        if (activeTimer) {
          clearTimeout(activeTimer);
          activeTimer = null;
        }
        navItems.forEach(other => {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.add('open');
      }
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1080) {
        if (activeTimer) clearTimeout(activeTimer);
        // 320ms grace period so user can smoothly move mouse across to dropdown
        activeTimer = setTimeout(() => {
          item.classList.remove('open');
        }, 320);
      }
    });

    // Keeping dropdown open when mouse is directly inside it
    dropdown.addEventListener('mouseenter', () => {
      if (activeTimer) {
        clearTimeout(activeTimer);
        activeTimer = null;
      }
      item.classList.add('open');
    });

    dropdown.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1080) {
        if (activeTimer) clearTimeout(activeTimer);
        activeTimer = setTimeout(() => {
          item.classList.remove('open');
        }, 320);
      }
    });

    // Parent links (Solutions, Services, Industries, Locations) are real, clickable links.
    // Desktop with a mouse: click navigates, hover opens the dropdown.
    // Mobile / Tablet drawer (<= 1080px): first tap or tapping caret toggles the inline accordion submenu;
    // tapping the parent link while already open navigates to the overview page.
    trigger.addEventListener('click', (e) => {
      const touchOnly = window.matchMedia('(hover: none)').matches;
      const isMobileDrawer = window.innerWidth <= 1080;
      const tappedCaret = !!e.target.closest('.caret');
      if (isMobileDrawer) {
        if (tappedCaret || !item.classList.contains('open')) {
          e.preventDefault();
          e.stopPropagation();
          const isOpen = item.classList.contains('open');
          closeAllDropdowns();
          if (!isOpen) item.classList.add('open');
        }
        return;
      }
      if (tappedCaret || (touchOnly && !item.classList.contains('open'))) {
        e.preventDefault();
        const isOpen = item.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) item.classList.add('open');
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.has-dropdown')) {
      if (activeTimer) clearTimeout(activeTimer);
      closeAllDropdowns();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (activeTimer) clearTimeout(activeTimer);
      closeAllDropdowns();
    }
  });

  function closeAllDropdowns() {
    navItems.forEach(el => {
      el.classList.remove('open');
    });
  }
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER (Native Touch Accordion Architecture)
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  function toggleMenu() {
    const isOpen = navMenu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    navMenu.classList.add('is-open');
    toggleBtn.classList.add('is-active');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden'; // Lock background scroll on mobile
  }

  function closeMenu() {
    navMenu.classList.remove('is-open');
    toggleBtn.classList.remove('is-active');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close when clicking any nav link that navigates to a new page/anchor
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', (e) => {
      // If it's a dropdown toggle trigger on mobile, don't close the drawer yet
      if (link.parentElement.classList.contains('has-dropdown') && link.classList.contains('nav-link')) {
        return;
      }
      if (window.innerWidth <= 1080) {
        closeMenu();
      }
    });
  });

  // Close when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1080 && navMenu.classList.contains('is-open')) {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeMenu();
      }
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // Clean reset when rotating or resizing to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1080 && navMenu.classList.contains('is-open')) {
      closeMenu();
    }
  }, { passive: true });
}

/* ==========================================================================
   4. SECTOR PILLS TAB SWITCHER ("On the client list" OnRamp feature)
   ========================================================================== */
const SECTOR_DATA = {
  banking: {
    title: "Zero-Downtime High-Security Network Architecture for Banking & BFSI",
    body: "Engineered to satisfy Central Bank of Sri Lanka (CBSL) cybersecurity guidelines. We deploy dual-redundant optical backbones, micro-segmented VLANs, and active-active Fortinet FortiGate firewalls with continuous intrusion prevention for Colombo core banking and islandwide branch teller networks.",
    specs: [
      "Sub-2ms transaction latency across Colombo",
      "PCI-DSS 4.0 compliant perimeter isolation",
      "Automated dual-ISP BGP route failover",
      "Strict 2-hour on-site emergency SLA guarantee"
    ],
    metricTitle: "CBSL & BFSI Benchmarks",
    stats: [
      { label: "Target Availability", value: "99.999% SLA" },
      { label: "Failover Time", value: "< 50 Milliseconds" },
      { label: "Branch Footprint", value: "350+ Branches islandwide" },
      { label: "Security Tier", value: "Zero Trust Architecture" }
    ]
  },
  apparel: {
    title: "Industrial-Grade Wi-Fi & OT Network Segregation for BOI Apparel Plants",
    body: "Designed specifically for massive export manufacturing plants across Katunayake, Biyagama, Koggala, and Seethawaka FTZs. We deploy IP67 dust/moisture-resistant Wi-Fi 6 access points, automated fabric switching for real-time MES/ERP factory tracking, and separate guest and machine networks.",
    specs: [
      "100% wireless coverage across 250,000+ sq ft floor",
      "Zero interference with sewing & cutting automation",
      "Ruggedized Cat6A shielded copper cabling",
      "Redundant 10G OM4 fiber between factory blocks"
    ],
    metricTitle: "Apparel & BOI Benchmarks",
    stats: [
      { label: "Barcode/RFID Uptime", value: "100% Continuous" },
      { label: "Concurrent Handhelds", value: "2,500+ Scanners" },
      { label: "Fiber Backbone", value: "10 Gbps / 40 Gbps" },
      { label: "Dust & Moisture Rating", value: "IP67 Certified" }
    ]
  },
  hospitality: {
    title: "Ultra-High Density Wi-Fi & IPTV Infrastructure for Luxury Resorts",
    body: "Elevate guest experience from Bentota to Galle Fort, Kandy, and Yala. Our hospitality solutions feature seamless Wi-Fi 7 roaming without dropped VoIP or Zoom calls, high-bandwidth GPON fiber to the room, integrated guest portal monetization, and automated bandwidth fairness management.",
    specs: [
      "Seamless roaming across beaches, pools & suites",
      "4K IPTV streaming and PMS integration",
      "Separate isolated secure administrative networks",
      "24/7 proactive remote telemetry & guest care"
    ],
    metricTitle: "Luxury Hospitality Benchmarks",
    stats: [
      { label: "Roaming Handover", value: "0ms Drop Rate" },
      { label: "Guest Concurrency", value: "5,000+ Active Devices" },
      { label: "Bandwidth Per Room", value: "Up to 500 Mbps" },
      { label: "TripAdvisor Rating Impact", value: "+38% Wi-Fi Satisfaction" }
    ]
  },
  tech: {
    title: "Ultra-Low Latency Carrier-Grade Infrastructure for IT/BPO Hubs",
    body: "Tailored for software development houses, fintech startups, and international BPO call centers at Trace Expert City, Orion City, and Colombo Innovation Tower. Features multi-gigabit switches, direct AWS/Azure cloud interconnects, and redundant fiber entries to prevent any downtime.",
    specs: [
      "Dual physical fiber ingress into building",
      "100 Gbps core switching capacity",
      "Crystal clear SIP / VoIP voice packet prioritization",
      "Real-time DDoS protection & DNS filtering"
    ],
    metricTitle: "Tech & BPO Benchmarks",
    stats: [
      { label: "Packet Loss Rate", value: "< 0.001%" },
      { label: "Core Switch Latency", value: "< 800 Nanoseconds" },
      { label: "Cloud Interconnect", value: "Direct AWS / Azure peering" },
      { label: "Voice Quality MOS", value: "4.4+ Crystal Clear" }
    ]
  },
  ports: {
    title: "Ruggedized Fiber Backbones & Port Logistics Wireless Networks",
    body: "Heavy-duty communications infrastructure built for container terminals, maritime yards, and bonded dry ports. Engineered to withstand high saline humidity, electromagnetic interference from cranes, and vast outdoor staging yards.",
    specs: [
      "Long-range directional wireless mesh links",
      "Armored outdoor single-mode fiber backbones",
      "Container handling equipment (CHE) telemetry",
      "High-power PoE switches with surge suppression"
    ],
    metricTitle: "Maritime Logistics Benchmarks",
    stats: [
      { label: "Outdoor Coverage", value: "4.5 km² Continuous" },
      { label: "Vibration Resistance", value: "Industrial Mil-Std" },
      { label: "Crane Connectivity", value: "Dual Wireless Links" },
      { label: "Corrosion Proofing", value: "Marine-Grade Enclosures" }
    ]
  }
};

function initSectorPillTabs() {
  const pills = document.querySelectorAll('.sector-pill');
  if (!pills || pills.length === 0) return;

  const titleEl = document.getElementById('sectorTitle');
  const bodyEl = document.getElementById('sectorBody');
  const specsEl = document.getElementById('sectorSpecs');
  const metricTitleEl = document.getElementById('sectorMetricTitle');
  const statsEl = document.getElementById('sectorStats');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      const sector = pill.getAttribute('data-sector');
      const data = SECTOR_DATA[sector];
      if (!data) return;

      // Active state
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // Smooth card transition
      const card = document.querySelector('.sector-content-card');
      if (card) {
        card.style.opacity = '0.5';
        card.style.transform = 'translateY(6px)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 120);
      }

      // Update content
      if (titleEl) titleEl.textContent = data.title;
      if (bodyEl) bodyEl.textContent = data.body;

      if (specsEl) {
        specsEl.innerHTML = data.specs.map(spec => `
          <li class="sector-spec-item">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            ${spec}
          </li>
        `).join('');
      }

      if (metricTitleEl) metricTitleEl.textContent = data.metricTitle;

      if (statsEl) {
        statsEl.innerHTML = data.stats.map(s => `
          <div class="metric-stat-row">
            <span class="metric-label">${s.label}</span>
            <span class="metric-value">${s.value}</span>
          </div>
        `).join('');
      }
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE NETWORK ESTIMATOR (Calculates architecture recommendations)
   ========================================================================== */
function initNetworkCalculator() {
  const optionButtons = document.querySelectorAll('.calc-option-btn');
  if (!optionButtons || optionButtons.length === 0) return;

  let currentConfig = {
    facility: 'office',
    nodes: 'medium',
    tier: 'enterprise'
  };

  optionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.getAttribute('data-group');
      const value = btn.getAttribute('data-value');

      // Remove selected within same group
      document.querySelectorAll(`.calc-option-btn[data-group="${group}"]`).forEach(b => {
        b.classList.remove('selected');
      });

      btn.classList.add('selected');
      currentConfig[group] = value;
      updateCalculation();
    });
  });

  function updateCalculation() {
    const cableEl = document.getElementById('calcSummaryCabling');
    const switchEl = document.getElementById('calcSummarySwitches');
    const wifiEl = document.getElementById('calcSummaryWifi');
    const firewallEl = document.getElementById('calcSummaryFirewall');
    const slaEl = document.getElementById('calcSummarySLA');

    // Calculations based on inputs
    let cable = "Cat6A LSZH Copper + OM4 Fiber Backbone";
    let switches = "48-Port PoE+ L3 Switch + 10G Uplink";
    let wifi = "6x High-Density Wi-Fi 6 APs (Cloud Managed)";
    let firewall = "Fortinet FortiGate 70F (1 Gbps Threat)";
    let sla = "Standard 4-Hour Islandwide SLA";

    if (currentConfig.nodes === 'small') {
      cable = "Cat6 UTP Copper Backbone (Fluke Tested)";
      switches = "24-Port Gigabit L2+ Switch";
      wifi = "3x Wi-Fi 6 Access Points";
      firewall = "Fortinet FortiGate 40F / Sophos XGS";
      sla = "Next Business Day On-Site";
    } else if (currentConfig.nodes === 'large') {
      cable = "Cat7 Shielded + 10G/40G OS2 Single-Mode Fiber";
      switches = "Modular Core Stack (128 Ports PoE+ 25G Uplinks)";
      wifi = "24x Enterprise Wi-Fi 6E/7 APs with Controller";
      firewall = "Fortinet FortiGate 200F Cluster (HA Active-Passive)";
      sla = "2-Hour Emergency Colombo SLA / 24/7 NOC";
    }

    if (currentConfig.facility === 'factory') {
      wifi = wifi + " (Industrial IP67 Enclosures)";
      cable = "Armored Shielded Cat6A + Heavy-Duty Trunking";
    } else if (currentConfig.facility === 'resort') {
      wifi = wifi + " (Outdoor Beach + Indoor Suite Coverage)";
    }

    if (currentConfig.tier === 'carrier') {
      firewall = "Carrier-Grade Zero-Trust Stack with SASE";
      sla = "2-Hour Colombo / 4-Hour Islandwide 24/7 NOC";
    }

    if (cableEl) cableEl.textContent = cable;
    if (switchEl) switchEl.textContent = switches;
    if (wifiEl) wifiEl.textContent = wifi;
    if (firewallEl) firewallEl.textContent = firewall;
    if (slaEl) slaEl.textContent = sla;
  }
}

/* ==========================================================================
   6. GET A FAST QUOTE MODAL (Interactive & connects to WhatsApp/Form)
   ========================================================================== */
function initQuoteModal() {
  const modal = document.getElementById('quoteModalBackdrop');
  const openButtons = document.querySelectorAll('.js-open-quote-modal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const quoteForm = document.getElementById('instantQuoteForm');

  if (!modal) return;

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  let lastQuoteSubmitTime = 0;

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // 1. Anti-Bot Honeypot Trap Check
      const honeypot = quoteForm.querySelector('[name="_sec_honeypot_trap"]');
      if (honeypot && honeypot.value.trim() !== '') {
        console.warn('Bot submission blocked.');
        quoteForm.reset();
        return;
      }

      // 2. Submission Rate Limiting (Prevents flood attacks)
      const now = Date.now();
      if (now - lastQuoteSubmitTime < 4000) {
        alert('Please wait a moment before submitting again.');
        return;
      }
      lastQuoteSubmitTime = now;

      // 3. Strict Input Sanitization
      const name = sanitizeSecurityString(quoteForm.querySelector('[name="client_name"]').value);
      const company = sanitizeSecurityString(quoteForm.querySelector('[name="company_name"]').value);
      const phone = sanitizeSecurityString(quoteForm.querySelector('[name="phone"]').value);
      const service = sanitizeSecurityString(quoteForm.querySelector('[name="service_type"]').value);

      // WhatsApp redirection link
      const text = encodeURIComponent(
        `Hello SerenLink Solutions Team!\n\n` +
        `I would like to request an official enterprise quote & site survey.\n\n` +
        `*Name:* ${name}\n` +
        `*Company:* ${company}\n` +
        `*Phone:* ${phone}\n` +
        `*Service Required:* ${service}\n\n` +
        `Please connect me with a Senior Network Solutions Architect.`
      );

      const whatsappUrl = `https://wa.me/94771234567?text=${text}`;

      // Show instant secure success message (Harmonized with Violet-Indigo & Lime Popup Theme)
      quoteForm.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem; background: rgba(1, 7, 43, 0.5); border: 1px solid rgba(180, 165, 255, 0.28); border-radius: 16px;">
          <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(226, 255, 56, 0.14); border: 1.5px solid var(--color-lime); color: var(--color-lime); box-shadow: 0 0 24px rgba(226, 255, 56, 0.3); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 style="font-size: 1.5rem; font-weight: 800; color: #ffffff; margin-bottom: 0.5rem;">Quotation Request Registered!</h3>
          <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 1.75rem; line-height: 1.6;">
            Thank you, <strong style="color: #ffffff;">${name}</strong>. A certified CCIE/Fortinet network engineer has received your specifications and will contact you at <strong style="color: var(--color-lime);">${phone}</strong> within 15 minutes.
          </p>
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.6rem; background: var(--color-lime); color: #090d16; padding: 0.9rem 1.8rem; border-radius: 10px; font-weight: 800; text-decoration: none; box-shadow: 0 8px 25px rgba(226, 255, 56, 0.3);">
            <span>Open WhatsApp for Instant Dispatch</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </div>
      `;
    });
  }
}

/* ==========================================================================
   7. SMOOTH SCROLLING FOR IN-PAGE ANCHORS
   ========================================================================== */
function initSmoothScroll() {
  // Enhanced natural in-page anchor scrolling with fixed header compensation
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId === '#!') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();

        // Calculate sticky header offset dynamically
        const header = document.querySelector('.main-header');
        const headerHeight = header ? header.offsetHeight : 75;
        const extraBuffer = 15;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (headerHeight + extraBuffer);

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });

        // Accessible focus management
        targetEl.setAttribute('tabindex', '-1');
        targetEl.focus({ preventScroll: true });

        // Update URL hash cleanly without jumping
        if (history.pushState) {
          history.pushState(null, null, targetId);
        }
      }
    });
  });
}


/* ==========================================================================
   ONRAMP ANIMATION ENGINE HELPERS
   - Navbar Scroll Morph (Glassmorphism Elevation)
   - Dynamic Counting Trust Metrics
   - Scroll-Triggered Staggered Reveals
   ========================================================================== */

function initNavbarScrollMorph() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  function onScroll() {
    if (window.scrollY > 25) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initAnimatedMetrics() {
  /* Reference-inspired 3D Odometer Animation:
     1. Subtle oversized ghost-digit reels drift slowly in the dark violet-indigo glass backdrop.
     2. Foreground digits roll through vertical mechanical reels with top/bottom gradient masking.
     3. Initial cascade rolls all 4 stats into place; afterwards, a gentle periodic odometer step
        and hover re-spin keep the counters alive while always landing on the exact target metrics. */
  const strip = document.querySelector('.hero-trust-strip');
  if (!strip) return;

  const numbers = Array.from(strip.querySelectorAll('.trust-number'));
  if (!numbers.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canAnimate = typeof Element !== 'undefined' && typeof Element.prototype.animate === 'function';
  if (reduceMotion || !canAnimate) return;

  // Inject subtle ambient background ghost-digit columns (matching the Pinterest reference backdrop)
  if (!strip.querySelector('.odo-bg-backdrop')) {
    const bg = document.createElement('div');
    bg.className = 'odo-bg-backdrop';
    bg.setAttribute('aria-hidden', 'true');
    const bgCols = [
      ['3', '4', '5', '6', '7', '8', '3', '4', '5', '6'],
      ['8', '9', '0', '1', '2', '9', '8', '9', '0', '1'],
      ['1', '2', '3', '4', '5', '6', '1', '2', '3', '4'],
      ['2', '4', '5', '7', '8', '9', '2', '4', '5', '7']
    ];
    bgCols.forEach((colDigits, idx) => {
      const col = document.createElement('div');
      col.className = 'odo-bg-col ' + (idx % 2 === 1 ? 'reverse' : '');
      col.style.animationDuration = (20 + idx * 4) + 's';
      colDigits.forEach(d => {
        const sp = document.createElement('span');
        sp.textContent = d;
        col.appendChild(sp);
      });
      bg.appendChild(col);
    });
    strip.insertBefore(bg, strip.firstChild);
  }

  const STEP_EM = 1.16; // exact height of one digit cell in em
  const groups = [];

  numbers.forEach((el, groupIdx) => {
    const raw = el.getAttribute('data-target');
    if (raw === null) return;
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const finalText = parseFloat(raw).toFixed(decimals) + suffix;

    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', finalText);
    el.textContent = '';

    const wrap = document.createElement('span');
    wrap.className = 'odo';
    wrap.setAttribute('aria-hidden', 'true');

    const chars = finalText.split('');
    let digitIndex = 0;
    const digits = [];

    chars.forEach(ch => {
      if (/\d/.test(ch)) {
        const win = document.createElement('span');
        win.className = 'odo-digit';
        const reel = document.createElement('span');
        reel.className = 'odo-reel';

        const targetDigit = parseInt(ch, 10);
        const turns = 1 + digitIndex; // right-most digits spin through more numbers
        const totalSteps = turns * 10 + targetDigit;

        for (let n = 0; n <= totalSteps; n++) {
          const cell = document.createElement('span');
          cell.textContent = String(n % 10);
          reel.appendChild(cell);
        }

        win.appendChild(reel);
        wrap.appendChild(win);
        digits.push({
          win,
          reel,
          targetDigit,
          totalSteps,
          order: digitIndex,
          activeAnim: null
        });
        digitIndex++;
      } else {
        const stat = document.createElement('span');
        stat.className = 'odo-static';
        stat.textContent = ch;
        wrap.appendChild(stat);
      }
    });

    el.appendChild(wrap);
    el.classList.add('odo-ready');

    const itemCard = el.closest('.trust-item');
    const group = { el, wrap, itemCard, digits, groupIdx, busy: false };
    groups.push(group);

    // Interactive hover: smoothly roll the rightmost digits when user hovers the metric card
    if (itemCard) {
      itemCard.addEventListener('mouseenter', () => {
        pulseGroup(group, true);
      });
    }
  });

  // Full initial odometer roll from 0 up to the target value
  function rollGroupFull(group, baseDelay) {
    group.busy = true;
    let maxEnd = 0;
    group.digits.forEach((d) => {
      if (d.activeAnim) d.activeAnim.cancel();
      const duration = 1250 + d.order * 300;
      const end = baseDelay + duration;
      if (end > maxEnd) maxEnd = end;

      d.win.classList.add('is-rolling');
      d.reel.style.transform = 'translateY(0em)';

      const anim = d.reel.animate(
        [
          { transform: 'translateY(0em)' },
          { transform: 'translateY(' + (-d.totalSteps * STEP_EM).toFixed(3) + 'em)' }
        ],
        {
          duration: duration,
          delay: baseDelay,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          fill: 'forwards'
        }
      );
      d.activeAnim = anim;
      anim.onfinish = () => {
        d.reel.style.transform = 'translateY(' + (-d.totalSteps * STEP_EM).toFixed(3) + 'em)';
        d.win.classList.remove('is-rolling');
        d.activeAnim = null;
      };
    });

    setTimeout(() => {
      group.wrap.classList.add('is-live');
      group.busy = false;
    }, maxEnd + 40);
  }

  // Signature step-by-step odometer roll (like the Pinterest reference: steps through last 3 values into target)
  function pulseGroup(group, isHover) {
    if (group.busy) return;
    group.busy = true;

    const len = group.digits.length;
    // Animate the last 1-2 digits stepping through 3 consecutive odometer ticks to land on target
    const startIdx = Math.max(0, len - 2);
    let maxDuration = 0;

    group.digits.slice(startIdx).forEach((d, idx) => {
      const isLast = (startIdx + idx) === len - 1;
      const backSteps = isLast ? 3 : 1;
      const fromStep = Math.max(0, d.totalSteps - backSteps);
      const duration = isLast ? (isHover ? 1150 : 1450) : (isHover ? 850 : 1050);
      if (duration > maxDuration) maxDuration = duration;

      if (d.activeAnim) d.activeAnim.cancel();
      d.win.classList.add('is-rolling');

      // Build multi-stop keyframes so each intermediate digit pauses briefly like a real odometer wheel
      const keyframes = [];
      const count = d.totalSteps - fromStep;
      for (let s = 0; s <= count; s++) {
        const stepPos = fromStep + s;
        keyframes.push({
          transform: 'translateY(' + (-stepPos * STEP_EM).toFixed(3) + 'em)'
        });
      }

      const anim = d.reel.animate(keyframes, {
        duration: duration,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'forwards'
      });
      d.activeAnim = anim;
      anim.onfinish = () => {
        d.reel.style.transform = 'translateY(' + (-d.totalSteps * STEP_EM).toFixed(3) + 'em)';
        d.win.classList.remove('is-rolling');
        d.activeAnim = null;
      };
    });

    setTimeout(() => {
      group.busy = false;
    }, maxDuration + 60);
  }

  let started = false;
  let cycleIndex = 0;

  function startAll() {
    if (started) return;
    started = true;
    groups.forEach((g, idx) => {
      rollGroupFull(g, idx * 160);
    });

    // Gentle periodic odometer step across the 4 counters so the strip stays dynamically alive
    setInterval(() => {
      if (document.hidden) return;
      const g = groups[cycleIndex % groups.length];
      cycleIndex++;
      pulseGroup(g, false);
    }, 3200);
  }

  function whenReady(cb) {
    if (document.body.classList.contains('splash-active')) {
      window.addEventListener('serenlink:splashCompleted', () => setTimeout(cb, 250), { once: true });
    } else {
      cb();
    }
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.disconnect();
        whenReady(startAll);
      }
    });
  }, { threshold: 0.25 });

  observer.observe(strip);
}

function initScrollReveals() {
  // Check if user prefers reduced motion (Accessibility First)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.innerWidth <= 768;

  // Comprehensive selector list covering homepage and all 6 subpages
  const revealSelectors = [
    // Section headers, tags & descriptions
    '.section-tag',
    '.detail-badge',
    '.section-title',
    '.section-desc',
    '.page-hero-title',
    '.page-hero-lead',
    '.page-hero-banner h1',
    '.page-hero-banner p',
    '.detail-title',
    '.detail-desc',
    '.section-fade-divider',
    // Cards, grids & grouped content
    '.expect-card',
    '.solution-card',
    '.solution-overview-card',
    
    '.stat-card',
    '.sector-blueprint-card',
    '.coverage-summary-card',
    '.calculator-card',
    '.calc-step',
    '.hub-row',
    '.sla-box',
    '.contact-card',
    '.about-milestone',
    '.detail-card-visual',
    '.detail-block-grid > div',
    '.metric-stat-row',
    '.coverage-hubs-grid > div',
    '.location-card',
    '.contact-form-wrap',
    '.contact-info-card',
    '.spec-card',
    '.sol-detail-block',
    '.sector-spec-item',
    // Final CTA & button groups
    '.section-final-cta',
    '.final-cta-capsule',
    '.final-cta-btns',
    '.hero-cta-group',
    '.hero-trust-strip'
  ];

  const elements = document.querySelectorAll(revealSelectors.join(', '));
  if (!elements.length) return;

  // If user requested reduced motion, reveal everything immediately without animations
  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  // Progressive enhancement: add reveal-init class and calculate natural stagger
  elements.forEach(el => {
    el.classList.add('reveal-init');

    // Slower, more elegant timing for illustrations and images (1250ms)
    if (
      el.classList.contains('detail-card-visual') ||
      el.matches('img') ||
      (el.querySelector('img') && !el.classList.contains('detail-badge') && !el.classList.contains('onramp-lime-badge'))
    ) {
      el.classList.add('reveal-image');
    }

    // Coordinated section heading cascade: tag (0s) -> title (160ms) -> desc (320ms) -> CTA (480ms)
    if (el.classList.contains('section-tag') || el.classList.contains('detail-badge')) {
      el.style.transitionDelay = '0s';
    } else if (el.classList.contains('section-title') || el.classList.contains('page-hero-title') || el.classList.contains('detail-title')) {
      el.style.transitionDelay = '0.16s';
    } else if (el.classList.contains('section-desc') || el.classList.contains('page-hero-lead') || el.classList.contains('detail-desc')) {
      el.style.transitionDelay = '0.32s';
    } else if (el.classList.contains('final-cta-btns') || el.classList.contains('hero-cta-group')) {
      el.style.transitionDelay = '0.48s';
    } else {
      // Natural 180ms card & grid stagger delay between siblings (120ms on mobile)
      const parent = el.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children).filter(child => {
          return child.matches && child.matches(revealSelectors.join(', '));
        });
        const childIndex = siblings.indexOf(el);
        if (childIndex > 0) {
          const staggerUnit = isMobile ? 0.12 : 0.18;
          const delay = (childIndex % 6) * staggerUnit;
          el.style.transitionDelay = `${delay.toFixed(2)}s`;
        }
      }
    }
  });

  // IntersectionObserver configured with 85% viewport trigger (-15% rootMargin from bottom)
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Clear transition delay once entrance animation completes so hover physics are immediate
        setTimeout(() => {
          if (entry.target) entry.target.style.transitionDelay = '';
        }, 1100);
        // Unobserve once revealed to eliminate scroll overhead and replay
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -15% 0px'
  });

  elements.forEach(el => observer.observe(el));
}


/* ==========================================================================
   ENTERPRISE CONTACT FORM WITH SECURITY HONEYPOT & DISPATCH
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactPageForm');
  if (!contactForm) return;

  let lastSubmitTime = 0;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // 1. Anti-Bot Honeypot Trap Check
    const honeypot = contactForm.querySelector('[name="_sec_honeypot_trap"]');
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('Spam bot submission blocked.');
      contactForm.reset();
      return;
    }

    // 2. Submission Rate Limiting
    const now = Date.now();
    if (now - lastSubmitTime < 4000) {
      alert('Please wait a moment before submitting again.');
      return;
    }
    lastSubmitTime = now;

    // 3. Strict Input Sanitization
    const name = sanitizeSecurityString(contactForm.querySelector('[name="name"]').value);
    const company = sanitizeSecurityString(contactForm.querySelector('[name="company"]').value);
    const phone = sanitizeSecurityString(contactForm.querySelector('[name="phone"]').value);
    const email = sanitizeSecurityString(contactForm.querySelector('[name="email"]').value);
    const service = sanitizeSecurityString(contactForm.querySelector('[name="service"]').value);
    const message = sanitizeSecurityString(contactForm.querySelector('[name="message"]') ? contactForm.querySelector('[name="message"]').value : '');

    const text = encodeURIComponent(
      `Hello SerenLink Solutions Team!\n\n` +
      `New Enterprise Inquiry from Website:\n\n` +
      `*Name:* ${name}\n` +
      `*Company:* ${company}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Requirement:* ${service}\n` +
      (message ? `*Notes:* ${message}\n\n` : '\n') +
      `Please assign a Network Solutions Specialist.`
    );

    const whatsappUrl = `https://wa.me/94771234567?text=${text}`;

    contactForm.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1.5rem; background: radial-gradient(circle at 14% 12%, #372772 0%, #25286b 38%, #01072b 100%); border-radius: 18px; border: 1px solid rgba(180, 165, 255, 0.35); box-shadow: 0 24px 50px -12px rgba(1, 7, 43, 0.7);">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: rgba(226, 255, 56, 0.14); border: 1.5px solid var(--color-lime); color: var(--color-lime); box-shadow: 0 0 24px rgba(226, 255, 56, 0.3); display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 style="font-size: 1.5rem; font-weight: 800; color: #ffffff; margin-bottom: 0.5rem;">Inquiry Successfully Transmitted!</h3>
        <p style="color: #cbd5e1; font-size: 0.95rem; margin-bottom: 1.75rem; line-height: 1.6;">
          Thank you, <strong style="color: #ffffff;">${name}</strong> (<strong style="color: #e2e8f0;">${company}</strong>). Your request has been queued with highest priority. A senior solutions architect will call <strong style="color: var(--color-lime);">${phone}</strong> shortly.
        </p>
        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.6rem; background: var(--color-lime); color: #090d16; padding: 0.9rem 1.8rem; border-radius: 10px; font-weight: 800; text-decoration: none; box-shadow: 0 8px 25px rgba(226, 255, 56, 0.3);">
          <span>Connect Immediately via WhatsApp</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    `;
  });
}


/* ==========================================================================
   INTERACTIVE 10 INDUSTRY VERTICAL CARDS & ARCHITECTURE MODAL
   ========================================================================== */
function initIndustryCardsAndModal() {
  const filterBtns = document.querySelectorAll('.industry-filter-btn');
  const cards = document.querySelectorAll('#industryGrid .expect-card');
  const modal = document.getElementById('industryModalBackdrop');
  const modalCloseBtn = document.getElementById('industryModalCloseBtn');
  const modalContent = document.getElementById('industryModalContent');
  const quoteModal = document.getElementById('quoteModalBackdrop');

  // Comprehensive Engineering Data Store for the 10 Industry Domains
  const industryData = {
    'it-tech': {
      title: 'IT and Technology',
      badge: 'Cloud & DevOps Interconnect',
      category: 'tech-telecom',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`,
      lead: 'Engineered for software companies, SaaS providers, and technology hubs operating in Trace Expert City, Orion City, and across Colombo. Delivers ultra-low latency, micro-segmented developer environments, and direct multi-cloud connectivity.',
      challenges: [
        'Developer bottlenecks caused by slow local build pushes and heavy Git repositories',
        'Frequent micro-outages disrupting production deployments and CI/CD pipelines',
        'Unsecured multi-tenant office layouts lacking strict physical and logical VLAN segmentation'
      ],
      specs: [
        { label: 'Backbone Throughput', val: '10G / 40G / 100G Leaf-Spine' },
        { label: 'Cloud Interconnect', val: 'AWS Direct Connect & Azure ExpressRoute' },
        { label: 'Developer Wi-Fi', val: 'Wi-Fi 7 (802.11be) 320MHz Channels' },
        { label: 'Target Availability', val: '99.999% SLA (< 5 mins annual downtime)' }
      ],
      compliance: ['ISO/IEC 27001 Aligned', 'SOC 2 Type II Ready', 'TIA-942 Tier-3 Standards', 'Fluke DSX-8000 Certified'],
      sla: '24/7 Automated Proactive Telemetry with 15-Minute Remote Response & 2-Hour Colombo On-Site SLA.'
    },
    'banking-finance': {
      title: 'Banking and Financial',
      badge: 'CBSL & PCI-DSS 4.0 Architecture',
      category: 'finance-gov',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21h18M3 10h18M5 10v11M19 10v11M9 10v11M15 10v11M12 2L2 7h20L12 2z"></path></svg>`,
      lead: 'Full compliance with Central Bank of Sri Lanka (CBSL) cybersecurity guidelines. We architect zero-downtime transactional cores with automated dual-ISP BGP failover, PCI-DSS compliant perimeter segmentation, and Active-Active HA firewall clustering.',
      challenges: [
        'Regulatory exposure from non-compliance with strict CBSL directional network guidelines',
        'ATM and Teller downtime disrupting branch retail banking transactions',
        'Sophisticated perimeter threats, ransomware, and unauthorized internal lateral movement'
      ],
      specs: [
        { label: 'Failover Speed', val: '< 50ms BGP Route Failover' },
        { label: 'Perimeter Security', val: 'Active-Active FortiGate Next-Gen Clusters' },
        { label: 'Transaction Latency', val: 'Sub-2ms across Colombo Clearing' },
        { label: 'Branch Footprint', val: 'Up to 400+ Branches Supported' }
      ],
      compliance: ['CBSL Guideline Certified', 'PCI-DSS 4.0 Compliant', 'Zero Trust Architecture (ZTNA)', 'IPsec Hardware Accelerated'],
      sla: 'Dedicated 2-Hour Islandwide Financial Emergency SLA Dispatch with 24/7 Bank-Grade NOC Guard.'
    },
    'healthcare': {
      title: 'Healthcare Administration',
      badge: 'Medical IoT & PACS Telemetry',
      category: 'health-edu',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M2 12h20"></path><circle cx="12" cy="12" r="9"></circle></svg>`,
      lead: 'Mission-critical hospital communications connecting diagnostic laboratories, surgical theaters, and patient rooms. Guarantees non-stop DICOM/PACS transfers, telemetry monitor prioritization, and isolated HIPAA/GDPR clinical records.',
      challenges: [
        'Delayed high-resolution MRI/CT scan transfers due to congested copper backbones',
        'Vulnerability of unmanaged medical IoT devices to hospital-wide ransomware attacks',
        'Wi-Fi signal degradation through thick x-ray shielding walls and operating rooms'
      ],
      specs: [
        { label: 'Imaging Backbone', val: '10G OM4/OS2 Optical Dedicated Links' },
        { label: 'Medical IoT Shield', val: 'Isolated Medical Equipment Micro-VLANs' },
        { label: 'Power Redundancy', val: 'Dual-feed Online UPS with Bypass Racks' },
        { label: 'Telemedicine QoS', val: 'Dedicated Priority VoIP & 4K Video Streams' }
      ],
      compliance: ['HIPAA / EMR Aligned', 'IEC 60601-1 Medical Safety', 'Bio-Medical IoT Isolated', 'Zero-Interference RF'],
      sla: 'Priority Code-Red Healthcare Dispatch: Guaranteed 1-Hour Colombo Emergency Hospital Response.'
    },
    'government': {
      title: 'Government',
      badge: 'State-Level Secure Enclaves',
      category: 'finance-gov',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h16M2 20h20M6 10v10M10 10v10M14 10v10M18 10v10M12 2L2 7h20L12 2z"></path></svg>`,
      lead: 'Hardened national infrastructure engineered for state ministries, public sector secretariats, and defense establishments. Implements air-gapped classified enclaves, military-grade cryptographic tunnels, and centralized government campus fiber rings.',
      challenges: [
        'State-sponsored Advanced Persistent Threats (APTs) targeting public administrative portals',
        'Legacy copper wiring causing intermittent link loss across large colonial secretariat buildings',
        'Lack of tamper-evident physical and optical network access controls'
      ],
      specs: [
        { label: 'Security Classification', val: 'Air-Gapped & Hardware Crypto Enclaves' },
        { label: 'Optical Backbone', val: 'Armored Underground Single-Mode Fiber Ring' },
        { label: 'Perimeter Defense', val: 'Hardware Security Modules (HSM) & Deep Packet IDS' },
        { label: 'Cabinet Security', val: 'Biometric Access Tamper-Evident Racks' }
      ],
      compliance: ['National Cybersecurity Standards', 'NIST SP 800-53 Ready', 'Air-Gapped Isolation', 'TIA-568-D Defense Grade'],
      sla: 'Dedicated Government Operations Specialist Unit with 24/7 Secure NOC Monitoring.'
    },
    'education': {
      title: 'Education and University',
      badge: 'High-Density Campus Wi-Fi 7',
      category: 'health-edu',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c0 3 3 5 6 5s6-2 6-5v-5"></path></svg>`,
      lead: 'Comprehensive campus networking connecting lecture halls, research faculties, student dormitories, and administrative centers. Features eduroam 802.1X secure authentication, intelligent bandwidth rate-limiting, and multi-gigabit research interconnects.',
      challenges: [
        'Sudden Wi-Fi collapse in 500-seat lecture halls when students connect multiple devices',
        'Bandwidth hogging and illicit peer-to-peer downloading draining university internet bandwidth',
        'Complex multi-building campus layouts requiring expensive aerial or trench fiber cabling'
      ],
      specs: [
        { label: 'Concurrent Capacity', val: '10,000+ Concurrent Students & Devices' },
        { label: 'Authentication', val: 'eduroam Global 802.1X Federated Access' },
        { label: 'Content Security', val: 'Next-Gen Firewall Web & Application Filter' },
        { label: 'Campus Links', val: 'Multi-Gigabit Inter-Faculty Optical Links' }
      ],
      compliance: ['eduroam Validated', 'CIPA Compliant Content Safety', 'IEEE 802.1X Certified', '802.11be Campus Grade'],
      sla: 'Semester-Critical Exam Guarantee: Dedicated Standby Support During Online Exam & Registration Windows.'
    },
    'manufacturing': {
      title: 'Manufacturing Company',
      badge: 'FTZ Industrial IoT & SCADA',
      category: 'mfg-logistics',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 20h20M2 20V8l6 4V8l6 4V4h6v16"></path></svg>`,
      lead: 'Built for Sri Lanka\'s leading export apparel, rubber, and manufacturing plants in Katunayake, Biyagama, Koggala, and Seethawaka Export Processing Zones. Endures machine vibrations, fabric lint, and high temperatures with zero scanner drops.',
      challenges: [
        'Handheld barcode scanners dropping connection across vast production lines, causing ERP export delays',
        'Dust, humidity, and fabric lint destroying standard commercial network switches',
        'Unsafe interconnects between industrial production machines (SCADA/OT) and corporate office networks'
      ],
      specs: [
        { label: 'Enclosure Rating', val: 'IP67 Dust, Lint & Moisture Protection' },
        { label: 'Scanner Roaming', val: 'Zero-Loss 802.11r/k Fast BSS Handoff' },
        { label: 'OT/IT Boundary', val: 'Purdue Model Micro-Segmented SCADA VLANs' },
        { label: 'Cable Standards', val: 'Heavy-Duty Industrial Shielded Cat6A STP' }
      ],
      compliance: ['Purdue Model Architecture', 'TIA-1005 Industrial Certified', 'Fluke DSX-8000 Verified', 'ISO 9001:2015 Aligned'],
      sla: 'Fast-Track FTZ Zone Dispatch: 2-Hour Emergency On-Site Response for Katunayake & Biyagama Zones.'
    },
    'logistics': {
      title: 'Logistics and Supply Chain',
      badge: 'Port & Cold-Chain Wireless',
      category: 'mfg-logistics',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>`,
      lead: 'High-power outdoor wireless, cold-chain warehouse connectivity, and inter-terminal telemetry connecting Colombo Port facilities with inland bonded container depots. Ensures continuous real-time inventory tracking and vehicle fleet integration.',
      challenges: [
        'Massive shipping container stacks completely blocking standard Wi-Fi line-of-sight signals',
        'Sub-zero cold storage warehouses creating severe condensation that damages network electronics',
        'Interrupted container yard gate entry systems stalling container trucks and incurring demurrage costs'
      ],
      specs: [
        { label: 'Outdoor Coverage', val: 'Up to 300-Meter Directional High-Gain Beams' },
        { label: 'Temperature Range', val: '-30°C to +75°C Extreme Tolerance' },
        { label: 'Terminal Roaming', val: 'Sub-30ms Seamless Crane & Forklift Roaming' },
        { label: 'Port Interface', val: 'EDI Electronic Manifest System Dedicated Pipe' }
      ],
      compliance: ['Port Authority Standards', 'Cold-Chain HACCP Aligned', 'IP68 Weatherproof Rated', 'Lightning Surge Protected'],
      sla: '24/7 Port Logistics Emergency Standby: Zero Demurrage Guarantee with Rapid Spares Replacement.'
    },
    'telecom': {
      title: 'Telecommunications',
      badge: 'Carrier-Grade Optical Transport',
      category: 'tech-telecom',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2"></circle><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path></svg>`,
      lead: 'Infrastructure engineering for telecom operators, Internet Service Providers, and carrier neutral meet-me rooms. We deploy DWDM/CWDM optical multiplexing, dark fiber cross-connect patch facilities, and high-density Tier-3 data center rack enclosures.',
      challenges: [
        'Rapid bandwidth exhaustion on core metro routes requiring expensive fiber trenching',
        'High insertion loss on fiber splices causing optical power degradation over long runs',
        'Thermal dissipation and power density bottlenecks inside high-density telecom point-of-presence (PoP) shelters'
      ],
      specs: [
        { label: 'Multiplexing Capacity', val: 'DWDM 40-Channel 100G/200G Lambda Transport' },
        { label: 'Testing Standard', val: 'Fluke OTDR & Tier-2 Optical Power Loss' },
        { label: 'Power Infrastructure', val: '-48V DC Dual Power Feeds & A+B Busbars' },
        { label: 'Cross-Connects', val: 'Ultra-High-Density 1U 144-Fiber LC Patch Racks' }
      ],
      compliance: ['ITU-T G.694.1 DWDM Standard', 'TIA-942 Tier-3 Ready', 'Telcordia GR-63-CORE', 'Fluke OTDR Certified'],
      sla: 'Carrier-Grade SLA: 99.999% Service Availability with Continuous Optical Dark-Fiber Telemetry.'
    },
    'bpo': {
      title: 'BPO (Business Process Outsourcing)',
      badge: 'Zero-Jitter VoIP & Shift Matrix',
      category: 'tech-telecom',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`,
      lead: 'Optimized for high-volume 24/7 call centers and BPO firms serving US, UK, and Australian clients from Colombo. Features strict QoS voice queuing (MOS > 4.4), dual undersea cable internet route diversity, and PCI-DSS compliant clean floor agent routing.',
      challenges: [
        'Voice jitter, echo, and dropped customer calls resulting in penalized international client SLA scores',
        'Subsea cable cuts or local ISP issues causing catastrophic multi-hour work stoppages for 500+ agents',
        'Agent desktop security risks and confidential payment card information leakage during calls'
      ],
      specs: [
        { label: 'Voice Quality (MOS)', val: 'Guaranteed MOS > 4.4 (Crystal Clear VoIP)' },
        { label: 'Subsea Diversity', val: 'SMW4 & BBG Cable Gateway Redundancy' },
        { label: 'Failover Speed', val: 'Instant Seamless Session-Persisting SIP Switch' },
        { label: 'Agent Clean Floor', val: 'Zero-Trust PCI Segregated Agent Desktops' }
      ],
      compliance: ['PCI-DSS 4.0 Contact Center', 'ITU-T P.800 Voice QoS', 'ISO 27001 Certified', 'SIP Trunking Standard'],
      sla: '24/7 Global Shift Guarantee: Dedicated Priority NOC Line for Continuous International BPO Operations.'
    },
    'cybersecurity': {
      title: 'Cybersecurity & Network Operations',
      badge: 'Zero Trust & 24/7 Colombo SOC',
      category: 'cyber-ops',
      icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><circle cx="12" cy="11" r="2.5"></circle><line x1="12" y1="13.5" x2="12" y2="16"></line></svg>`,
      lead: 'Complete Zero Trust Network Architecture (ZTNA), Network Detection & Response (NDR), and managed 24/7 Colombo SOC/NOC telemetry. We shield enterprise perimeters against modern ransomware, insider threats, and zero-day vulnerabilities.',
      challenges: [
        'Unchecked lateral movement where an infected laptop compromises entire enterprise server rooms',
        'Alert fatigue with thousands of unanalyzed firewall logs obscuring active zero-day attacks',
        'Lack of 24/7 monitoring leaving corporate networks completely unmonitored over weekends and holidays'
      ],
      specs: [
        { label: 'Architecture Model', val: 'Zero Trust Network Access (ZTNA)' },
        { label: 'Threat Response', val: 'AI-Driven Automated Lateral Threat Containment' },
        { label: 'Log Telemetry', val: 'Centralized SIEM Log Retention & Syslog Audit' },
        { label: 'Perimeter Inspection', val: 'Full SSL/TLS Deep Packet Decryption & Inspection' }
      ],
      compliance: ['NIST Cybersecurity Framework', 'CIS Controls Top 18', 'Zero Trust Architecture', 'Fluke Certified Cabling'],
      sla: 'Continuous 24/7/365 SOC Monitoring with 15-Minute Guaranteed Threat Mitigation SLA.'
    }
  };

  const industryGrid = document.getElementById('industryGrid');
  let currentFilter = 'all';

  function applyIndustryVisibility() {
    cards.forEach((card) => {
      const category = card.getAttribute('data-category');
      if (currentFilter === 'all' || category === currentFilter) {
        card.style.display = 'flex';
        card.style.animation = 'fadeInCard 0.35s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });

    if (industryGrid) {
      industryGrid.classList.toggle('is-filtered', currentFilter !== 'all');
    }
  }

  // Show all 10 industry cards clearly on load
  applyIndustryVisibility();

  // 1. Category Filter Tabs Click Handling
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      applyIndustryVisibility();
    });
  });

  // 2. Open Industry Architecture Modal
  const viewMoreButtons = document.querySelectorAll('.js-open-industry-modal');
  viewMoreButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const data = industryData[targetId];
      if (!data) return;

      renderIndustryModal(data, targetId);
      if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // 3. Render Modal Content
  function renderIndustryModal(item, targetId) {
    if (!modalContent) return;

    let specsHtml = '';
    item.specs.forEach(s => {
      specsHtml += `
        <div class="modal-spec-card">
          <div class="modal-spec-card-title">${s.label}</div>
          <div class="modal-spec-card-val">${s.val}</div>
        </div>
      `;
    });

    let complianceHtml = '';
    item.compliance.forEach(c => {
      complianceHtml += `<span class="modal-compliance-pill">${c}</span>`;
    });

    let challengesHtml = '';
    item.challenges.forEach(ch => {
      challengesHtml += `
        <li style="display:flex; align-items:flex-start; gap:0.6rem; margin-bottom:0.5rem; color:#475569; font-size:0.9rem;">
          <svg style="flex-shrink:0; margin-top:3px;" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e2ff38" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span>${ch}</span>
        </li>
      `;
    });

    modalContent.innerHTML = `
      <div class="modal-industry-header">
        <div class="modal-industry-icon">${item.icon}</div>
        <div>
          <span class="modal-industry-badge">${item.badge}</span>
          <h3 class="modal-industry-title">${item.title}</h3>
        </div>
      </div>

      <div style="font-size:1.02rem; color:#e2e8f0; line-height:1.65; margin-bottom:1.5rem;">
        ${item.lead}
      </div>

      <h4 class="modal-section-h4">Key Operational Pressures Solved</h4>
      <ul style="list-style:none; padding:0; margin-bottom:1.5rem;">
        ${challengesHtml}
      </ul>

      <h4 class="modal-section-h4">Enterprise Architecture Specifications</h4>
      <div class="modal-specs-grid">
        ${specsHtml}
      </div>

      <h4 class="modal-section-h4">Regulatory Standards & Compliance</h4>
      <div class="modal-compliance-wrap">
        ${complianceHtml}
      </div>

      <div style="background:rgba(226, 255, 56, 0.1); border:1px solid rgba(226, 255, 56, 0.35); border-radius:12px; padding:1rem 1.25rem; margin-bottom:1.5rem; display:flex; align-items:center; gap:0.75rem;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#e2ff38" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        <span style="font-size:0.88rem; font-weight:600; color:#f8fafc;">${item.sla}</span>
      </div>

      <div class="modal-actions-bar">
        <button type="button" class="btn-modal-cancel" id="btnIndustryModalClose">
          Close
        </button>
        <button type="button" class="btn-nav-quote js-modal-request-blueprint" data-industry-title="${item.title}">
          <span>Request ${item.title} Blueprint</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    `;

    // Hook up buttons inside the dynamic modal
    const closeInnerBtn = document.getElementById('btnIndustryModalClose');
    if (closeInnerBtn) {
      closeInnerBtn.addEventListener('click', closeIndustryModal);
    }

    const requestBlueprintBtn = modalContent.querySelector('.js-modal-request-blueprint');
    if (requestBlueprintBtn) {
      requestBlueprintBtn.addEventListener('click', () => {
        closeIndustryModal();
        if (quoteModal) {
          quoteModal.classList.add('active');
          document.body.style.overflow = 'hidden';
          // Pre-populate service type if field exists
          const serviceSelect = quoteModal.querySelector('select[name="service_type"]');
          if (serviceSelect) {
            // Find option matching or set first
            let matched = false;
            for (let i = 0; i < serviceSelect.options.length; i++) {
              if (serviceSelect.options[i].text.toLowerCase().includes(item.title.toLowerCase().substring(0, 5))) {
                serviceSelect.selectedIndex = i;
                matched = true;
                break;
              }
            }
          }
        }
      });
    }
  }

  // 4. Modal Close Handlers
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeIndustryModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeIndustryModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeIndustryModal();
    }
  });

  function closeIndustryModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

/* ==========================================================================
   13. ENTERPRISE SOLUTIONS HUB FILTER & INSTANT SEARCH (solutions.html)
   ========================================================================== */
function initSolutionsHubFilter() {
  const hubGrid = document.getElementById('solutionsHubGrid');
  if (!hubGrid) return;

  const filterButtons = document.querySelectorAll('#solutionsHubTabs .hub-filter-btn');
  const searchInput = document.getElementById('solutionsHubSearch');
  const cards = Array.from(hubGrid.querySelectorAll('.hub-card'));

  let activeCategory = 'all';
  let searchQuery = '';

  function filterHubCards() {
    const q = searchQuery.trim().toLowerCase();
    cards.forEach((card) => {
      const cat = card.getAttribute('data-hub-category') || '';
      const text = card.textContent.toLowerCase();
      const matchesCat = activeCategory === 'all' || cat === activeCategory;
      const matchesSearch = !q || text.includes(q);

      if (matchesCat && matchesSearch) {
        card.style.display = 'flex';
        card.style.animation = 'fadeInCard 0.3s ease forwards';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-hub-filter') || 'all';
      filterHubCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value || '';
      filterHubCards();
    });
  }
}

/* ==========================================================================
   14. HOME PAGE FAQ ACCORDION (#faqAccordionList)
   ========================================================================== */
function initFaqAccordion() {
  const faqList = document.getElementById('faqAccordionList');
  if (!faqList) return;

  const items = Array.from(faqList.querySelectorAll('.faq-item'));
  items.forEach((item) => {
    const btn = item.querySelector('.faq-question-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      // Close other open items for a clean single-active accordion experience
      items.forEach((other) => {
        other.classList.remove('is-open');
        const otherBtn = other.querySelector('.faq-question-btn');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
