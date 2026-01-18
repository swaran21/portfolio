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

// Camera animation logic - Aggressive Zoom & Smooth Entry
const getCameraPosition = (progress) => {
  if (progress < 15) {
    // Deep space - Start much closer (Was 600)
    const t = progress / 15;
    return new THREE.Vector3(0, 0, 450 - t * 150); // 450 -> 300
  } else if (progress < 30) {
    // Approaching planet
    const t = (progress - 15) / 15;
    return new THREE.Vector3(0, 0, 300 - t * 100); // 300 -> 200
  } else if (progress < 45) {
    // DESCENT / ZOOM IN (30-45)
    // Dive very close to the planet surface (Radius 50)
    // We go from 200 -> 60 (Extremely close!)
    const t = (progress - 30) / 15;
    const angle = t * Math.PI * 0.5; 
    return new THREE.Vector3(
      Math.sin(angle) * 30, 
      50 - t * 40, // Drop: 50 -> 10
      200 - t * 140 // Zoom: 200 -> 60 (Was 100)
    );
  } else if (progress < 70) {
    // Stage 1: SEA RUN (45-70)
    // We teleport back to 350 to give a "Vast Sea" feeling after breaking clouds
    const t = (progress - 45) / 25;
    return new THREE.Vector3(
       Math.sin(t * 10) * 15, 
       15, 
       350 - t * 270 // Fast Fly: 350 -> 80
    );
  } else if (progress < 88) {
    // Stage 2: SIGHTING THE TOWER (70-88)
    const t = (progress - 70) / 18;
    return new THREE.Vector3(
      0, 
      15 + t * 5, 
      80 - t * 40 // 80 -> 40
    );
  } else if (progress < 96) {
    // Stage 3: ASCEND TO OMNITRIX CORE (88-96)
    // Rise to y=60 (Middle Hourglass)
    const t = (progress - 88) / 8;
    const angle = t * Math.PI * 1.5 + Math.PI;
    const radius = 40 - t * 25; 
    return new THREE.Vector3(
      Math.sin(angle) * radius,
      10 + t * 50, // Rise to 60 (Hourglass)
      Math.cos(angle) * radius
    );
  } else {
    // Stage 4: ENTER THE OMNITRIX CORE (96-100)
    // Fly directly into the Hourglass center (0, 60, 0)
    const t = (progress - 96) / 4;
    return new THREE.Vector3(
      0, 
      60 + t * 0, // Stay at 60
      15 - t * 15 // radius 15 -> 0 (Inside)
    );
  }
};

const CameraRig = ({ progress }) => {
  const { camera } = useThree();
  
  useFrame(() => {
    const pos = getCameraPosition(progress);
    camera.position.lerp(pos, 0.1); 
    
    let target = new THREE.Vector3(0, 0, 0);
    
    if (progress > 96) {
       // Core Entry: Look at Hourglass Center
       target.set(0, 60, 0);
    } else if (progress > 88) {
       // Ascent: Look up at Hourglass
       const t = (progress - 88) / 12;
       const lookY = 20 + t * 40; 
       target.set(0, lookY, 0);
    } else if (progress > 70) {
       // ... existing logic ...
    } else if (progress > 45) {
       // Sea Run
       target.set(0, 10, 0);
    } else if (progress > 30) {
       // Descent - look down at planet
       target.set(0, 0, 0); 
    }
    
    camera.lookAt(target);
  });
  
  return null;
};

const GalvanJourney3D = ({ onJourneyComplete }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize smooth scrolling (Item 8: Lenis)
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5, // Slower duration for heavier feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential easing
      smoothWheel: true,
      wheelMultiplier: 1.2, // Slightly faster response
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);

    // Initial scroll handler is fine as Lenis updates window scroll
    return () => {
      lenis.destroy();
    };
  }, []);

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



  const getSceneText = (progress) => {
    if (progress < 15) return 'JOURNEYING TO GALVAN PRIME';
    if (progress < 30) return 'APPROACHING GALVAN PRIME';
    if (progress < 45) return 'ENTERING ORBIT';
    if (progress < 70) return 'ENTERING ATMOSPHERE - SEA SKIM'; 
    if (progress < 88) return 'ASMUTH\'S TOWER SIGHTED'; 
    if (progress < 96) return 'ASCENDING TOWER';
    return 'ENTERING OMNITRIX CORE'; // 96-100
  };

  const cameraPos = getCameraPosition(scrollProgress);

  return (
    <>
      {/* Scrollable spacer */}
      <div style={{ height: '600vh', position: 'relative' }}> {/* Tuned height */}
        
        {/* Fixed 3D scene */}
        <div className="fixed inset-0 z-[10000] bg-black pointer-events-none">
          <Canvas>
            <PerspectiveCamera
              makeDefault
              fov={60}
            />
            
            <CameraRig progress={scrollProgress} />
            
            {/* Lights - Pure Green Atmosphere */}
            <ambientLight intensity={2.0} color="#88ffcc" />
            <pointLight position={[0, 50, 50]} intensity={3} color="#00ff88" distance={300} />
            
            {/* Star field - Fade out when in atmosphere (45%) */}
            <group visible={scrollProgress < 45}>
               <StarField />
            </group>

            {/* Dynamic Atmosphere / Fog - Hides space when entering atmosphere (30+) */}
            {scrollProgress > 30 && ( 
              <fog 
                attach="fog" 
                args={['#001a1a', 10, 250]} 
                color="#001a1a"
              />
            )}
            
            {/* Background Color change for immersion */}
            <color attach="background" args={[scrollProgress > 40 ? '#001a1a' : '#000000']} />
            
            {/* Galvan Prime Planet - Visible until transition (45%) */}
            {scrollProgress < 45 && <GalvanPlanet />}
            
            {/* Green Sea - visible early (45%) */}
            {scrollProgress > 45 && <GreenSea />}
            
            {/* Asmuth's Tower - Delayed visibility to avoid glitch at 45% transition */}
            {scrollProgress > 50 && <AsmuthTower />}
            
            {/* Post-Processing Effects (Item 7: Glow/Bloom) */}
            <EffectComposer>
              <Bloom 
                intensity={1.5} // How strong the glow is
                luminanceThreshold={0.4} // Only glow things bright
                luminanceSmoothing={0.9} // Smooth falloff
                mipmapBlur // Cinematic blur quality
              />
            </EffectComposer>
            
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
