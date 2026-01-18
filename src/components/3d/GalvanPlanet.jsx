import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';import planetTexture from '../../images/galvanprimeplanet.png';

const GalvanPlanet = ({ scale = 1 }) => {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, planetTexture);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001;
    }
  });
  
  return (
    <group>
      {/* Planet sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[50 * scale, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive="#00ff88"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Atmospheric glow */}
      <mesh scale={[1.15, 1.15, 1.15]}>
        <sphereGeometry args={[50 * scale, 32, 32]} />
        <meshBasicMaterial
          color="#00ff88"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export default GalvanPlanet;
