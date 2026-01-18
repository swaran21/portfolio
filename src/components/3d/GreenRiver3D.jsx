import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GreenSea = () => {
  const seaRef = useRef();
  const time = useRef(0);
  
  // Create large sea geometry - More segments for smoother big waves
  const seaGeometry = new THREE.PlaneGeometry(800, 800, 150, 150);
  
  // Animate waves with more realism and height
  useFrame((state, delta) => {
    if (!seaRef.current) return;
    
    time.current += delta;
    const positions = seaGeometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      
      // BIG Realistic Ocean Waves
      // Low frequency, high amplitude (Swell)
      const swell = Math.sin(x * 0.05 + time.current * 0.8) * 6;
      
      // Medium frequency (Choppiness)
      const chop = Math.cos(y * 0.1 + time.current * 1.2) * 3;
      
      // High frequency (Surface noise)
      const noise = Math.sin((x + y) * 0.3 + time.current * 2) * 1.5;
      
      // Combine them
      const z = swell + chop + noise;
      
      positions.setZ(i, z);
    }
    
    positions.needsUpdate = true;
  });
  
  return (
    <group position={[0, -25, 0]}>
      {/* Animated Sea */}
      <mesh
        ref={seaRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <primitive object={seaGeometry} />
        <meshStandardMaterial
          color="#006644" // Darker deep sea base
          emissive="#00ff88"
          emissiveIntensity={0.4}
          metalness={0.8}
          roughness={0.1} // Shinier water
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Sea glow from below */}
      <pointLight position={[0, -5, 0]} color="#00ff88" intensity={2} distance={200} />
      
      {/* Floating green particles above sea */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh
          key={`seaparticle-${i}`}
          position={[
            (Math.random() - 0.5) * 600,
            Math.random() * 5 + 2,
            (Math.random() - 0.5) * 600
          ]}
        >
          <sphereGeometry args={[0.3, 8, 8]} />
          <meshBasicMaterial
            color="#00ff88"
            transparent
            opacity={0.3 + Math.random() * 0.4}
          />
        </mesh>
      ))}
    </group>
  );
};

export default GreenSea;
