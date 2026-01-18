import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import StarField from '../3d/StarField';
import GalvanPlanet from '../3d/GalvanPlanet';
import * as THREE from 'three';

const GalvanJourney3D = ({ onJourneyComplete }) => {
  const cameraRef = useRef();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      
      const totalScroll = documentHeight - windowHeight;
      const progress = Math.min(100, (scrollTop / totalScroll) * 100);
      
      setScrollProgress(progress);

      // Complete journey at 100%
      if (progress >= 100) {
        setTimeout(() => {
          onJourneyComplete();
        }, 1000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onJourneyComplete]);

  // Camera animation based on scroll
  const getCameraPosition = (progress) => {
    if (progress < 25) {
      // Deep space - far away
      const t = progress / 25;
      return new THREE.Vector3(0, 0, 500 - t * 200);
    } else if (progress < 50) {
      // Approaching planet
      const t = (progress - 25) / 25;
      return new THREE.Vector3(0, 0, 300 - t * 180);
    } else if (progress < 75) {
      // Getting closer
      const t = (progress - 50) / 25;
      return new THREE.Vector3(0, 20 * t, 120 - t * 50);
    } else {
      // Final approach
      const t = (progress - 75) / 25;
      return new THREE.Vector3(0, 20 + t * 10, 70 - t * 40);
    }
  };

  const getSceneText = (progress) => {
    if (progress < 25) return 'JOURNEYING TO GALVAN PRIME';
    if (progress < 50) return 'APPROACHING GALVAN PRIME';
    if (progress < 75) return 'ENTERING ORBIT';
    return 'DESCENDING TO SURFACE';
  };

  const cameraPos = getCameraPosition(scrollProgress);

  return (
    <>
      {/* Scrollable spacer */}
      <div style={{ height: '500vh', position: 'relative' }}>
        
        {/* Fixed 3D scene */}
        <div className="fixed inset-0 z-[10000] bg-black pointer-events-none">
          <Canvas>
            <PerspectiveCamera
              ref={cameraRef}
              makeDefault
              position={[cameraPos.x, cameraPos.y, cameraPos.z]}
              fov={60}
            />
            
            {/* Lights */}
            <ambientLight intensity={0.3} />
            <directionalLight position={[100, 100, 100]} intensity={1} color="#ffffff" />
            <pointLight position={[0, 0, 0]} intensity={2} color="#00ff88" distance={200} />
            
            {/* Star field */}
            <StarField />
            
            {/* Galvan Prime Planet */}
            <GalvanPlanet />
            
          </Canvas>

          {/* UI Overlay */}
          <div className="absolute inset-0">
            {/* Scene text */}
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-green-400 text-3xl font-bold tracking-widest animate-pulse drop-shadow-[0_0_20px_rgba(0,255,136,0.8)]">
                {getSceneText(scrollProgress)}
              </p>
            </div>

            {/* Progress indicator */}
            {scrollProgress < 100 && (
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
                <div className="flex flex-col items-center">
                  <p className="text-green-400 text-sm font-mono mb-2">SCROLL TO CONTINUE</p>
                  <svg className="w-6 h-6 text-green-400 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  <div className="mt-4 w-64 h-2 bg-green-900/30 rounded-full">
                    <div 
                      className="h-full bg-green-500 rounded-full transition-all duration-300"
                      style={{ width: `${scrollProgress}%` }}
                    ></div>
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
