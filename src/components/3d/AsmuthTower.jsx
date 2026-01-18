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
      {/* --- ADVANCED FUTURE CITY ISLAND --- */}
      
      {/* 1. Deep Foundation (Massive Industrial Base) */}
      <mesh position={[0, -25, 0]}>
        <cylinderGeometry args={[130, 160, 50, 32]} /> 
        <meshStandardMaterial color="#02100d" metalness={0.9} roughness={0.7} />
      </mesh>

      {/* 2. Main Tech Concourse (The City Level) */}
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[110, 130, 10, 32]} /> 
        <meshStandardMaterial color="#05261c" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* 3. Glowing Circuit Rings (Energy Lines) */}
      {[135, 145, 155].map((radius, i) => (
         <mesh key={i} position={[0, -30 + i*5, 0]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[radius, 0.8, 8, 64]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.3} />
         </mesh>
      ))}

      {/* 4. Peripheral Building Structures (Procedural City Look) */}
      {[...Array(16)].map((_, i) => {
         const angle = (i / 16) * Math.PI * 2;
         const dist = 100;
         return (
            <group key={i} rotation={[0, angle, 0]} position={[Math.sin(angle)*dist, 10, Math.cos(angle)*dist]}>
               {/* Building Block */}
               <mesh position={[0, 0, 0]}>
                  <boxGeometry args={[15, 20 + Math.random() * 20, 15]} />
                  <meshStandardMaterial color="#0a3d2e" metalness={0.8} />
               </mesh>
               {/* Glowing Top */}
               <mesh position={[0, 10 + Math.random() * 10, 0]}>
                  <boxGeometry args={[12, 1, 12]} />
                  <meshBasicMaterial color="#00ff88" />
               </mesh>
            </group>
         )
      })}

      {/* 5. Advanced Docking Bays with Runways */}
      {[0, 90, 180, 270].map((angle, i) => (
         <group key={i} rotation={[0, (angle * Math.PI) / 180, 0]}>
            {/* The Arm */}
            <mesh position={[180, 0, 0]}>
               <boxGeometry args={[200, 8, 40]} /> 
               <meshStandardMaterial color="#021a15" metalness={0.9} />
            </mesh>
            {/* The Runway Strip */}
            <mesh position={[180, 4.1, 0]} rotation={[-Math.PI/2, 0, 0]}>
               <planeGeometry args={[190, 10]} />
               <meshBasicMaterial color="#00ff88" transparent opacity={0.8} />
            </mesh>
            {/* Floating Landing Lights */}
            {[50, 100, 150].map((x, j) => (
               <mesh key={j} position={[100 + x, 6, 18]}>
                  <sphereGeometry args={[1, 8, 8]} />
                  <meshBasicMaterial color="#ff0000" />
               </mesh>
            ))}
            {[50, 100, 150].map((x, j) => (
               <mesh key={j} position={[100 + x, 6, -18]}>
                  <sphereGeometry args={[1, 8, 8]} />
                  <meshBasicMaterial color="#ff0000" />
               </mesh>
            ))}
         </group>
      ))}

      {/* 6. Base Connection */}
      <mesh position={[0, 25, 0]}>
        <cylinderGeometry args={[30, 45, 30, 16]} />
        <meshStandardMaterial color="#05261c" metalness={0.7} />
      </mesh>

      {/* Main Tower Shaft - Split into two to reveal internal Omnitrix Core */}
      {/* Lower Shaft */}
      <mesh position={[0, 25, 0]}>
        <cylinderGeometry args={[16, 20, 50, 8]} />
        <meshStandardMaterial
          color="#0a3d2e"
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>
      
      {/* Upper Shaft */}
      <mesh position={[0, 80, 0]}>
        <cylinderGeometry args={[14, 16, 20, 8]} />
        <meshStandardMaterial
          color="#0a3d2e"
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Glow Rings / Balconies - Adjusted positions */}
      {[25, 40].map((y, i) => (
        <group key={i} position={[0, y, 0]}>
          {/* Physical Ring */}
          <mesh>
            <cylinderGeometry args={[18 + (1-i), 18 + (1-i), 2, 8]} />
            <meshStandardMaterial color="#0d4d3a" />
          </mesh>
          {/* Glowing band */}
          <mesh scale={[1.05, 0.5, 1.05]}>
            <cylinderGeometry args={[18 + (1-i), 18 + (1-i), 2, 8]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}

      {/* THE GIANT OMNITRIX SYMBOL (Middle of Tower) */}
      <group position={[0, 60, 0]}>
         {/* Rotating Container */}
         <group ref={topSphereRef}> 
            {/* The Hourglass (Two Cones) - HOLLOW FOR ENTRY */}
            {/* Top Cone (Inverted) */}
            <mesh position={[0, 7, 0]} rotation={[Math.PI, 0, 0]}>
               <coneGeometry args={[20, 16, 32, 1, true]} /> {/* Open ended for entry */}
               <meshStandardMaterial 
                  color="#00ff88" 
                  emissive="#00ff88" 
                  emissiveIntensity={2}
                  side={THREE.DoubleSide} 
                  transparent
                  opacity={0.8}
               />
            </mesh>
            
            {/* Bottom Cone */}
            <mesh position={[0, -7, 0]}>
               <coneGeometry args={[20, 16, 32, 1, true]} />
               <meshStandardMaterial 
                  color="#00ff88" 
                  emissive="#00ff88" 
                  emissiveIntensity={2}
                  side={THREE.DoubleSide}
                  transparent
                  opacity={0.8}
               />
            </mesh>

            {/* Central Ring/Border */}
            <mesh rotation={[Math.PI/2, 0, 0]}>
               <torusGeometry args={[24, 2, 16, 64]} /> 
               <meshStandardMaterial color="#111" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* INTERIOR CORE ROOM (Camera Destination) */}
            <mesh>
               <dodecahedronGeometry args={[5, 0]} />
               <meshBasicMaterial color="#ffffff" wireframe />
            </mesh>
            <pointLight distance={30} intensity={5} color="#00ff88" />
         </group>
      </group>

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
          side={THREE.DoubleSide} // Make visible from inside (Room effect)
          transparent // Slightly see-through
          opacity={0.9}
        />
      </mesh>

      {/* Lab Interior Core (Visible when entering) */}
      <group position={[0, 102, 0]}>
         <mesh rotation={[0, Math.PI/4, 0]}>
             <octahedronGeometry args={[4, 0]} />
             <meshBasicMaterial color="white" wireframe />
         </mesh>
         <pointLight color="#00ff88" intensity={5} distance={20} />
      </group>

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
