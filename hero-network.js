/**
 * SERENLINK SOLUTIONS - INTERACTIVE MOUSE-REACTIVE NETWORK VECTOR ANIMATION
 * Exact recreation of the reference spider-web & digital connectivity vector mesh.
 * 
 * Features:
 * - Intelligent interconnected node constellation across the hero space
 * - Real-time mouse magnetic attraction with elastic spring dynamics
 * - Dynamic radiant ray hub connecting nearby nodes directly to cursor (reference video style)
 * - Serenlink electric blue (#1d4ed8 / #38bdf8) & cyan (#35C8F4 / #00e5ff) palette
 * - Responsive node density (Desktop, Tablet, Mobile) with touch support
 * - Zero interference with buttons, links, or text (pointer-events: none)
 * - Auto-pause on scroll out-of-view & inactive tab (Battery & CPU friendly)
 * - Respects prefers-reduced-motion
 */

(function () {
  'use strict';

  function initHeroNetwork() {
    const heroSection = document.querySelector('.hero-onramp-section') || document.querySelector('.page-hero-banner') || document.querySelector('.hero-section');
    const canvas = document.getElementById('heroNetworkCanvas');
    if (!heroSection || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Palette & Physics Configuration
    const config = {
      nodeCyan: 'rgba(180, 165, 255, 0.85)', // Soft violet-indigo node
      nodeTeal: 'rgba(215, 225, 255, 0.9)',  // Soft luminous white-blue
      nodeHighlight: '#ffffff',              // White node highlight
      meshLineColor: 'rgba(125, 115, 210, ', // Harmonized indigo mesh lines
      
      // Proximity connection thresholds
      desktopConnectDist: 140,
      tabletConnectDist: 115,
      mobileConnectDist: 90,
      
      // Mouse interaction
      mouseRadius: 185,
      magneticForce: 0.28,             // Elastic pull ratio towards cursor
      
      // Node dimensions
      minRadius: 1.8,
      maxRadius: 3.2,
      activeBloomRadius: 4.8
    };

    let width = 0;
    let height = 0;
    let dpr = 1;
    let particles = [];
    let animationId = null;
    let isVisible = true;
    let isReducedMotion = false;

    // Mouse tracking state
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
      alpha: 0 // Smooth fade transition for cursor ray hub
    };

    // Check prefers-reduced-motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isReducedMotion = true;
    }

    // Adaptive particle count based on screen width
    function getParticleCount() {
      const w = window.innerWidth;
      if (w < 640) return 26;       // Mobile
      if (w < 1024) return 46;      // Tablet
      if (w < 1440) return 76;      // Laptop
      return 92;                    // Large desktop
    }

    function getConnectDistance() {
      const w = window.innerWidth;
      if (w < 640) return config.mobileConnectDist;
      if (w < 1024) return config.tabletConnectDist;
      return config.desktopConnectDist;
    }

    // Particle Class
    class Particle {
      constructor(w, h) {
        this.reset(w, h);
      }

      reset(w, h) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        
        // Elastic displacement offsets
        this.ox = 0;
        this.oy = 0;

        // Subtle, calm floating velocity
        const speed = 0.20 + Math.random() * 0.25;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;

        this.baseRadius = config.minRadius + Math.random() * (config.maxRadius - config.minRadius);
        this.currentRadius = this.baseRadius;
        this.baseAlpha = 0.45 + Math.random() * 0.45;
        this.pulsePhase = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;

        // Color selection matching Serenlink identity
        const rand = Math.random();
        if (rand > 0.8) {
          this.color = config.nodeHighlight;
        } else if (rand > 0.4) {
          this.color = config.nodeCyan;
        } else {
          this.color = config.nodeTeal;
        }
      }

      update(w, h) {
        // Natural ambient floating drift
        if (!isReducedMotion) {
          this.x += this.vx;
          this.y += this.vy;

          // Seamless wrap-around with padding
          const pad = 30;
          if (this.x < -pad) this.x = w + pad;
          else if (this.x > w + pad) this.x = -pad;
          if (this.y < -pad) this.y = h + pad;
          else if (this.y > h + pad) this.y = -pad;
        }

        // Magnetic mouse reaction with elastic spring
        let isTargeted = false;
        if (mouse.alpha > 0.01) {
          const rx = this.x + this.ox;
          const ry = this.y + this.oy;
          const dx = mouse.x - rx;
          const dy = mouse.y - ry;
          const dist = Math.hypot(dx, dy);

          if (dist < config.mouseRadius && dist > 1) {
            isTargeted = true;
            const ratio = 1 - dist / config.mouseRadius;
            // Smooth cubic easing for magnetic pull
            const ease = ratio * ratio * (3 - 2 * ratio);

            // Elastic target displacement
            const targetOx = dx * ease * config.magneticForce * mouse.alpha;
            const targetOy = dy * ease * config.magneticForce * mouse.alpha;

            this.ox += (targetOx - this.ox) * 0.14;
            this.oy += (targetOy - this.oy) * 0.14;

            // Energized node bloom
            const targetRadius = this.baseRadius + (config.activeBloomRadius - this.baseRadius) * ease;
            this.currentRadius += (targetRadius - this.currentRadius) * 0.16;
          }
        }

        if (!isTargeted) {
          // Smooth spring return to resting trajectory
          this.ox += (0 - this.ox) * 0.08;
          this.oy += (0 - this.oy) * 0.08;
          this.currentRadius += (this.baseRadius - this.currentRadius) * 0.08;
        }
      }

      draw(ctx, time) {
        const rx = this.x + this.ox;
        const ry = this.y + this.oy;

        // Subtle breathing luminescence
        const pulse = Math.sin(time * this.pulseSpeed + this.pulsePhase) * 0.15;
        const alpha = Math.min(1, Math.max(0.25, this.baseAlpha + pulse));

        ctx.save();
        ctx.beginPath();
        ctx.arc(rx, ry, Math.max(0.6, this.currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;

        // Radiant glow for larger or active nodes
        if (this.currentRadius > 3.0) {
          ctx.shadowColor = config.nodeTeal;
          ctx.shadowBlur = 12;
        } else {
          ctx.shadowColor = config.nodeCyan;
          ctx.shadowBlur = 5;
        }

        ctx.fill();
        ctx.restore();
      }
    }

    // High-DPI Canvas Resizing
    function resize() {
      const rect = heroSection.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      // Adjust particle count to match viewport
      const desiredCount = getParticleCount();
      if (particles.length === 0) {
        for (let i = 0; i < desiredCount; i++) {
          particles.push(new Particle(width, height));
        }
      } else if (particles.length < desiredCount) {
        while (particles.length < desiredCount) {
          particles.push(new Particle(width, height));
        }
      } else if (particles.length > desiredCount) {
        particles.length = desiredCount;
      }
    }

    // Main 60fps Animation Loop
    function render(timestamp) {
      if (!isVisible) {
        animationId = null;
        return;
      }

      const time = timestamp * 0.06;

      ctx.clearRect(0, 0, width, height);

      // Mouse position smoothing (lerp)
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.18;
        mouse.y += (mouse.targetY - mouse.y) * 0.18;
        mouse.alpha += (1 - mouse.alpha) * 0.12;
      } else {
        mouse.alpha += (0 - mouse.alpha) * 0.08;
      }

      const connectDist = getConnectDistance();
      const pCount = particles.length;

      // 1. Update Particle Positions & Elastic Springs
      for (let i = 0; i < pCount; i++) {
        particles[i].update(width, height);
      }

      // 2. Draw Interconnected Network Mesh Lines (Spider-web structure)
      ctx.lineWidth = 0.85;
      for (let i = 0; i < pCount; i++) {
        const p1 = particles[i];
        const r1x = p1.x + p1.ox;
        const r1y = p1.y + p1.oy;

        for (let j = i + 1; j < pCount; j++) {
          const p2 = particles[j];
          const r2x = p2.x + p2.ox;
          const r2y = p2.y + p2.oy;

          const dx = r2x - r1x;
          const dy = r2y - r1y;
          const dist = Math.hypot(dx, dy);

          if (dist < connectDist) {
            const alpha = (1 - dist / connectDist) * 0.40;
            ctx.strokeStyle = `${config.meshLineColor}${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(r1x, r1y);
            ctx.lineTo(r2x, r2y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw Dynamic Mouse Hub & Radiant Ray Connections (Exact Reference Video Style)
      if (mouse.alpha > 0.01) {
        // Draw radiant vector lines connecting cursor to all nearby nodes
        for (let i = 0; i < pCount; i++) {
          const p = particles[i];
          const rx = p.x + p.ox;
          const ry = p.y + p.oy;
          const dx = mouse.x - rx;
          const dy = mouse.y - ry;
          const dist = Math.hypot(dx, dy);

          if (dist < config.mouseRadius) {
            const ratio = 1 - dist / config.mouseRadius;
            const ease = ratio * ratio * (3 - 2 * ratio);
            const rayAlpha = Math.min(0.95, ease * 0.88 * mouse.alpha);

            ctx.save();
            ctx.lineWidth = 0.9 + ease * 1.1; // Crisp geometric line tapering with distance

            // Luminous dual-stop gradient from cursor hub out to particle
            const grad = ctx.createLinearGradient(mouse.x, mouse.y, rx, ry);
            grad.addColorStop(0, `rgba(255, 255, 255, ${rayAlpha.toFixed(3)})`);
            grad.addColorStop(0.3, `rgba(0, 229, 255, ${rayAlpha.toFixed(3)})`);
            grad.addColorStop(1, `rgba(53, 200, 244, ${(rayAlpha * 0.6).toFixed(3)})`);

            ctx.strokeStyle = grad;
            ctx.shadowColor = config.nodeTeal;
            ctx.shadowBlur = 10 * ease;

            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(rx, ry);
            ctx.stroke();
            ctx.restore();
          }
        }

        // Draw central glowing cursor hub node
        ctx.save();
        const hubAlpha = mouse.alpha;

        // Ambient cyan radial halo
        const haloGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 26);
        haloGrad.addColorStop(0, `rgba(53, 200, 244, ${(0.38 * hubAlpha).toFixed(3)})`);
        haloGrad.addColorStop(0.5, `rgba(0, 229, 255, ${(0.16 * hubAlpha).toFixed(3)})`);
        haloGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 26, 0, Math.PI * 2);
        ctx.fill();

        // High-energy white-cyan core dot
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 14;
        ctx.globalAlpha = hubAlpha;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // 4. Draw Particles (Nodes)
      for (let i = 0; i < pCount; i++) {
        particles[i].draw(ctx, time);
      }

      animationId = requestAnimationFrame(render);
    }

    // Playback state controls
    function start() {
      if (!animationId && isVisible) {
        animationId = requestAnimationFrame(render);
      }
    }

    function stop() {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }

    // Pointer Event Handlers
    function onPointerMove(e) {
      const rect = heroSection.getBoundingClientRect();
      const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : null);
      const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : null);

      if (clientX === null || clientY === null) return;

      mouse.targetX = clientX - rect.left;
      mouse.targetY = clientY - rect.top;

      if (!mouse.active) {
        mouse.x = mouse.targetX;
        mouse.y = mouse.targetY;
      }
      mouse.active = true;
    }

    function onPointerLeave() {
      mouse.active = false;
    }

    // Bind event listeners with passive flags
    heroSection.addEventListener('mousemove', onPointerMove, { passive: true });
    heroSection.addEventListener('mouseleave', onPointerLeave, { passive: true });
    heroSection.addEventListener('touchstart', onPointerMove, { passive: true });
    heroSection.addEventListener('touchmove', onPointerMove, { passive: true });
    heroSection.addEventListener('touchend', onPointerLeave, { passive: true });

    // Window Resize with Debounce
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 100);
    }, { passive: true });

    // IntersectionObserver to suspend canvas when off-screen
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            start();
          } else {
            stop();
          }
        });
      }, { threshold: 0.05 });
      observer.observe(heroSection);
    }

    // Background tab throttling
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        isVisible = false;
        stop();
      } else {
        isVisible = true;
        start();
      }
    });

    // Initialize Canvas
    resize();
    start();
  }

  // Auto-boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroNetwork);
  } else {
    initHeroNetwork();
  }
})();
