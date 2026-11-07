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

  navItems.forEach(item => {
    const trigger = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.dropdown-menu');

    if (!trigger || !dropdown) return;

    // Desktop hover & click handler
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1080) {
        closeAllDropdowns();
        item.classList.add('open');
      }
    });

    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 1080) {
        item.classList.remove('open');
      }
    });

    trigger.addEventListener('click', (e) => {
      // If mobile or clicked
      if (window.innerWidth <= 1080 || e.pointerType === 'touch') {
        e.preventDefault();
        const isOpen = item.classList.contains('open');
        closeAllDropdowns();
        if (!isOpen) {
          item.classList.add('open');
        }
      }
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-item.has-dropdown')) {
      closeAllDropdowns();
    }
  });

  function closeAllDropdowns() {
    document.querySelectorAll('.nav-item.has-dropdown.open').forEach(el => {
      el.classList.remove('open');
    });
  }

  // Header background on scroll
  const header = document.querySelector('.main-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }
}

/* ==========================================================================
   3. MOBILE NAVIGATION DRAWER
   ========================================================================== */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileNavToggle');
  const navMenu = document.getElementById('navMenu');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isVisible = navMenu.style.display === 'flex';
    if (isVisible) {
      navMenu.style.display = 'none';
    } else {
      navMenu.style.display = 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = '#040d21';
      navMenu.style.padding = '1.5rem';
      navMenu.style.borderBottom = '1px solid rgba(255, 255, 255, 0.15)';
      navMenu.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.4)';
    }
  });
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

  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = quoteForm.querySelector('[name="client_name"]').value;
      const company = quoteForm.querySelector('[name="company_name"]').value;
      const phone = quoteForm.querySelector('[name="phone"]').value;
      const service = quoteForm.querySelector('[name="service_type"]').value;

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

      // Show instant success message
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

  // Comprehensive selector list covering homepage and all 5 subpages
  const revealSelectors = [
    // Section headers & titles
    '.section-tag',
    '.detail-badge',
    '.section-title',
    '.section-desc',
    '.page-hero-banner h1',
    '.page-hero-banner p',
    '.section-fade-divider',
    // Cards, grids & grouped content
    '.expect-card',
    '.solution-overview-card',
    '.partner-box',
    '.stat-card',
    '.sector-blueprint-card',
    '.coverage-summary-card',
    '.calculator-card',
    '.calc-step',
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
    '.sol-detail-block'
  ];

  const elements = document.querySelectorAll(revealSelectors.join(', '));
  if (!elements.length) return;

  // If user requested reduced motion, reveal everything immediately without animations
  if (prefersReducedMotion) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  // Group elements by parent to calculate natural 80-100ms stagger delays
  elements.forEach(el => {
    el.classList.add('reveal-init');

    const parent = el.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(child => {
        return child.matches && child.matches(revealSelectors.join(', '));
      });
      const childIndex = siblings.indexOf(el);
      if (childIndex > 0) {
        // Stagger delay between 80ms and 100ms per child (capped at 5 to prevent long chains)
        const delay = (childIndex % 5) * 0.09;
        el.style.transitionDelay = `${delay.toFixed(2)}s`;
      }
    }
  });

  // IntersectionObserver with threshold: 0.15 and bottom rootMargin of -40px
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        // Unobserve once revealed to eliminate scroll event overhead
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}
