import React, { useRef, useCallback } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

/**
 * FractureOverlay — 3D TRON Derez Effect (Full-Screen)
 * ─────────────────────────────────────────────────────
 * When triggered, captures a DOM element's position, creates a
 * FULLSCREEN Three.js canvas, and shatters the element into
 * uniform 3D cubes that tumble and fall to the bottom of the
 * viewport — like a TRON identity disc derezzing a program.
 *
 * Props:
 *  - theme: 'red' | 'blue'
 *  - onMidpoint: () => void
 *  - onComplete: () => void
 *  - children: (triggerFracture) => ReactNode
 */

const DEPTH_LAYERS = 3;
const DURATION = 1.6;
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

    const cardRect = el.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isBlue = theme === 'blue';

    // ─── UNIFORM CUBE SIZE ───
    // Determine a cube size that divides the card evenly-ish
    const cubeSize = Math.min(cardRect.width, cardRect.height) / 5;
    const COLS = Math.ceil(cardRect.width / cubeSize);
    const ROWS = Math.ceil(cardRect.height / cubeSize);

    // ─── FULLSCREEN THREE.JS SCENE ───
    const scene = new THREE.Scene();
    const aspect = vw / vh;
    const camera = new THREE.PerspectiveCamera(CAM_FOV, aspect, 0.1, 10000);

    // Position camera so the visible area at z=0 matches the full viewport
    const fovRad = (CAM_FOV * Math.PI) / 180;
    const camDist = (vh / 2) / Math.tan(fovRad / 2);
    camera.position.set(0, 0, camDist);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(vw, vh);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Fullscreen overlay canvas
    const canvas = renderer.domElement;
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      pointer-events: none;
    `;
    document.body.appendChild(canvas);

    // ─── COORDINATE MAPPING ───
    // Convert card's screen-space position to Three.js world-space
    // Screen (0,0) = top-left → World (0,0) = center of viewport
    const cardCenterX = cardRect.left + cardRect.width / 2 - vw / 2;
    const cardCenterY = -(cardRect.top + cardRect.height / 2 - vh / 2); // flip Y

    // ─── THEME COLORS ───
    const primaryHex = isBlue ? 0x00EEFC : 0xFF2A2A;
    const edgeHex = isBlue ? 0x00AACC : 0xAA1111;

    // ─── SHARED GEOMETRY (perfect cube) ───
    const cubeGeo = new THREE.BoxGeometry(cubeSize * 0.9, cubeSize * 0.9, cubeSize * 0.9);
    const smallCubeGeo = new THREE.BoxGeometry(cubeSize * 0.75, cubeSize * 0.75, cubeSize * 0.75);
    const edgeGeo = new THREE.EdgesGeometry(cubeGeo);
    const smallEdgeGeo = new THREE.EdgesGeometry(smallCubeGeo);

    const cubes = [];

    // Distance cubes need to fall to exit the bottom of the screen
    const screenBottom = -vh / 2;

    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        for (let d = 0; d < DEPTH_LAYERS; d++) {
          const isFront = d === 0;
          const geo = isFront ? cubeGeo : smallCubeGeo;
          const eGeo = isFront ? edgeGeo : smallEdgeGeo;

          const brightness = 1.0 - d * 0.3;
          const color = new THREE.Color(primaryHex).multiplyScalar(brightness);

          const mat = new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: isFront ? 0.92 : 0.4 - d * 0.1,
          });

          const cube = new THREE.Mesh(geo, mat);

          // Wireframe edges
          const lineMat = new THREE.LineBasicMaterial({
            color: edgeHex,
            transparent: true,
            opacity: isFront ? 0.7 : 0.25,
          });
          cube.add(new THREE.LineSegments(eGeo, lineMat));

          // ─── INITIAL POSITION (card-space → world-space) ───
          const localX = (col - COLS / 2 + 0.5) * cubeSize;
          const localY = (ROWS / 2 - row - 0.5) * cubeSize;
          const worldX = cardCenterX + localX;
          const worldY = cardCenterY + localY;
          const worldZ = -d * cubeSize * 0.65;

          cube.position.set(worldX, worldY, worldZ);

          // ─── PER-CUBE PHYSICS ───
          const fallDistance = worldY - screenBottom + cubeSize * 4; // extra so they exit screen

          cube.userData = {
            origX: worldX,
            origY: worldY,
            origZ: worldZ,
            origOpacity: mat.opacity,
            origEdgeOpacity: lineMat.opacity,
            row, col, depth: d,
            // Horizontal scatter
            velX: (localX / (cardRect.width / 2)) * cardRect.width * (0.1 + Math.random() * 0.2),
            // Forward/back scatter — deeper layers blast forward
            velZ: (Math.random() - 0.2) * cubeSize * 5 + d * cubeSize * 2.5,
            // Gravity — how far to fall
            fallDistance,
            gravity: fallDistance * (2.0 + Math.random() * 0.5),
            // Tumble rotation (radians over full animation)
            rotVelX: (Math.random() - 0.5) * Math.PI * 7,
            rotVelY: (Math.random() - 0.5) * Math.PI * 5,
            rotVelZ: (Math.random() - 0.5) * Math.PI * 6,
            // Stagger: top rows crack first
            delay: (row / ROWS) * 0.15 + (d * 0.03) + Math.random() * 0.06,
            mat,
            lineMat,
          };

          scene.add(cube);
          cubes.push(cube);
        }
      }
    }

    // ─── ANIMATION LOOP ───
    midpointFired.current = false;
    const progress = { value: 0 };

    gsap.to(progress, {
      value: 1,
      duration: DURATION,
      ease: 'none',
      onUpdate: () => {
        const t = progress.value;

        if (!midpointFired.current && t >= 0.4) {
          midpointFired.current = true;
          onMidpoint?.();
        }

        cubes.forEach((cube) => {
          const u = cube.userData;
          const adjustedT = Math.max(0, (t - u.delay) / (1 - u.delay));
          if (adjustedT <= 0) return;

          const crackEnd = 0.12;

          if (adjustedT <= crackEnd) {
            // ── PHASE 1: CRACK — cubes separate, vibrate ──
            const ct = adjustedT / crackEnd;
            const vibrate = Math.sin(ct * Math.PI * 14) * (1 - ct) * 2.5;
            cube.position.x = u.origX + u.velX * 0.015 * ct + vibrate;
            cube.position.y = u.origY + vibrate * 0.6;
            cube.position.z = u.origZ + u.velZ * 0.02 * ct;
          } else {
            // ── PHASE 2: COLLAPSE — gravity fall to bottom of screen ──
            const ft = (adjustedT - crackEnd) / (1 - crackEnd);
            const accel = ft * ft; // quadratic acceleration

            cube.position.x = u.origX + u.velX * ft;
            cube.position.y = u.origY - u.gravity * accel;
            cube.position.z = u.origZ + u.velZ * ft;

            // Tumble
            cube.rotation.x = u.rotVelX * ft;
            cube.rotation.y = u.rotVelY * ft;
            cube.rotation.z = u.rotVelZ * ft;

            // Fade out in last 30%
            if (ft > 0.7) {
              const fade = (ft - 0.7) / 0.3;
              u.mat.opacity = u.origOpacity * (1 - fade);
              u.lineMat.opacity = u.origEdgeOpacity * (1 - fade);
            }

            // ── THEME FX ──
            if (isBlue) {
              // De-rez shrink + white shift
              if (ft > 0.15) {
                const dt = (ft - 0.15) / 0.85;
                const s = Math.max(0.03, 1 - dt * 0.85);
                cube.scale.set(s, s, s);
                u.mat.color.lerp(new THREE.Color(0xFFFFFF), dt * 0.5);
              }
            } else {
              // Glitch flicker in early fall
              if (ft < 0.35) {
                u.mat.opacity = Math.random() > 0.65 ? 0.1 : u.origOpacity;
              }
            }
          }
        });

        renderer.render(scene, camera);
      },
      onComplete: () => {
        canvas.remove();
        cubeGeo.dispose();
        smallCubeGeo.dispose();
        edgeGeo.dispose();
        smallEdgeGeo.dispose();
        cubes.forEach((c) => {
          c.userData.mat.dispose();
          c.userData.lineMat.dispose();
        });
        renderer.dispose();
        isRunning.current = false;
        onComplete?.();
      },
    });

    renderer.render(scene, camera);
  }, [theme, onMidpoint, onComplete]);

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      {typeof children === 'function' ? children(triggerFracture) : children}
    </div>
  );
};

export default FractureOverlay;
