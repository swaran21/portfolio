import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

/**
 * DebrisField — Cyberpunk Neon Cube Debris
 * ─────────────────────────────────────────
 * Glowing wireframe cubes with dark faces.
 * Light emits from edges. Fast, punchy mouse repulsion.
 * Sits in document flow at the footer.
 */

const FIELD_H = 120;
const REPULSE_R = 220;
const DAMPING = 0.92;
const GRAV = 900;
const BOUNCE = 0.35;

const DebrisField = forwardRef((_, ref) => {
  const containerRef = useRef(null);
  const internals = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const vw = container.clientWidth || window.innerWidth;

    // ─── SCENE ───
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, vw / FIELD_H, 0.1, 3000);
    const camDist = (FIELD_H / 2) / Math.tan((50 * Math.PI / 180) / 2);
    camera.position.set(0, 30, camDist * 0.95);
    camera.lookAt(0, -10, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(vw, FIELD_H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Subtle ambient — keep it dark so edge glow pops
    scene.add(new THREE.AmbientLight(0x111111, 0.5));

    const cubes = [];
    const mouse = { x: 99999, y: 99999, prevX: 99999, prevY: 99999, vx: 0, vy: 0 };
    let prevT = 0;
    let raf = 0;
    // Theme-colored point light (updated on addDebris)
    const glowLight = new THREE.PointLight(0xFF2A2A, 2.0, 600);
    glowLight.position.set(0, 40, 120);
    scene.add(glowLight);

    // ─── MOUSE TRACKING (with velocity) ───
    const onMouse = (e) => {
      const rect = container.getBoundingClientRect();
      if (e.clientY < rect.top - 80 || e.clientY > rect.bottom + 40) {
        mouse.x = 99999; mouse.y = 99999;
        return;
      }
      const nx = e.clientX - rect.left - rect.width / 2;
      const ny = -((e.clientY - rect.top) - FIELD_H / 2);
      mouse.vx = nx - mouse.x;
      mouse.vy = ny - mouse.y;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = nx;
      mouse.y = ny;
    };

    const onClick = (e) => {
      const rect = container.getBoundingClientRect();
      if (e.clientY < rect.top - 20 || e.clientY > rect.bottom + 20) return;
      const cx = e.clientX - rect.left - rect.width / 2;
      const cy = -((e.clientY - rect.top) - FIELD_H / 2);
      // Explosion impulse on click
      for (let i = 0; i < cubes.length; i++) {
        const c = cubes[i];
        const u = c.userData;
        const dx = c.position.x - cx;
        const dy = c.position.y - cy;
        const d = Math.sqrt(dx * dx + dy * dy) || 1;
        if (d < REPULSE_R * 1.5) {
          const power = 800 / (d * 0.3 + 1);
          u.vx += (dx / d) * power;
          u.vy += (dy / d) * power + 150;
          u.avx += (Math.random() - 0.5) * 20;
          u.avz += (Math.random() - 0.5) * 20;
        }
      }
    };

    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('click', onClick, { passive: true });

    // ─── PHYSICS LOOP ───
    const floorY = -FIELD_H / 2 + 10;

    const loop = (time) => {
      raf = requestAnimationFrame(loop);
      if (cubes.length === 0) { renderer.render(scene, camera); return; }
      const dt = Math.min((time - prevT) / 1000, 0.025);
      prevT = time;
      const halfW = vw / 2 - 10;

      // Mouse speed for directional push
      const mSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

      for (let i = 0; i < cubes.length; i++) {
        const c = cubes[i];
        const u = c.userData;

        // ── Repulsion ──
        const dx = c.position.x - mouse.x;
        const dy = c.position.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        const dist = Math.sqrt(d2);

        if (dist < REPULSE_R && dist > 0.5) {
          const nx = dx / dist;
          const ny = dy / dist;
          // Inverse-distance force (not inverse-square — feels snappier at range)
          const basePush = 120000 / (dist * 2 + 10);
          // Boost from mouse velocity
          const speedBoost = Math.min(mSpeed * 15, 600);
          const totalF = (basePush + speedBoost) * dt;

          u.vx += nx * totalF;
          u.vy += ny * totalF;
          // Spin from impact
          u.avz += nx * totalF * 0.06;
          u.avx -= ny * totalF * 0.06;
        }

        // ── Gravity ──
        u.vy -= GRAV * dt;

        // ── Integrate ──
        c.position.x += u.vx * dt;
        c.position.y += u.vy * dt;

        // ── Floor ──
        if (c.position.y <= floorY) {
          c.position.y = floorY;
          if (u.vy < -20) {
            u.vy = -u.vy * BOUNCE;
          } else {
            u.vy = 0;
          }
          u.vx *= 0.8; // floor friction
          u.avz *= 0.85;
        }

        // ── Walls ──
        if (c.position.x > halfW) { c.position.x = halfW; u.vx = -Math.abs(u.vx) * 0.6; }
        if (c.position.x < -halfW) { c.position.x = -halfW; u.vx = Math.abs(u.vx) * 0.6; }

        // ── Damping ──
        u.vx *= DAMPING;
        u.vy *= (c.position.y <= floorY + 1) ? 0.98 : DAMPING;
        u.avx *= 0.95;
        u.avy *= 0.95;
        u.avz *= 0.95;

        // ── Rotation ──
        c.rotation.x += u.avx * dt;
        c.rotation.y += u.avy * dt;
        c.rotation.z += u.avz * dt;
      }

      renderer.render(scene, camera);
    };

    raf = requestAnimationFrame(loop);

    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      camera.aspect = w / FIELD_H;
      camera.updateProjectionMatrix();
      renderer.setSize(w, FIELD_H);
    };
    window.addEventListener('resize', onResize);

    internals.current = { scene, cubes, glowLight };

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      renderer.domElement.remove();
      renderer.dispose();
    };
  }, []);

  // ─── API ───
  useImperativeHandle(ref, () => ({
    addDebris: ({ count, cubeSize, theme }) => {
      const int = internals.current;
      if (!int) return;
      const { scene, cubes, glowLight } = int;

      // Clear previous
      while (cubes.length) {
        const c = cubes.pop();
        scene.remove(c);
        c.traverse((child) => {
          if (child.geometry) child.geometry.dispose();
          if (child.material) child.material.dispose();
        });
      }

      const isBlue = theme === 'blue';
      const neonHex = isBlue ? 0x00EEFC : 0xFF2A2A;
      const neonBright = isBlue ? 0x66FFFF : 0xFF6655;
      const glowHex = isBlue ? 0x004455 : 0x441111;

      glowLight.color.setHex(neonHex);

      const sz = Math.min(cubeSize * 0.55, 16);
      const num = Math.min(count, 50);
      const vw = containerRef.current?.clientWidth || window.innerWidth;
      const floorY = -FIELD_H / 2 + 10;

      for (let i = 0; i < num; i++) {
        const group = new THREE.Group();

        // ── DARK BODY (barely visible, lets edges dominate) ──
        const bodyGeo = new THREE.BoxGeometry(sz, sz, sz);
        const bodyMat = new THREE.MeshBasicMaterial({
          color: 0x080808,
          transparent: true,
          opacity: 0.6,
        });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        group.add(body);

        // ── BRIGHT NEON EDGES (primary glow) ──
        const edgeGeo = new THREE.EdgesGeometry(bodyGeo);
        const edgeMat = new THREE.LineBasicMaterial({
          color: neonHex,
          linewidth: 1,
          transparent: true,
          opacity: 0.95,
        });
        group.add(new THREE.LineSegments(edgeGeo, edgeMat));

        // ── OUTER GLOW EDGES (slightly larger, faded — bloom effect) ──
        const glowGeo = new THREE.EdgesGeometry(
          new THREE.BoxGeometry(sz * 1.06, sz * 1.06, sz * 1.06)
        );
        const glowMat = new THREE.LineBasicMaterial({
          color: neonBright,
          transparent: true,
          opacity: 0.25,
        });
        group.add(new THREE.LineSegments(glowGeo, glowMat));

        // ── INNER EMISSIVE CORE (tiny cube inside for depth) ──
        const coreGeo = new THREE.BoxGeometry(sz * 0.35, sz * 0.35, sz * 0.35);
        const coreMat = new THREE.MeshBasicMaterial({
          color: neonHex,
          transparent: true,
          opacity: 0.15,
        });
        group.add(new THREE.Mesh(coreGeo, coreMat));

        // Scatter
        group.position.set(
          (Math.random() - 0.5) * vw * 0.85,
          floorY + Math.random() * sz * 0.3,
          (Math.random() - 0.5) * sz * 2,
        );
        group.rotation.set(
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
        );

        group.userData = { vx: 0, vy: 0, avx: 0, avy: 0, avz: 0 };
        scene.add(group);
        cubes.push(group);
      }
    },
  }));

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: `${FIELD_H}px`,
        overflow: 'visible',
        pointerEvents: 'none',
        marginTop: '-6px',
        zIndex: 10,
      }}
    />
  );
});

DebrisField.displayName = 'DebrisField';
export default DebrisField;
