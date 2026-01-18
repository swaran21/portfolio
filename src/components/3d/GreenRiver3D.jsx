import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const GreenSea = () => {
  const seaRef = useRef();
  const time = useRef(0);
  
  // Create large sea geometry
  const seaGeometry = new THREE.PlaneGeometry(800, 800, 100, 100);
  
  // Animate waves
  useFrame((state, delta) => {
    if (!seaRef.current) return;
    
    time.current += delta;
    const positions = seaGeometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      
      // Create ocean wave pattern
      const wave1 = Math.sin(x * 0.01 + time.current * 0.5) * 3;
      const wave2 = Math.sin(y * 0.01 + time.current * 0.3) * 2;
      const wave3 = Math.sin((x + y) * 0.02 + time.current) * 1.5;
      const z = wave1 + wave2 + wave3;
      
      positions.setZ(i, z);
    }
    
    positions.needsUpdate = true;
  });
  
  return (
    <group position={[0, -20, 0]}>
      {/* Animated Sea */}
      <mesh
        ref={seaRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
      >
        <primitive object={seaGeometry} />
        <meshStandardMaterial
          color="#00cc77"
          emissive="#00ff88"
          emissiveIntensity={0.6}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.85}
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
