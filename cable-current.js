/**
 * SERENLINK SOLUTIONS - POWER CURRENT & OPTICAL CABLE HIGHWAY ENGINE
 * Continuous digital current & cable lines flowing from Tier-1 Alliances down to Enterprise Connectivity.
 * 
 * Inspired by the reference animation:
 * - Graceful curved cable tracks with solid & dotted conduits
 * - Luminous power current pulses / energy capsules sliding along the paths
 * - Traveling energy beads and directional current chevrons
 * - Serenlink electric blue, cyan, teal, and signature lime palette
 * - Fixed lightweight viewport canvas with zero off-screen memory waste (60 FPS)
 * - Auto-pauses when out of view or tab is hidden
 * - Respects prefers-reduced-motion
 */

(function () {
  'use strict';

  function initCableHighway() {
    const zone = document.getElementById('cableHighwayZone');
    const canvas = document.getElementById('cableHighwayCanvas');
    if (!zone || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let animationId = null;
    let isVisible = false;
    let isReducedMotion = false;

    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      isReducedMotion = true;
    }

    // Simple, Crisp Highlight Color Palette (Light, clean highlights; No dark colors, No dark green)
    const colors = {
      solidCable: 'rgba(180, 165, 255, 0.25)',    // Ultra-thin subtle violet-silver track
      dottedCable: 'rgba(147, 130, 240, 0.20)',   // Delicate ultra-fine indigo dotted conduit
      cyanHighlight: '#b4a5ff',                   // Soft luminous violet-indigo pulse
      blueHighlight: '#818cf8',                   // Radiant soft royal indigo pulse
      skyHighlight: '#c084fc',                    // Crisp subtle lavender-violet pulse
      limeHighlight: '#d9f99d',                   // Signature SerenLink delicate neon lime spark
      whiteCore: '#ffffff'                        // Pure white micro-bead
    };

    // Control waypoints in normalized zone coordinates: (xRatio, yRatio)
    // yRatio: 0.0 is the top of Tier-1 Alliances, 1.0 is the bottom of Enterprise Connectivity
    const rawTracks = [
      // Track 0: Primary Left Power Cable (Solid)
      {
        type: 'solid',
        waypoints: [
          [0.09, 0.00],
          [0.13, 0.09],
          [0.06, 0.17],
          [0.15, 0.28],
          [0.05, 0.40],
          [0.14, 0.54],
          [0.07, 0.70],
          [0.16, 0.84],
          [0.22, 0.94],
          [0.26, 1.00]
        ]
      },
      // Track 1: Secondary Left Optical Conduit (Dotted)
      {
        type: 'dotted',
        waypoints: [
          [0.07, 0.00],
          [0.10, 0.10],
          [0.04, 0.18],
          [0.12, 0.29],
          [0.03, 0.41],
          [0.11, 0.55],
          [0.05, 0.71],
          [0.13, 0.85],
          [0.19, 0.95],
          [0.23, 1.00]
        ]
      },
      // Track 2: Primary Right High-Speed Optical Trunk (Solid)
      {
        type: 'solid',
        waypoints: [
          [0.91, 0.00],
          [0.87, 0.09],
          [0.94, 0.17],
          [0.85, 0.28],
          [0.95, 0.40],
          [0.86, 0.54],
          [0.93, 0.70],
          [0.84, 0.84],
          [0.78, 0.94],
          [0.74, 1.00]
        ]
      },
      // Track 3: Secondary Right Auxiliary Bus (Dotted)
      {
        type: 'dotted',
        waypoints: [
          [0.93, 0.00],
          [0.90, 0.10],
          [0.96, 0.18],
          [0.88, 0.29],
          [0.97, 0.41],
          [0.89, 0.55],
          [0.95, 0.71],
          [0.87, 0.85],
          [0.81, 0.95],
          [0.77, 1.00]
        ]
      },
      // Track 4: Inter-Tier Data Cross-Link 1 (Upper section gap)
      {
        type: 'solid',
        waypoints: [
          [0.06, 0.17],
          [0.25, 0.16],
          [0.50, 0.19],
          [0.75, 0.16],
          [0.94, 0.17]
        ]
      },
      // Track 5: Mid-Highway Infrastructure Cross-Link 2 (Mid section gap)
      {
        type: 'dotted',
        waypoints: [
          [0.07, 0.70],
          [0.28, 0.69],
          [0.52, 0.72],
          [0.76, 0.69],
          [0.93, 0.70]
        ]
      }
    ];

    // Smooth Spline Interpolation for organic natural curves
    function catmullRomSpline(p0, p1, p2, p3, t) {
      const v0 = (p2 - p0) * 0.5;
      const v1 = (p3 - p1) * 0.5;
      const t2 = t * t;
      const t3 = t * t2;
      return (2 * p1 - 2 * p2 + v0 + v1) * t3 +
             (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 +
             v0 * t + p1;
    }

    // Pre-sample each track into high-resolution point array with arc-length parameterization
    const sampledTracks = [];

    function buildSampledTracks() {
      sampledTracks.length = 0;

      rawTracks.forEach(raw => {
        const wps = raw.waypoints;
        const n = wps.length;
        const densePoints = [];

        // Generate dense points along the spline
        for (let i = 0; i < n - 1; i++) {
          const p0 = wps[Math.max(0, i - 1)];
          const p1 = wps[i];
          const p2 = wps[i + 1];
          const p3 = wps[Math.min(n - 1, i + 2)];

          const steps = 30;
          for (let s = 0; s < steps; s++) {
            const t = s / steps;
            const x = catmullRomSpline(p0[0], p1[0], p2[0], p3[0], t);
            const y = catmullRomSpline(p0[1], p1[1], p2[1], p3[1], t);
            densePoints.push({ x, y });
          }
        }
        densePoints.push({ x: wps[n - 1][0], y: wps[n - 1][1] });

        // Calculate cumulative distances
        let totalLen = 0;
        const cumDist = [0];
        for (let i = 1; i < densePoints.length; i++) {
          const dx = densePoints[i].x - densePoints[i - 1].x;
          const dy = densePoints[i].y - densePoints[i - 1].y;
          totalLen += Math.hypot(dx, dy);
          cumDist.push(totalLen);
        }

        // Evenly resample at normalized steps
        const numSamples = 320;
        const samples = [];
        for (let i = 0; i <= numSamples; i++) {
          const targetDist = (i / numSamples) * totalLen;
          let idx = 0;
          while (idx < cumDist.length - 1 && cumDist[idx + 1] < targetDist) {
            idx++;
          }
          const span = cumDist[idx + 1] - cumDist[idx];
          const fraction = span > 0 ? (targetDist - cumDist[idx]) / span : 0;
          const ptA = densePoints[idx];
          const ptB = densePoints[idx + 1] || ptA;

          const sx = ptA.x + (ptB.x - ptA.x) * fraction;
          const sy = ptA.y + (ptB.y - ptA.y) * fraction;

          // Tangent angle
          let angle = 0;
          if (idx < densePoints.length - 1) {
            angle = Math.atan2(ptB.y - ptA.y, ptB.x - ptA.x);
          }

          samples.push({ x: sx, y: sy, angle });
        }

        sampledTracks.push({
          type: raw.type,
          samples: samples,
          totalLen: totalLen
        });
      });
    }

    buildSampledTracks();

    // Pulse Objects: Moving Thin "Power Current" Capsules & Beads (Simple Highlight Colors)
    const pulses = [
      // Left Solid Bus Pulses
      { trackIdx: 0, progress: 0.05, speed: 0.0018, length: 0.045, color: colors.cyanHighlight, glow: colors.cyanHighlight, hasBead: true },
      { trackIdx: 0, progress: 0.45, speed: 0.0014, length: 0.038, color: colors.limeHighlight, glow: colors.limeHighlight, hasBead: true },
      { trackIdx: 0, progress: 0.80, speed: 0.0020, length: 0.042, color: colors.skyHighlight, glow: colors.skyHighlight, hasBead: false },

      // Left Dotted Conduit Pulses
      { trackIdx: 1, progress: 0.25, speed: 0.0016, length: 0.032, color: colors.skyHighlight, glow: colors.skyHighlight, hasBead: true },
      { trackIdx: 1, progress: 0.68, speed: 0.0019, length: 0.036, color: colors.cyanHighlight, glow: colors.cyanHighlight, hasBead: true },

      // Right Solid Bus Pulses
      { trackIdx: 2, progress: 0.12, speed: 0.0017, length: 0.044, color: colors.limeHighlight, glow: colors.limeHighlight, hasBead: true },
      { trackIdx: 2, progress: 0.52, speed: 0.0015, length: 0.040, color: colors.cyanHighlight, glow: colors.cyanHighlight, hasBead: true },
      { trackIdx: 2, progress: 0.86, speed: 0.0021, length: 0.035, color: colors.blueHighlight, glow: colors.blueHighlight, hasBead: false },

      // Right Dotted Conduit Pulses
      { trackIdx: 3, progress: 0.32, speed: 0.0018, length: 0.030, color: colors.skyHighlight, glow: colors.skyHighlight, hasBead: true },
      { trackIdx: 3, progress: 0.74, speed: 0.0015, length: 0.038, color: colors.limeHighlight, glow: colors.limeHighlight, hasBead: true },

      // Cross-Link 1 Pulse (Upper)
      { trackIdx: 4, progress: 0.15, speed: 0.0022, length: 0.065, color: colors.cyanHighlight, glow: colors.cyanHighlight, hasBead: true },

      // Cross-Link 2 Pulse (Mid)
      { trackIdx: 5, progress: 0.40, speed: 0.0020, length: 0.055, color: colors.blueHighlight, glow: colors.blueHighlight, hasBead: true }
    ];

    // High-DPI Resize
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    // Direction Chevron Drawer (Ultra-thin 1px micro-accent)
    function drawChevron(ctx, x, y, angle, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(-2.2, -1.5);
      ctx.lineTo(1.2, 0);
      ctx.lineTo(-2.2, 1.5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }

    // Terminal Port Node Drawer (Ultra-delicate micro-node)
    function drawTerminalPort(ctx, x, y, labelColor) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(x, y, 2.0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.strokeStyle = labelColor;
      ctx.lineWidth = 0.75;
      ctx.shadowColor = labelColor;
      ctx.shadowBlur = 2;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(x, y, 0.8, 0, Math.PI * 2);
      ctx.fillStyle = labelColor;
      ctx.fill();
      ctx.restore();
    }

    // Main 60fps Render Loop
    function render(timestamp) {
      const zoneRect = zone.getBoundingClientRect();
      const zoneH = zoneRect.height;
      const zoneTop = zoneRect.top;

      // Check if user is scrolled within range of the zone
      const isInRange = (zoneRect.bottom > -40 && zoneTop < height + 40);

      if (!isInRange) {
        if (isVisible) {
          isVisible = false;
          canvas.classList.remove('is-active');
        }
        animationId = requestAnimationFrame(render);
        return;
      }

      if (!isVisible) {
        isVisible = true;
        canvas.classList.add('is-active');
      }

      ctx.clearRect(0, 0, width, height);

      const time = timestamp * 0.002;

      // 1. Draw Cable Tracks
      sampledTracks.forEach((track, tIdx) => {
        const samples = track.samples;
        const total = samples.length;

        ctx.save();
        ctx.beginPath();

        if (track.type === 'dotted') {
          ctx.strokeStyle = colors.dottedCable;
          ctx.lineWidth = 0.45;
          ctx.setLineDash([2, 5]);
        } else {
          ctx.strokeStyle = colors.solidCable;
          ctx.lineWidth = 0.60;
          ctx.setLineDash([]);
        }

        let started = false;
        for (let i = 0; i < total; i++) {
          const s = samples[i];
          const screenX = s.x * width;
          const screenY = zoneTop + s.y * zoneH;

          // Only compute path for points reasonably close to viewport
          if (screenY >= -100 && screenY <= height + 100) {
            if (!started) {
              ctx.moveTo(screenX, screenY);
              started = true;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
        ctx.restore();

        // Direction Chevrons at fixed intervals along main cables
        if (tIdx < 4) {
          const chevronSteps = [0.22, 0.48, 0.78];
          chevronSteps.forEach(stepRatio => {
            const sampleIdx = Math.floor(stepRatio * (total - 1));
            const s = samples[sampleIdx];
            const sx = s.x * width;
            const sy = zoneTop + s.y * zoneH;
            if (sy >= -30 && sy <= height + 30) {
              drawChevron(ctx, sx, sy, s.angle, colors.dottedCable);
            }
          });
        }
      });

      // 2. Draw Terminal Ports at Boundaries
      // Top ports at Tier-1 Alliances (yRatio = 0.0)
      const topP1 = sampledTracks[0].samples[0];
      const topP2 = sampledTracks[2].samples[0];
      const topP1y = zoneTop + topP1.y * zoneH;
      const topP2y = zoneTop + topP2.y * zoneH;

      if (topP1y >= -40 && topP1y <= height + 40) {
        drawTerminalPort(ctx, topP1.x * width, topP1y, colors.cyanHighlight);
      }
      if (topP2y >= -40 && topP2y <= height + 40) {
        drawTerminalPort(ctx, topP2.x * width, topP2y, colors.cyanHighlight);
      }

      // Bottom ports at Enterprise Connectivity CTA (yRatio = 1.0)
      const botP1 = sampledTracks[0].samples[sampledTracks[0].samples.length - 1];
      const botP2 = sampledTracks[2].samples[sampledTracks[2].samples.length - 1];
      const botP1y = zoneTop + botP1.y * zoneH;
      const botP2y = zoneTop + botP2.y * zoneH;

      if (botP1y >= -40 && botP1y <= height + 40) {
        drawTerminalPort(ctx, botP1.x * width, botP1y, colors.skyHighlight);
      }
      if (botP2y >= -40 && botP2y <= height + 40) {
        drawTerminalPort(ctx, botP2.x * width, botP2y, colors.skyHighlight);
      }

      // 3. Update & Draw Moving Power Current Pulses (Reference Video Motion)
      if (!isReducedMotion) {
        pulses.forEach(p => {
          p.progress = (p.progress + p.speed) % 1.0;

          const track = sampledTracks[p.trackIdx];
          const samples = track.samples;
          const total = samples.length;

          const headIdx = Math.floor(p.progress * (total - 1));
          const tailProgress = (p.progress - p.length + 1.0) % 1.0;
          const tailIdx = Math.floor(tailProgress * (total - 1));

          // Draw the ultra-thin glowing current line along the curve
          ctx.save();
          ctx.beginPath();
          ctx.lineWidth = 0.85; // Ultra-thin razor line
          ctx.lineCap = 'round';
          ctx.strokeStyle = p.color;
          ctx.shadowColor = p.glow;
          ctx.shadowBlur = 2.0; // Delicate subtle glow without wide blooming

          let stepCount = Math.max(2, Math.floor(p.length * total));
          let headPt = null;

          for (let s = 0; s <= stepCount; s++) {
            const frac = s / stepCount;
            const curP = (p.progress - p.length * (1 - frac) + 1.0) % 1.0;
            const idx = Math.floor(curP * (total - 1));
            const pt = samples[idx];
            const sx = pt.x * width;
            const sy = zoneTop + pt.y * zoneH;

            if (s === 0) {
              ctx.moveTo(sx, sy);
            } else {
              ctx.lineTo(sx, sy);
            }
            if (s === stepCount) {
              headPt = { sx, sy, angle: pt.angle };
            }
          }
          ctx.stroke();

          // Leading Energy Bead / Dot (Ultra-delicate 1.1px white micro-spark)
          if (p.hasBead && headPt && headPt.sy >= -30 && headPt.sy <= height + 30) {
            ctx.beginPath();
            ctx.arc(headPt.sx, headPt.sy, 1.1, 0, Math.PI * 2);
            ctx.fillStyle = colors.whiteCore;
            ctx.shadowColor = p.glow;
            ctx.shadowBlur = 2.0;
            ctx.fill();
          }

          ctx.restore();
        });
      }

      animationId = requestAnimationFrame(render);
    }

    // Playback state listeners
    function start() {
      if (!animationId) {
        animationId = requestAnimationFrame(render);
      }
    }

    function stop() {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    }

    // Passive resize listener with debounce
    let resizeTimer = null;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
      }, 100);
    }, { passive: true });

    // Background tab throttling
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    });

    // Initialize
    resize();
    start();
  }

  // Auto-boot on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCableHighway);
  } else {
    initCableHighway();
  }
})();
