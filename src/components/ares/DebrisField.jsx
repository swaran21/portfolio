import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

/**
 * DebrisField — Solid Neon Cube Field (Footer Overlay)
 * ────────────────────────────────────────────────────────
 * Renders ON TOP of the footer (footer stays visible + clickable
 * behind it — the canvas is pointer-events: none).
 *
 * These are SOLID, light-shaded cubes (real 3D blocks with glowing
 * faces + bright TRON edges) — not transparent wireframes. They rest
 * in "home" slots on the footer floor and get a small magnetic nudge
 * when the cursor passes, then spring back. Shattered project cards
 * rain matching cubes into the pile. Hard-capped so the footer never
 * gets more than ~38 cubes.
 */

// ─── PHYSICS / BUDGET TUNING ───
const REPULSE_R = 160;      // cursor influence radius (px)
const PUSH = 105000;        // repulsion strength (falls off with distance)
const SPRING = 26;          // pull back toward home slot
const DAMP = 0.86;          // velocity damping (settle quickly, no orbiting)
const MAX_DRIFT = 58;       // max distance a cube can stray from home (px)
const MAX_CUBES = 38;       // hard cap (user wants ~30–40)
const DEFAULT_COUNT = 30;   // resting pile before any shatter
const BASE_SIZE = 46;       // px — matches the scale of falling debris cubes

const COLORS = {
  red:  { neon: 0xFF2A2A, bright: 0xFF6E5A, core: 0x1a0606 },
  blue: { neon: 0x00EEFC, bright: 0x9CFFFF, core: 0x04171b },
};

// Clamp incoming debris size to keep the pile visually uniform
const sizeFor = (cubeSize) =>
  cubeSize ? Math.max(30, Math.min(cubeSize * 0.8, 54)) : BASE_SIZE;

const buildCube = (sz, palette) => {
  const group = new THREE.Group();
  const geo = new THREE.BoxGeometry(sz, sz, sz);

  // ── Dark translucent glass core (a hologram body, never an opaque fill) ──
  const bodyMat = new THREE.MeshBasicMaterial({
    color: palette.core,
    transparent: true,
    opacity: 0.32,
    depthWrite: false,
  });
  group.add(new THREE.Mesh(geo, bodyMat));

  // ── Laser-thin glowing wireframe rim (additive → lights up the grid) ──
  const edgeMat = new THREE.LineBasicMaterial({
    color: palette.neon,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
  });
  group.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), edgeMat));

  // ── Outer rim-glow shell (slightly larger, faint, additive = box-shadow) ──
  const glowMat = new THREE.LineBasicMaterial({
    color: palette.bright,
    transparent: true,
    opacity: 0.22,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  group.add(new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(sz * 1.14, sz * 1.14, sz * 1.14)),
    glowMat,
  ));

  group.userData = {
    size: sz, bodyMat, edgeMat, glowMat,
    vx: 0, vy: 0,
    avx: 0, avy: 0, avz: 0,
    homeX: 0, homeY: 0,
    phase: Math.random() * Math.PI * 2, // idle bob offset
  };
  group.rotation.set(
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
    Math.random() * Math.PI * 2,
  );
  return group;
};

const disposeCube = (c) => {
  c.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) child.material.dispose();
  });
};

const DebrisField = forwardRef(({ theme = 'red' }, ref) => {
  const containerRef = useRef(null);
  const internals = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const size = { w: container.clientWidth || window.innerWidth, h: container.clientHeight || 300 };

    // ─── SCENE (world units == CSS pixels) ───
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, size.w / size.h, 0.1, 5000);
    const fitCamera = () => {
      camera.aspect = size.w / size.h;
      camera.position.set(0, 0, (size.h / 2) / Math.tan((45 * Math.PI / 180) / 2));
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
    };
    fitCamera();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(size.w, size.h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Wireframe/glass materials are self-lit (additive) — no scene lights needed.
    const cubes = [];
    const mouse = { x: 99999, y: 99999, active: false };
    const state = { theme, raf: 0, prevT: 0 };

    const floorFor = (sz) => -size.h / 2 + 14 + sz / 2;

    // ─── SPAWN / TOP-UP ───
    const spawn = (count, { fromSky = false, cubeSize = null, themeName = state.theme } = {}) => {
      const palette = COLORS[themeName] || COLORS.red;
      const sz = sizeFor(cubeSize);
      for (let i = 0; i < count; i++) {
        // Trim oldest when over budget → stays in the 30–40 range
        if (cubes.length >= MAX_CUBES) {
          const old = cubes.shift();
          scene.remove(old);
          disposeCube(old);
        }
        const cube = buildCube(sz, palette);
        const u = cube.userData;

        u.homeX = (Math.random() - 0.5) * (size.w - sz * 2);
        u.homeY = floorFor(sz) + Math.random() * sz * 0.35;

        if (fromSky) {
          // Rain in from above the footer — spring pulls them into their slot
          cube.position.set(u.homeX + (Math.random() - 0.5) * 120, size.h / 2 + sz + Math.random() * size.h * 0.6, 0);
          u.vy = -120 - Math.random() * 200;
          u.avx = (Math.random() - 0.5) * 6;
          u.avz = (Math.random() - 0.5) * 6;
        } else {
          cube.position.set(u.homeX, u.homeY, 0);
        }
        scene.add(cube);
        cubes.push(cube);
      }
    };

    // Default resting pile so the footer is alive before any shatter
    spawn(DEFAULT_COUNT);

    // ─── MOUSE (window-level; field is pointer-events: none) ───
    const onMouse = (e) => {
      const rect = container.getBoundingClientRect();
      if (e.clientY < rect.top - 60 || e.clientY > rect.bottom + 60 ||
          e.clientX < rect.left || e.clientX > rect.right) {
        mouse.active = false;
        return;
      }
      mouse.active = true;
      mouse.x = e.clientX - rect.left - rect.width / 2;
      mouse.y = -((e.clientY - rect.top) - rect.height / 2);
    };
    const onLeave = () => { mouse.active = false; };

    // Click inside footer = a slightly stronger scatter pop
    const onClick = (e) => {
      const rect = container.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = -((e.clientY - rect.top) - rect.height / 2);
      for (const c of cubes) {
        const dx = c.position.x - cx;
        const dy = c.position.y - cy;
        const d = Math.hypot(dx, dy) || 1;
        if (d < REPULSE_R * 1.4) {
          const p = 260 / (d * 0.08 + 1);
          const u = c.userData;
          u.vx += (dx / d) * p;
          u.vy += (dy / d) * p * 0.7 + 40;
          u.avx += (Math.random() - 0.5) * 8;
          u.avz += (Math.random() - 0.5) * 8;
        }
      }
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('mouseout', onLeave, { passive: true });
    window.addEventListener('click', onClick, { passive: true });

    // ─── PHYSICS LOOP ───
    const loop = (time) => {
      state.raf = requestAnimationFrame(loop);
      const dt = Math.min((time - state.prevT) / 1000, 0.03);
      state.prevT = time;
      if (!dt) { renderer.render(scene, camera); return; }
      const t = time / 1000;

      for (const c of cubes) {
        const u = c.userData;

        // ── Magnetic repulsion: small, smooth falloff nudge ──
        if (mouse.active) {
          const dx = c.position.x - mouse.x;
          const dy = c.position.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < REPULSE_R && dist > 0.5) {
            const fall = 1 - dist / REPULSE_R;        // 0..1 near cursor
            const f = (PUSH / (dist + 40)) * fall * dt;
            u.vx += (dx / dist) * f;
            u.vy += (dy / dist) * f * 0.8;
            // gentle spin from the shove
            u.avz += (dx / dist) * f * 0.05;
            u.avx -= (dy / dist) * f * 0.05;
          }
        }

        // ── Spring back to home slot (idle bob keeps them alive) ──
        const bobY = u.homeY + Math.sin(t * 1.2 + u.phase) * 1.5;
        u.vx += (u.homeX - c.position.x) * SPRING * dt;
        u.vy += (bobY - c.position.y) * SPRING * dt;

        // ── Integrate + damp ──
        u.vx *= DAMP;
        u.vy *= DAMP;
        c.position.x += u.vx * dt;
        c.position.y += u.vy * dt;

        // ── Leash: never stray more than MAX_DRIFT from home ──
        const ox = c.position.x - u.homeX;
        const oy = c.position.y - u.homeY;
        const off = Math.hypot(ox, oy);
        if (off > MAX_DRIFT) {
          const k = MAX_DRIFT / off;
          c.position.x = u.homeX + ox * k;
          c.position.y = u.homeY + oy * k;
        }

        // ── Floor (cubes rest ON the footer, never sink below) ──
        const fl = floorFor(u.size);
        if (c.position.y < fl) { c.position.y = fl; if (u.vy < 0) u.vy *= -0.3; }

        // ── Rotation: shove-spin decays back to a slow ambient drift ──
        u.avx *= 0.93; u.avy *= 0.93; u.avz *= 0.93;
        c.rotation.x += (u.avx + 0.05) * dt;
        c.rotation.y += (u.avy + 0.09) * dt;
        c.rotation.z += u.avz * dt;
      }

      renderer.render(scene, camera);
    };
    state.raf = requestAnimationFrame(loop);

    // ─── RESIZE (footer height can change on breakpoints) ───
    const ro = new ResizeObserver(() => {
      size.w = container.clientWidth || size.w;
      size.h = container.clientHeight || size.h;
      renderer.setSize(size.w, size.h);
      fitCamera();
      // Re-seat homes inside the new bounds
      for (const c of cubes) {
        const u = c.userData;
        u.homeX = Math.max(-size.w / 2 + u.size, Math.min(size.w / 2 - u.size, u.homeX));
        u.homeY = floorFor(u.size) + Math.random() * u.size * 0.35;
      }
    });
    ro.observe(container);

    internals.current = { spawn, cubes, state };

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('mouseout', onLeave);
      window.removeEventListener('click', onClick);
      ro.disconnect();
      cancelAnimationFrame(state.raf);
      cubes.forEach((c) => { scene.remove(c); disposeCube(c); });
      cubes.length = 0;
      renderer.domElement.remove();
      renderer.dispose();
    };
  }, []);

  // Live theme switch: recolor existing cubes + fill light
  useEffect(() => {
    const int = internals.current;
    if (!int) return;
    int.state.theme = theme;
    const palette = COLORS[theme] || COLORS.red;
    for (const c of int.cubes) {
      c.userData.bodyMat.color.setHex(palette.core);
      c.userData.edgeMat.color.setHex(palette.neon);
      c.userData.glowMat.color.setHex(palette.bright);
    }
  }, [theme]);

  // ─── API: shattered cards rain debris into the pile ───
  useImperativeHandle(ref, () => ({
    addDebris: ({ count, cubeSize, theme: themeName }) => {
      internals.current?.spawn(Math.min(count, 12), {
        fromSky: true,
        cubeSize,
        themeName,
      });
    },
  }));

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 1, // sits above the footer's dark bg, BELOW the footer text
      }}
    />
  );
});

DebrisField.displayName = 'DebrisField';
export default DebrisField;
