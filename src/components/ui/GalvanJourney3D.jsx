import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import StarField from '../3d/StarField';
import GalvanPlanet from '../3d/GalvanPlanet';
import GreenSea from '../3d/GreenRiver3D';
import AsmuthTower from '../3d/AsmuthTower';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Lenis from 'lenis';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';

// Camera animation logic
const getCameraPosition = (progress, rotationOffset = 0) => {
  if (progress < 15) {
    // Deep space
    const t = progress / 15;
    return new THREE.Vector3(0, 0, 450 - t * 150); 
  } else if (progress < 30) {
    // Approaching
    const t = (progress - 15) / 15;
    return new THREE.Vector3(0, 0, 300 - t * 100); 
  } else if (progress < 45) {
    // Zoom In
    const t = (progress - 30) / 15;
    const angle = t * Math.PI * 0.5; 
    return new THREE.Vector3(
      Math.sin(angle) * 30, 
      50 - t * 40,
      200 - t * 140
    );
  } else if (progress < 51) {
    // Sea Approach
    const t = (progress - 45) / 6;
    return new THREE.Vector3(
       Math.sin(t * 5) * 10, 
       15, 
       350 - t * 200 
    );
  } else if (progress < 70) {
    // Stage 2: MANUAL ORBIT (51-70) - REQUESTED RANGE
    // Distance/Height controlled by scroll, Angle by USER
    const t = (progress - 51) / 19;
    const dist = 150 - t * 110; // Spiral In Distance
    
    // Use manual rotation offset
    // User can spin 360 freely
    const angle = rotationOffset; 
    
    return new THREE.Vector3(
      Math.sin(angle) * dist, 
      15 + t * 10, 
      Math.cos(angle) * dist
    );
  } else if (progress < 92) {
    // Stage 3: ASCEND
    const t = (progress - 70) / 22;
    // Blend manual rotation into ascent slightly or just reset?
    // Let's keep the manual offset but spiral UP from it?
    // For simplicity, let's lerp back to a standard spiral or just add momentum.
    // Let's just USE the rotationOffset + spiral
    const spiral = t * Math.PI * 1.5;
    const angle = rotationOffset + spiral + Math.PI; 
    const radius = 40 - t * 25; 
    return new THREE.Vector3(
      Math.sin(angle) * radius,
      25 + t * 35, 
      Math.cos(angle) * radius
    );
  } else {
    // Stage 4: ENTER CORE
    const t = (progress - 92) / 8;
    return new THREE.Vector3(0, 60, 15 - t * 15);
  }
};

const CameraRig = ({ progress, rotation }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    const pos = getCameraPosition(progress, rotation);
    camera.position.lerp(pos, 0.1); 
    
    let target = new THREE.Vector3(0, 0, 0);
    if (progress > 92) {
       target.set(0, 60, 0);
    } else if (progress > 70) {
       const t = (progress - 70) / 22;
       target.set(0, 25 + t * 35, 0);
    } else if (progress > 51) {
       target.set(0, 20, 0);
    } else {
       target.set(0, 10, 0);
    }
    camera.lookAt(target);
  });
  return null;
};

const GalvanJourney3D = ({ onJourneyComplete }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [viewRotation, setViewRotation] = useState(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);

  // Manual Rotation Handlers
  const handlePointerDown = (e) => {
    if (scrollProgress >= 51 && scrollProgress < 70) {
      isDragging.current = true;
      lastX.current = e.clientX;
    }
  };

  const handlePointerMove = (e) => {
    if (isDragging.current) {
      const deltaX = e.clientX - lastX.current;
      setViewRotation(prev => prev - deltaX * 0.005); // Adjust sensitivity
      lastX.current = e.clientX;
    }
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    window.addEventListener('pointerup', handlePointerUp);
    return () => window.removeEventListener('pointerup', handlePointerUp);
  }, []);

  // ... (Lenis setup same as before) ...
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.2,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const totalScroll = documentHeight - windowHeight;
      const progress = Math.min(100, (scrollTop / totalScroll) * 100);
      setScrollProgress(progress);
      if (progress >= 100) {
        setTimeout(() => onJourneyComplete(), 1000);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onJourneyComplete]);

  const getSceneText = (progress) => {
    if (progress < 15) return 'JOURNEYING TO GALVAN PRIME';
    if (progress < 30) return 'APPROACHING GALVAN PRIME';
    if (progress < 45) return 'ENTERING ORBIT';
    if (progress < 51) return 'APPROACHING SEA BASE'; 
    if (progress < 70) return 'ORBITING TECH ISLAND - DRAG TO INSPECT'; // Instructions
    if (progress < 92) return 'ASCENDING TO CORE';
    return 'ENTERING OMNITRIX CORE';
  };

  return (
    <>
      <div style={{ height: '600vh', position: 'relative' }}>
        {/* Fixed 3D scene with POINTER EVENTS ENABLED for dragging */}
        <div 
          className="fixed inset-0 z-[10000] bg-black"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerUp}
          style={{ cursor: scrollProgress >= 51 && scrollProgress < 70 ? 'grab' : 'auto' }}
        >
          <Canvas>
            <PerspectiveCamera makeDefault fov={60} />
            <CameraRig progress={scrollProgress} rotation={viewRotation} />
            <ambientLight intensity={2.0} color="#88ffcc" />
            <pointLight position={[0, 50, 50]} intensity={3} color="#00ff88" distance={300} />
            <group visible={scrollProgress < 45}><StarField /></group>
            {scrollProgress > 30 && <fog attach="fog" args={['#001a1a', 10, 250]} color="#001a1a" />}
            <color attach="background" args={[scrollProgress > 40 ? '#001a1a' : '#000000']} />
            {scrollProgress < 45 && <GalvanPlanet />}
            {scrollProgress > 45 && <GreenSea />}
            {scrollProgress > 50 && <AsmuthTower />}
            <EffectComposer>
              <Bloom intensity={1.5} luminanceThreshold={0.4} luminanceSmoothing={0.9} mipmapBlur />
            </EffectComposer>
          </Canvas>

          {/* UI Overlay - Pointer changes */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-green-400 text-3xl font-bold tracking-widest animate-pulse drop-shadow-[0_0_20px_rgba(0,255,136,0.8)]">
                {getSceneText(scrollProgress)}
              </p>
            </div>
            {scrollProgress < 100 && (
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <div className="flex flex-col items-center">
                   {/* ... UI ... */}
                   {scrollProgress >= 51 && scrollProgress < 70 && (
                      <p className="text-green-300 text-xs font-mono mb-1 animate-bounce">
                        &larr; DRAG TO ROTATE &rarr;
                      </p>
                   )}
                   <p className="text-green-400 text-sm font-mono mb-2">SCROLL TO CONTINUE</p>
                   {/* ... Bar ... */}
                   <div className="mt-4 w-64 h-2 bg-green-900/30 rounded-full">
                     <div className="h-full bg-green-500 rounded-full transition-all duration-300" style={{ width: `${scrollProgress}%` }}></div>
                   </div>
                   <p className="text-green-500 text-xs font-mono mt-1">{Math.round(scrollProgress)}%</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GalvanJourney3D;
