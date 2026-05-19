import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import * as THREE from 'three';

const CANVAS_H = 90;
const REPULSION_R = 140;
const REPULSION_F = 18000;
const DAMPING = 0.93;
const GRAVITY = 250;

const DebrisField = forwardRef((_, ref) => {
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const cubesRef = useRef([]);
  const mouseRef = useRef({ x: 9999, y: 9999 });
  const animRef = useRef(null);
  const canvasRef = useRef(null);
  const prevTime = useRef(0);
  const geoCache = useRef({ geo: null, edgeGeo: null });

  useEffect(() => {
    const vw = window.innerWidth;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, vw / CANVAS_H, 0.1, 5000);
    const camDist = (CANVAS_H / 2) / Math.tan((45 * Math.PI / 180) / 2);
    camera.position.set(0, 0, camDist);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(vw, CANVAS_H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.cssText = `position:fixed;bottom:0;left:0;width:100%;height:${CANVAS_H}px;z-index:40;pointer-events:none;`;
    document.body.appendChild(canvas);

    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    canvasRef.current = canvas;

    const onMouse = (e) => {
      const vh = window.innerHeight;
      mouseRef.current = {
        x: e.clientX - window.innerWidth / 2,
        y: vh - 40 - e.clientY,
      };
    };
    window.addEventListener('mousemove', onMouse);

    const loop = (time) => {
      animRef.current = requestAnimationFrame(loop);
      if (cubesRef.current.length === 0) { renderer.render(scene, camera); return; }
      const dt = Math.min((time - prevTime.current) / 1000, 0.04);
      prevTime.current = time;
      const floorY = -CANVAS_H / 2 + 6;
      const halfW = window.innerWidth / 2 - 15;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      cubesRef.current.forEach((c) => {
        const u = c.userData;
        const dx = c.position.x - mx;
        const dy = c.position.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPULSION_R && dist > 1) {
          const f = REPULSION_F / (dist * dist);
          u.vx += (dx / dist) * f * dt;
          u.vy += (dy / dist) * f * dt;
        }
        u.vy -= GRAVITY * dt;
        c.position.x += u.vx * dt;
        c.position.y += u.vy * dt;
        if (c.position.y < floorY) { c.position.y = floorY; u.vy = Math.abs(u.vy) * 0.15; }
        if (c.position.x > halfW) { c.position.x = halfW; u.vx = -Math.abs(u.vx) * 0.4; }
        if (c.position.x < -halfW) { c.position.x = -halfW; u.vx = Math.abs(u.vx) * 0.4; }
        u.vx *= DAMPING;
        u.vy *= DAMPING;
        c.rotation.z += u.vx * dt * 0.008;
        c.rotation.x += u.vy * dt * 0.008;
      });
      renderer.render(scene, camera);
    };
    animRef.current = requestAnimationFrame(loop);

    const onResize = () => {
      const w = window.innerWidth;
      camera.aspect = w / CANVAS_H;
      camera.updateProjectionMatrix();
      renderer.setSize(w, CANVAS_H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animRef.current);
      canvas.remove();
      renderer.dispose();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    addDebris: ({ count, cubeSize, theme }) => {
      const scene = sceneRef.current;
      if (!scene) return;
      // Clear old debris
      cubesRef.current.forEach((c) => {
        scene.remove(c);
        c.material.dispose();
        if (c.children[0]) c.children[0].material.dispose();
      });
      cubesRef.current = [];
      if (geoCache.current.geo) { geoCache.current.geo.dispose(); geoCache.current.edgeGeo.dispose(); }

      const isBlue = theme === 'blue';
      const hex = isBlue ? 0x00EEFC : 0xFF2A2A;
      const edgeHex = isBlue ? 0x00AACC : 0xAA1111;
      const sz = Math.min(cubeSize, 22);
      const geo = new THREE.BoxGeometry(sz * 0.9, sz * 0.9, sz * 0.9);
      const eGeo = new THREE.EdgesGeometry(geo);
      geoCache.current = { geo, edgeGeo: eGeo };
      const vw = window.innerWidth;
      const floorY = -CANVAS_H / 2 + 6;
      const num = Math.min(count, 50);

      for (let i = 0; i < num; i++) {
        const mat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(hex).multiplyScalar(0.5 + Math.random() * 0.5),
          transparent: true, opacity: 0.65 + Math.random() * 0.3,
        });
        const cube = new THREE.Mesh(geo, mat);
        const lMat = new THREE.LineBasicMaterial({ color: edgeHex, transparent: true, opacity: 0.45 });
        cube.add(new THREE.LineSegments(eGeo, lMat));
        cube.position.set((Math.random() - 0.5) * vw * 0.85, floorY + Math.random() * 8, (Math.random() - 0.5) * sz * 2);
        cube.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        cube.userData = { vx: 0, vy: 0 };
        scene.add(cube);
        cubesRef.current.push(cube);
      }
    },
  }));

  return null;
});

DebrisField.displayName = 'DebrisField';
export default DebrisField;
