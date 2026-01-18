import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const AsmuthTower = () => {
  const topSphereRef = useRef();

  useFrame((state) => {
    if (topSphereRef.current) {
      // Subtle pulse effect for the top sphere
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      topSphereRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, -20, 0]}>
      {/* Base Platform - Wide and sturdy */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[25, 35, 10, 8]} />
        <meshStandardMaterial
          color="#05261c"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Main Tower Shaft - Tapered slightly */}
      <mesh position={[0, 40, 0]}>
        <cylinderGeometry args={[14, 18, 80, 8]} />
        <meshStandardMaterial
          color="#0a3d2e"
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Glow Rings / Balconies */}
      {[25, 45, 65].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          {/* Physical Ring */}
          <mesh>
            <cylinderGeometry args={[16 + (2-i), 16 + (2-i), 2, 8]} />
            <meshStandardMaterial color="#0d4d3a" />
          </mesh>
          {/* Glowing band */}
          <mesh scale={[1.05, 0.5, 1.05]}>
            <cylinderGeometry args={[16 + (2-i), 16 + (2-i), 2, 8]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}

      {/* Observation Deck / Top Structure */}
      <group position={[0, 80, 0]}>
        {/* Conical Underside */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[22, 14, 8, 8]} />
          <meshStandardMaterial color="#05261c" />
        </mesh>

        {/* Main Deck Ring */}
        <mesh position={[0, 5, 0]}>
          <cylinderGeometry args={[22, 22, 4, 8]} />
          <meshStandardMaterial color="#0a3d2e" />
        </mesh>
        
        {/* Glowing Windows on Deck */}
        <mesh position={[0, 5, 0]} rotation={[0, Math.PI/8, 0]}>
           <cylinderGeometry args={[22.2, 22.2, 2, 8]} />
           <meshBasicMaterial color="#00ff88" opacity={0.8} transparent side={THREE.DoubleSide} />
        </mesh>

        {/* Conical Roof */}
        <mesh position={[0, 15, 0]}>
          <coneGeometry args={[24, 16, 8]} />
          <meshStandardMaterial color="#05261c" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* The Great Sphere (Asmuth's Lab/Brain) */}
      <mesh ref={topSphereRef} position={[0, 102, 0]}>
        <sphereGeometry args={[12, 32, 32]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00aaa0"
          emissiveIntensity={0.8}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>

      {/* Floating Rings around Sphere */}
      <group position={[0, 102, 0]} rotation={[0.2, 0, 0.1]}>
         <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[16, 0.5, 16, 100]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.4} />
         </mesh>
      </group>
      <group position={[0, 102, 0]} rotation={[-0.2, 0, -0.1]}>
         <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[18, 0.5, 16, 100]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.3} />
         </mesh>
      </group>

      {/* Top Antenna/Needle */}
      <mesh position={[0, 118, 0]}>
        <cylinderGeometry args={[0.5, 2, 10, 8]} />
        <meshStandardMaterial color="#0a3d2e" />
      </mesh>
      <mesh position={[0, 123, 0]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#00ff88" />
      </mesh>

      {/* Main Beacon Light */}
      <pointLight position={[0, 102, 0]} color="#00ff88" intensity={3} distance={150} />
      <pointLight position={[0, 123, 0]} color="#ffffff" intensity={2} distance={50} />
    </group>
  );
};

export default AsmuthTower;
