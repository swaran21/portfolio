import React, { useMemo } from 'react';
import * as THREE from 'three';

const AlienJungle = () => {
  // Simplified geometric jungle matching reference image
  const vegetation = useMemo(() => {
    const items = [];
    const area = 120;
    
    // Simple geometric trees - low poly style
    for (let i = 0; i < 50; i++) {
      const x = (Math.random() - 0.5) * area * 2;
      const z = (Math.random() - 0.5) * 600;
      
      // Skip river area
      if (Math.abs(x) < 45) continue;
      
      items.push({
        type: 'tree',
        position: [x, 0, z],
        height: 12 + Math.random() * 10,
        radius: 4 + Math.random() * 3,
      });
    }
    
    // Smaller plants
    for (let i = 0; i < 40; i++) {
      const x = (Math.random() - 0.5) * area * 2;
      const z = (Math.random() - 0.5) * 600;
      
      if (Math.abs(x) < 45) continue;
      
      items.push({
        type: 'small',
        position: [x, 0, z],
        height: 3 + Math.random() * 4,
      });
    }
    
    return items;
  }, []);
  
  return (
    <group position={[0, -15, 0]}>
      {/* Simple dark ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[400, 800]} />
        <meshStandardMaterial
          color="#0a1f14"
          roughness={0.95}
        />
      </mesh>
      
      {/* Render vegetation */}
      {vegetation.map((item, index) => {
        if (item.type === 'tree') {
          return (
            <group key={`tree-${index}`} position={item.position}>
              {/* Simple dark trunk */}
              <mesh position={[0, item.height * 0.4, 0]}>
                <cylinderGeometry args={[item.radius * 0.2, item.radius * 0.3, item.height * 0.8, 6]} />
                <meshStandardMaterial
                  color="#0f2d1c"
                  roughness={0.9}
                />
              </mesh>
              
              {/* Bright glowing cone foliage - simple geometric */}
              <mesh position={[0, item.height * 0.85, 0]} castShadow>
                <coneGeometry args={[item.radius, item.height * 0.7, 6]} />
                <meshStandardMaterial
                  color="#00ff88"
                  emissive="#00ff88"
                  emissiveIntensity={0.8}
                  roughness={0.4}
                />
              </mesh>
            </group>
          );
        }
        
        if (item.type === 'small') {
          return (
            <mesh key={`small-${index}`} position={item.position}>
              <coneGeometry args={[item.height * 0.5, item.height, 6]} />
              <meshStandardMaterial
                color="#00dd77"
                emissive="#00ff88"
                emissiveIntensity={0.5}
                roughness={0.6}
              />
            </mesh>
          );
        }
        
        return null;
      })}
      
      {/* Ambient green glow */}
      <ambientLight intensity={0.2} color="#00ff88" />
    </group>
  );
};

export default AlienJungle;
