import React, { useRef, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

/**
 * FractureOverlay — 3D TRON Derez Effect
 * ───────────────────────────────────────
 * When triggered, captures a DOM element's bounding box, overlays a
 * Three.js canvas, and shatters the element into a grid of 3D cubes
 * that tumble and fall with gravity — just like a TRON identity disc
 * derezzing a program.
 *
 * Props:
 *  - theme: 'red' | 'blue'
 *  - onMidpoint: () => void   (fires at 50% animation progress)
 *  - onComplete: () => void   (fires when shatter finishes)
 *  - children: (triggerFracture) => ReactNode  (render prop)
 */

const COLS = 8;
const ROWS = 5;
const DEPTH_LAYERS = 3;
const DURATION = 1.4;
const CAM_FOV = 45;

const FractureOverlay = ({ theme = 'red', onMidpoint, onComplete, children }) => {
  const wrapperRef = useRef(null);
  const midpointFired = useRef(false);
  const isRunning = useRef(false);

  const triggerFracture = useCallback((targetEl) => {
    if (isRunning.current) return;
    isRunning.current = true;

    const el = targetEl || wrapperRef.current;
    if (!el) { isRunning.current = false; return; }

    const rect = el.getBoundingClientRect();
    const isBlue = theme === 'blue';

    // ─── THREE.JS SCENE SETUP ───
    const scene = new THREE.Scene();
    const aspect = rect.width / rect.height;
    const camera = new THREE.PerspectiveCamera(CAM_FOV, aspect, 0.1, 5000);

    // Position camera so that the visible area at z=0 matches the card size
    const fovRad = (CAM_FOV * Math.PI) / 180;
    const camDist = (rect.height / 2) / Math.tan(fovRad / 2);
    camera.position.set(0, 0, camDist);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(rect.width, rect.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Overlay the canvas exactly on the card
    const canvas = renderer.domElement;
    canvas.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(canvas);

    // ─── THEME COLORS ───
    const primaryHex = isBlue ? 0x00EEFC : 0xFF2A2A;
    const edgeHex = isBlue ? 0x007788 : 0x881111;
    const glowHex = isBlue ? 0x00EEFC : 0xFF4422;

    // ─── CUBE GRID DIMENSIONS (in world-space pixels) ───
    const blockW = rect.width / COLS;
    const blockH = rect.height / ROWS;
    const blockD = Math.min(blockW, blockH) * 0.5;
    const gap = 0.92; // initial gap factor so cubes form a solid-looking surface

    // Shared geometries for performance
    const frontGeo = new THREE.BoxGeometry(blockW * gap, blockH * gap, blockD * 0.55);
    const backGeo = new THREE.BoxGeometry(blockW * gap * 0.85, blockH * gap * 0.85, blockD * 0.35);
    const edgeFrontGeo = new THREE.EdgesGeometry(frontGeo);
    const edgeBackGeo = new THREE.EdgesGeometry(backGeo);

    const cubes = [];

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        for (let d = 0; d < DEPTH_LAYERS; d++) {
          const isFront = d === 0;
          const geo = isFront ? frontGeo : backGeo;
          const edgeGeo = isFront ? edgeFrontGeo : edgeBackGeo;

          // Slightly dimmer for deeper layers
          const brightness = 1.0 - d * 0.25;
          const color = new THREE.Color(primaryHex).multiplyScalar(brightness);

          const mat = new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: isFront ? 0.92 : 0.45 - d * 0.1,
          });

          const cube = new THREE.Mesh(geo, mat);

          // Wireframe edges for TRON grid-line look
          const lineMat = new THREE.LineBasicMaterial({
            color: edgeHex,
            transparent: true,
            opacity: isFront ? 0.7 : 0.3,
          });
          const wireframe = new THREE.LineSegments(edgeGeo, lineMat);
          cube.add(wireframe);

          // Position: centered grid, deeper layers pushed back
          const x = (col - COLS / 2 + 0.5) * blockW;
          const y = (ROWS / 2 - row - 0.5) * blockH;
          const z = -d * blockD * 0.7;

          cube.position.set(x, y, z);

          // ─── PHYSICS DATA ───
          // Randomized per-cube for organic chaos
          const distFromCenter = Math.sqrt(x * x + y * y);
          const maxDist = Math.sqrt((rect.width / 2) ** 2 + (rect.height / 2) ** 2);
          const normDist = distFromCenter / maxDist;

          cube.userData = {
            origX: x, origY: y, origZ: z,
            origOpacity: mat.opacity,
            origEdgeOpacity: lineMat.opacity,
            row, col, depth: d,
            // Scatter velocities — edges scatter more
            velX: (x / (rect.width / 2)) * rect.width * (0.15 + Math.random() * 0.25),
            velZ: (Math.random() - 0.3) * blockD * 6 + d * blockD * 2, // back layers push forward
            // Gravity fall
            gravity: rect.height * (1.8 + Math.random() * 0.6),
            // Tumble rotation speeds (radians)
            rotVelX: (Math.random() - 0.5) * Math.PI * 6,
            rotVelY: (Math.random() - 0.5) * Math.PI * 4,
            rotVelZ: (Math.random() - 0.5) * Math.PI * 5,
            // Stagger: top rows dismantle first, plus random jitter
            delay: (row / ROWS) * 0.18 + (d * 0.04) + Math.random() * 0.08,
            // Reference to materials for animation
            mat,
            lineMat,
          };

          scene.add(cube);
          cubes.push(cube);
        }
      }
    }

    // ─── ANIMATION ───
    midpointFired.current = false;
    const progress = { value: 0 };

    // Phase 1: "Crack" — cubes separate with small gaps (first 15%)
    // Phase 2: "Collapse" — cubes fall with gravity and tumble (15–100%)

    gsap.to(progress, {
      value: 1,
      duration: DURATION,
      ease: 'none',
      onUpdate: () => {
        const t = progress.value;

        // Fire midpoint callback
        if (!midpointFired.current && t >= 0.45) {
          midpointFired.current = true;
          onMidpoint?.();
        }

        cubes.forEach((cube) => {
          const d = cube.userData;
          const adjustedT = Math.max(0, (t - d.delay) / (1 - d.delay));
          if (adjustedT <= 0) return;

          const crackEnd = 0.15;

          if (adjustedT <= crackEnd) {
            // ── PHASE 1: CRACK / SEPARATE ──
            // Cubes drift apart slightly, vibrate
            const crackT = adjustedT / crackEnd;
            const separateForce = crackT * 1.8;
            const vibrate = Math.sin(crackT * Math.PI * 12) * (1 - crackT) * 2;

            cube.position.x = d.origX + (d.velX * 0.01 * separateForce) + vibrate;
            cube.position.y = d.origY + (vibrate * 0.5);
            cube.position.z = d.origZ + (d.velZ * 0.02 * separateForce);

          } else {
            // ── PHASE 2: COLLAPSE / FALL ──
            const fallT = (adjustedT - crackEnd) / (1 - crackEnd);
            const easedFall = fallT * fallT; // quadratic for acceleration feel

            // Gravity pull downward
            cube.position.x = d.origX + d.velX * fallT;
            cube.position.y = d.origY - d.gravity * easedFall;
            cube.position.z = d.origZ + d.velZ * fallT;

            // Tumble rotation
            cube.rotation.x = d.rotVelX * fallT;
            cube.rotation.y = d.rotVelY * fallT;
            cube.rotation.z = d.rotVelZ * fallT;

            // Fade out in the last 40%
            if (fallT > 0.6) {
              const fadeT = (fallT - 0.6) / 0.4;
              d.mat.opacity = d.origOpacity * (1 - fadeT);
              d.lineMat.opacity = d.origEdgeOpacity * (1 - fadeT);
            }

            // ── THEME-SPECIFIC FX ──
            if (isBlue) {
              // De-rez: shrink to zero while shifting white
              if (fallT > 0.2) {
                const derezT = (fallT - 0.2) / 0.8;
                const s = Math.max(0.05, 1 - derezT * 0.9);
                cube.scale.set(s, s, s);
                d.mat.color.lerp(new THREE.Color(0xFFFFFF), derezT * 0.6);
              }
            } else {
              // Glitch: random opacity flicker during early fall
              if (fallT < 0.4) {
                const flicker = Math.random() > 0.7 ? 0.15 : d.origOpacity;
                d.mat.opacity = flicker;
              }
            }
          }
        });

        renderer.render(scene, camera);
      },
      onComplete: () => {
        // ─── CLEANUP ───
        canvas.remove();
        frontGeo.dispose();
        backGeo.dispose();
        edgeFrontGeo.dispose();
        edgeBackGeo.dispose();
        cubes.forEach((c) => {
          c.userData.mat.dispose();
          c.userData.lineMat.dispose();
        });
        renderer.dispose();
        isRunning.current = false;
        onComplete?.();
      },
    });

    // Render the initial frame (cubes in place, forming the "solid" card)
    renderer.render(scene, camera);

  }, [theme, onMidpoint, onComplete]);

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      {typeof children === 'function' ? children(triggerFracture) : children}
    </div>
  );
};

export default FractureOverlay;
