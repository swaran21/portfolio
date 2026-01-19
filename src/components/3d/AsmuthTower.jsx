import React, { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Import alien images (UPDATED PATHS per User edit)
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
  alienX, diamondhead, fourarms, greymatter, heatblast, humangasaur, upgrade, wildmut, xlr8
];

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
      
      // 1. SCANLINES
      float scanline = sin(vUv.y * 120.0 - uTime * 15.0) * 0.2 + 0.8;
      
      // 2. GLITCH NOISE
      float noise = random(vec2(uTime * 2.0, vUv.y)) * 0.1;

      // 3. PURE HOLOGRAPHIC LIGHT
      float luminance = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
      float brightness = luminance * 2.5; 
      vec3 finalColor = uColor * brightness * scanline;

      // 4. EDGE FADE
      float verticalFade = smoothstep(0.0, 0.15, vUv.y) * smoothstep(1.0, 0.85, vUv.y);
      float alpha = texColor.a * verticalFade * (0.5 + noise); 

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
    // Levitation
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
       
       {/* Projector Light */}
       <spotLight 
          position={[0, -18, 0]} 
          target-position={[0, 10, 0]} 
          angle={0.6} 
          penumbra={0.5} 
          intensity={5} 
          color="#00ff88" 
          distance={50}
       />

       {/* Hologram Billboard */}
       <mesh position={[0, 10, 0]}> 
          <planeGeometry args={[40, 60]} />
          <shaderMaterial
             ref={materialRef}
             uniforms={{
                uTime: { value: 0 },
                uTexture: { value: texture },
                uColor: { value: new THREE.Color('#00ff88') } 
             }}
             vertexShader={HologramMaterial.vertexShader}
             fragmentShader={HologramMaterial.fragmentShader}
             transparent={true}
             side={THREE.DoubleSide}
             blending={THREE.AdditiveBlending} 
             depthWrite={false} 
          />
       </mesh>
    </group>
  );
};

const AsmuthTower = (props) => {
  const topSphereRef = useRef();
  const hourglassRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (topSphereRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.02;
      topSphereRef.current.scale.set(scale, scale, scale);
    }
    if (hourglassRef.current) {
        hourglassRef.current.rotation.y = t * 0.2;
    }
  });

  return (
    <group position={[0, 0, 0]} {...props}>
      {/* --- BASE --- */}
      <mesh position={[0, -25, 0]}>
        <cylinderGeometry args={[130, 160, 50, 32]} /> 
        <meshStandardMaterial color="#02100d" metalness={0.9} roughness={0.7} />
      </mesh>
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[110, 130, 10, 32]} /> 
        <meshStandardMaterial color="#05261c" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* --- TOWER SHAFT (SPLIT) --- */}
      {/* Lower Shaft (Stops at Hourglass Bottom) */}
      <mesh position={[0, 45, 0]}>
         <cylinderGeometry args={[20, 25, 70, 32]} />
         <meshStandardMaterial color="#0b3025" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Upper Shaft (Starts at Hourglass Top) */}
      <mesh position={[0, 140, 0]}>
         <cylinderGeometry args={[15, 20, 50, 32]} />
         <meshStandardMaterial color="#0b3025" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Shaft Rings */}
      {[40, 60, 80].map((y, i) => (
         <mesh key={i} position={[0, y, 0]}>
             <torusGeometry args={[22, 1.5, 16, 64]} rotation={[Math.PI/2, 0, 0]} />
             <meshStandardMaterial color="#05261c" metalness={0.9} />
         </mesh>
      ))}

      {/* --- HOURGLASS CORE (The Symbol) --- */}
      <group position={[0, 100, 0]} ref={hourglassRef}>
          {/* Top Cone (Points DOWN) */}
          <mesh position={[0, 10, 0]} rotation={[Math.PI, 0, 0]}> 
             <coneGeometry args={[25, 20, 64]} /> 
             <meshBasicMaterial color="#00ff88" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
          {/* Bottom Cone (Points UP) */}
          <mesh position={[0, -10, 0]} rotation={[0, 0, 0]}> 
             <coneGeometry args={[25, 20, 64]} /> 
             <meshBasicMaterial color="#00ff88" transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
          {/* Center Ring */}
          <mesh rotation={[Math.PI/2, 0, 0]}> 
             <torusGeometry args={[25, 2, 8, 64]} />
             <meshStandardMaterial color="#111" metalness={1} roughness={0.1} />
          </mesh>
          {/* Inner Core Light */}
          <pointLight intensity={3} distance={50} color="#00ff88" />
      </group>

      {/* Top Deck */}
      <mesh position={[0, 175, 0]} ref={topSphereRef}>
          <sphereGeometry args={[25, 64, 64]} />
          <meshStandardMaterial color="#00ff88" emissive="#00ffaa" emissiveIntensity={0.5} metalness={0.8} />
      </mesh>
      
      {/* Floating Crown Rings */}
      <mesh position={[0, 175, 0]} rotation={[0.2, 0, 0.1]}>
         <torusGeometry args={[35, 0.5, 8, 64]} />
         <meshBasicMaterial color="#00ff88" />
      </mesh>
      <mesh position={[0, 175, 0]} rotation={[-0.2, 0, -0.1]}>
         <torusGeometry args={[32, 0.5, 8, 64]} />
         <meshBasicMaterial color="#00ff88" />
      </mesh>

      {/* --- SURROUNDINGS --- */}
      {[135, 145, 155].map((radius, i) => (
         <mesh key={i} position={[0, -30 + i*5, 0]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[radius, 0.8, 8, 64]} />
            <meshBasicMaterial color="#00ff88" transparent opacity={0.3} />
         </mesh>
      ))}

      <group position={[0, -10, 0]}>
         <mesh rotation={[-Math.PI/2, 0, 0]}>
             <ringGeometry args={[180, 260, 64]} />
             <meshStandardMaterial color="#02100d" metalness={0.8} roughness={0.5} />
         </mesh>
         <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0, 0.1]}>
             <ringGeometry args={[258, 260, 64]} />
             <meshBasicMaterial color="#00ff88" />
         </mesh>
      </group>

      {aliens.map((img, i) => {
         const count = aliens.length;
         const angle = (i / count) * Math.PI * 2;
         const dist = 220; 
         
         return (
            <group key={i}>
                <AlienHologram 
                   imgUrl={img}
                   rotation={[0, angle, 0]}
                   position={[Math.sin(angle)*dist, 12, Math.cos(angle)*dist]} 
                />
                <group position={[Math.sin(angle)*dist, -10, Math.cos(angle)*dist]} rotation={[0, angle, 0]}>
                    <mesh position={[0, 1, 0]}>
                        <cylinderGeometry args={[25, 30, 2, 32]} />
                        <meshStandardMaterial color="#0a3d2e" metalness={0.9} />
                    </mesh>
                    <mesh position={[0, 2.1, 0]} rotation={[-Math.PI/2, 0, 0]}>
                         <ringGeometry args={[20, 22, 32]} />
                         <meshBasicMaterial color="#00ff88" />
                    </mesh>
                </group>
            </group>
         )
      })}
      
      {[0, 90, 180, 270].map((angle, i) => (
         <group key={i} rotation={[0, (angle * Math.PI) / 180, 0]}>
            <mesh position={[155, -8, 0]}>
               <boxGeometry args={[55, 4, 30]} /> 
               <meshStandardMaterial color="#021a15" metalness={0.9} />
            </mesh>
            <mesh position={[155, -5.9, 0]} rotation={[-Math.PI/2, 0, 0]}>
               <planeGeometry args={[50, 6]} />
               <meshBasicMaterial color="#00ff88" transparent opacity={0.6} />
            </mesh>
         </group>
      ))}
    </group>
  );
};

export default AsmuthTower;
