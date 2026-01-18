import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

// Alien Images
import alienX from '../../images/alienX.png';
import diamondhead from '../../images/diamondhead.png';
import fourarms from '../../images/fourarms.png';
import greymatter from '../../images/greymatter.png';
import heatblast from '../../images/heatblast.png';
import humangasaur from '../../images/humangasaur.png';
import upgrade from '../../images/upgrade.png';
import wildmut from '../../images/wildmut.png';
import xlr8 from '../../images/xlr8.png';

const aliens = [
  alienX, diamondhead, fourarms, greymatter, 
  heatblast, humangasaur, upgrade, wildmut, xlr8
];

// --- CUSTOM HOLOGRAM SHADER ---
const HologramMaterial = {
  uniforms: {
    uTime: { value: 0 },
    uTexture: { value: null },
    uColor: { value: new THREE.Color('#00ff88') },
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vPos;
    void main() {
      vUv = uv;
      vPos = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform vec3 uColor;
    varying vec2 vUv;
    varying vec3 vPos;

    float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec4 texColor = texture2D(uTexture, vUv);
      
      // Early discard for transparent parts of original PNG
      if (texColor.a < 0.1) discard;

      // 1. SCANLINES - Brighter and faster
      float scanline = sin(vUv.y * 120.0 - uTime * 15.0) * 0.2 + 0.8;
      
      // 2. GLITCH NOISE
      float noise = random(vec2(uTime * 2.0, vUv.y)) * 0.1;

      // 3. COLOR BOOSTER (Keep original intensity but Tint Green)
      // mix original color with Green, don't just grascale
      vec3 tint = mix(texColor.rgb, uColor, 0.8); 
      vec3 finalColor = tint * 2.0 * scanline; // Double Brightness

      // 4. EDGE FADE
      float verticalFade = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
      
      // 5. ALPHA CALCULATION
      float alpha = texColor.a * verticalFade * (0.6 + noise); // Base alpha 0.6 minimum

      gl_FragColor = vec4(finalColor, alpha);
    }
  `
};

const AlienHologram = ({ imgUrl, position, rotation }) => {
  const texture = useTexture(imgUrl);
  const materialRef = useRef();
  const groupRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = t;
    }
    // Levitation / Floating Effect
    if (groupRef.current) {
       groupRef.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 2;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation}>
       {/* Hologram Emitter Base */}
       <mesh position={[0, -20, 0]}>
          <boxGeometry args={[30, 2, 12]} />
          <meshStandardMaterial color="#0b3025" metalness={0.9} emissive="#00ff88" emissiveIntensity={0.2} />
       </mesh>
       
       {/* Projector Light - Upward Spot */}
       <spotLight 
          position={[0, -18, 0]} 
          target-position={[0, 10, 0]} 
          angle={0.6} 
          penumbra={0.5} 
          intensity={5} 
          color="#00ff88" 
          distance={50}
       />

       {/* The Alien Billboard - LAYERED for 3D Volume */}
       {/* Layer 1: Core (Brightest) */}
       <mesh position={[0, 10, 0]}> 
          <planeGeometry args={[40, 60]} />
          <shaderMaterial
             ref={materialRef}
             uniforms={{
                uTime: { value: 0 },
                uTexture: { value: texture },
                uColor: { value: new THREE.Color('#55ffaa') } 
             }}
             vertexShader={HologramMaterial.vertexShader}
             fragmentShader={HologramMaterial.fragmentShader}
             transparent={true}
             side={THREE.DoubleSide}
             blending={THREE.AdditiveBlending} 
             depthWrite={false} 
          />
       </mesh>
       
       {/* Layer 2: Back Echo (Ghost) */}
       <mesh position={[0, 10, -2]}> 
          <planeGeometry args={[42, 62]} />
          <meshBasicMaterial 
             map={texture} 
             color="#00aaaa" 
             transparent 
             opacity={0.15} 
             blending={THREE.AdditiveBlending} 
          />
       </mesh>

       {/* Layer 3: Front Echo (Interference) */}
       <mesh position={[0, 10, 2]}> 
          <planeGeometry args={[42, 62]} />
          <meshBasicMaterial 
             map={texture} 
             color="#00ff88" 
             transparent 
             opacity={0.1} 
             wireframe // Wireframe overlay for "Tech" feel
             blending={THREE.AdditiveBlending} 
          />
       </mesh>
    </group>
  );
};

const AsmuthTower = (props) => {
  const topSphereRef = useRef();

  useFrame((state) => {
    if (topSphereRef.current) {
      // Subtle pulse effect for the top sphere
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.02;
      topSphereRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, 0, 0]} {...props}>
      {/* ... (City Base Geometry unchanged) ... */}
      {/* 1. Deep Foundation (Massive Industrial Base) */}
      <mesh position={[0, -25, 0]}>
        <cylinderGeometry args={[130, 160, 50, 32]} /> 
        <meshStandardMaterial color="#02100d" metalness={0.9} roughness={0.7} />
      </mesh>
      
      {/* 2. Main Tech Concourse */}
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[110, 130, 10, 32]} /> 
        <meshStandardMaterial color="#05261c" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* 3. Glowing Circuit Rings */}
      {[135, 145, 155].map((radius, i) => (
         <mesh key={i} position={[0, -30 + i*5, 0]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[radius, 0.8, 8, 64]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.3} />
         </mesh>
      ))}

      {/* 4. ALIEN HOLOGRAM GUARDIANS */}
      {aliens.map((img, i) => {
         const count = aliens.length;
         const angle = (i / count) * Math.PI * 2;
         const dist = 220; // Pushed out further for larger holograms
         
         return (
            <AlienHologram 
               key={i}
               imgUrl={img}
               rotation={[0, angle, 0]}
               position={[Math.sin(angle)*dist, 10, Math.cos(angle)*dist]}
            />
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
