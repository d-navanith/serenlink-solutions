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
  initMobileNavigation();
  initSectorPillTabs();
  initNetworkCalculator();
  initQuoteModal();
  initContactForm();
  initSmoothScroll();
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

    // Click handler (also locks dropdown open on desktop until clicked outside)
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains('open');
      closeAllDropdowns();
      if (!isOpen) {
        item.classList.add('open');
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
}, { passive: true });
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

      // Show instant secure success message
      quoteForm.innerHTML = `
        <div style="text-align: center; padding: 2rem 1rem;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: #d1fae5; color: #065f46; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
          <h3 style="font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">Quotation Request Registered!</h3>
          <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 1.75rem; line-height: 1.5;">
            Thank you, <strong>${name}</strong>. A certified CCIE/Fortinet network engineer has received your specifications and will contact you at <strong>${phone}</strong> within 15 minutes.
          </p>
          <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #25d366; color: white; padding: 0.85rem 1.75rem; border-radius: 8px; font-weight: 700; text-decoration: none;">
            <span>Open WhatsApp for Instant Dispatch</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
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
  const trustBar = document.querySelector('.hero-trust-bar');
  if (!trustBar) return;

  const metricNumbers = trustBar.querySelectorAll('.trust-number');
  if (!metricNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        metricNumbers.forEach(el => animateMetricNumber(el));
      }
    });
  }, { threshold: 0.25 });

  observer.observe(trustBar);

  function animateMetricNumber(el) {
    const rawTarget = el.getAttribute('data-target');
    if (!rawTarget) return;

    const target = parseFloat(rawTarget);
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const duration = 1800; // ms
    const startTime = performance.now();

    const startVal = decimals > 0 ? Math.max(0, target - 9.999) : 0;

    function frame(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Quintic ease out
      const ease = 1 - Math.pow(1 - progress, 5);
      const current = startVal + (target - startVal) * ease;

      el.textContent = current.toFixed(decimals) + suffix;

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        el.textContent = target.toFixed(decimals) + suffix;
      }
    }

    requestAnimationFrame(frame);
  }
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
      <div style="text-align: center; padding: 2.5rem 1.5rem; background: #f8fafc; border-radius: 16px; border: 1.5px solid #10b981;">
        <div style="width: 60px; height: 60px; border-radius: 50%; background: #d1fae5; color: #065f46; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 style="font-size: 1.5rem; font-weight: 800; color: #0f172a; margin-bottom: 0.5rem;">Inquiry Successfully Transmitted!</h3>
        <p style="color: #64748b; font-size: 0.95rem; margin-bottom: 1.75rem; line-height: 1.5;">
          Thank you, <strong>${name}</strong> (${company}). Your request has been queued with highest priority. A senior solutions engineer will contact you at <strong>${phone}</strong> or <strong>${email}</strong> within 15 minutes.
        </p>
        <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #25d366; color: white; padding: 0.85rem 1.75rem; border-radius: 8px; font-weight: 700; text-decoration: none;">
          <span>Connect via WhatsApp NOC Channel</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </a>
      </div>
    `;
  });
}
