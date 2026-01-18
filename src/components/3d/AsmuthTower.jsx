import React from 'react';
import * as THREE from 'three';

const AsmuthTower = () => {
  return (
    <group position={[0, -20, 0]}>
      {/* Base platform */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[25, 30, 5, 8]} />
        <meshStandardMaterial
          color="#0a3d2e"
          metalness={0.6}
          roughness={0.4}
        />
      </mesh>
      
      {/* Main tower - geometric, not too tall */}
      <mesh position={[0, 25, 0]}>
        <cylinderGeometry args={[10, 12, 50, 8]} />
        <meshStandardMaterial
          color="#0d4d3a"
          emissive="#00ff88"
          emissiveIntensity={0.1}
          metalness={0.5}
          roughness={0.5}
        />
      </mesh>
      
      {/* Tower segments - geometric look */}
      {[10, 20, 30, 40].map((height, i) => (
        <mesh key={`segment-${i}`} position={[0, height, 0]}>
          <cylinderGeometry args={[11, 11, 2, 8]} />
          <meshStandardMaterial
            color="#00ff88"
            emissive="#00ff88"
            emissiveIntensity={0.3}
          />
        </mesh>
      ))}
      
      {/* Top dome */}
      <mesh position={[0, 52, 0]}>
        <cylinderGeometry args={[0, 12, 8, 8]} />
        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Omnitrix symbol on top */}
      <mesh position={[0, 58, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[6, 6, 1, 16]} />
        <meshBasicMaterial
          color="#00ff88"
        />
      </mesh>
      
      {/* Windows - smaller, scattered */}
      {Array.from({ length: 6 }).map((_, level) => (
        <group key={`level-${level}`} position={[0, 8 + level * 7, 0]}>
          {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, j) => (
            <mesh
              key={`window-${j}`}
              position={[
                Math.sin(angle) * 10.5,
                0,
                Math.cos(angle) * 10.5
              ]}
              rotation={[0, angle, 0]}
            >
              <boxGeometry args={[2, 3, 0.2]} />
              <meshBasicMaterial
                color="#66ffaa"
                transparent
                opacity={0.6}
              />
            </mesh>
          ))}
        </group>
      ))}
      
      {/* Subtle lights */}
      <pointLight position={[0, 58, 0]} color="#00ff88" intensity={1.5} distance={60} />
      <pointLight position={[0, 30, 0]} color="#00ff88" intensity={1} distance={40} />
    </group>
  );
};

export default AsmuthTower;
