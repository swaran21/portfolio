import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import DataArchitecture from './DataArchitecture';



/* ─── Floating Particles ─── */
const Particles = ({ theme }) => {
  const particlesRef = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 20 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 20;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      // Instead of mutating the vertex buffer array and forcing a heavy GPU upload every frame
      // (which completely tanks Chrome), we just softly rotate and bob the whole particle system
      const t = clock.getElapsedTime() * 0.1;
      particlesRef.current.rotation.y = t;
      particlesRef.current.position.y = Math.sin(t * 5.0) * 0.5;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color={theme === 'blue' ? '#00eefc' : '#ff4433'} size={0.08} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};



/* ─── Camera Controller (scroll progress + 3D mouse parallax) ─── */
const CameraController = ({ scrollProgress = 0 }) => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const sway = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMove = (e) => {
      // Normalize to -1..1 from screen center
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame(() => {
    const progress = scrollProgress;

    // Ease the sway toward the cursor for a weighty, cinematic drift
    sway.current.x += (mouse.current.x - sway.current.x) * 0.04;
    sway.current.y += (mouse.current.y - sway.current.y) * 0.04;

    // Subtle, slow zoom in instead of flying quickly through the grid
    camera.position.z = 15 - progress * 8;
    camera.position.y = 6 - progress * 1.5 - sway.current.y * 0.8;
    camera.position.x = Math.sin(progress * Math.PI * 0.5) * 1 + sway.current.x * 1.6;
    // Look-at counter-shifts so the whole world tilts in 3D with the cursor
    camera.lookAt(sway.current.x * 4, -sway.current.y * 2, -20);
  });

  return null;
};

/* ─── Main Exportable TronGrid Component ─── */
const TronGrid = ({ scrollProgress = 0, theme = 'red' }) => {
  return (
    <div className="fixed inset-0 -z-40 pointer-events-none">
      <Canvas
        dpr={1} // Force 1x pixel ratio for consistent performance across all browsers
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 6, 15], fov: 60, near: 0.1, far: 200 }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#020202', 5, 80]} />
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 10, 5]} intensity={0.3} color={theme === 'blue' ? '#00eefc' : '#ff4433'} />
        <pointLight position={[0, 5, -10]} intensity={1.5} color={theme === 'blue' ? '#00eefc' : '#ff2200'} distance={40} decay={2} />
        <pointLight position={[-15, 3, -30]} intensity={0.8} color={theme === 'blue' ? '#00eefc' : '#ff0000'} distance={30} decay={2} />

        <CameraController scrollProgress={scrollProgress} />
        <DataArchitecture theme={theme} scrollProgress={scrollProgress} />
        <Particles theme={theme} />
      </Canvas>
    </div>
  );
};

export default TronGrid;
