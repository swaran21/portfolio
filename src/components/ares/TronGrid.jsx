import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Infinite Red Grid Floor ─── */
const GridFloor = () => {
  const gridRef = useRef();

  useFrame(({ clock }) => {
    if (gridRef.current) {
      gridRef.current.position.z = (clock.getElapsedTime() * 2) % 2;
    }
  });

  const gridMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color('#ff3322') },
        uTime: { value: 0 },
        uOpacity: { value: 0.4 },
      },
      vertexShader: `
        varying vec3 vWorldPos;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPos = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        uniform float uOpacity;
        varying vec3 vWorldPos;

        float grid(vec2 st, float res) {
          vec2 grid = abs(fract(st * res) - 0.5) / fwidth(st * res);
          float line = min(grid.x, grid.y);
          return 1.0 - min(line, 1.0);
        }

        void main() {
          float d = length(vWorldPos.xz) * 0.02;
          float fade = exp(-d * 0.8);

          float g1 = grid(vWorldPos.xz, 0.5) * 0.6;
          float g2 = grid(vWorldPos.xz, 0.1) * 0.3;

          float totalGrid = (g1 + g2) * fade;
          vec3 color = uColor * totalGrid;

          gl_FragColor = vec4(color, totalGrid * uOpacity * fade);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    });
  }, []);

  return (
    <group ref={gridRef}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} material={gridMaterial}>
        <planeGeometry args={[200, 200, 1, 1]} />
      </mesh>
    </group>
  );
};

/* ─── Dark Monolith Columns ─── */
const Monolith = ({ position, height = 12, width = 1.5 }) => {
  return (
    <group position={position}>
      {/* Main body */}
      <mesh>
        <boxGeometry args={[width, height, width]} />
        <meshStandardMaterial color="#080808" roughness={0.9} metalness={0.1} />
      </mesh>
      {/* Red emissive edge lines */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(width, height, width)]} />
        <lineBasicMaterial color="#ff2200" transparent opacity={0.35} />
      </lineSegments>
      {/* Base glow */}
      <mesh position={[0, -height / 2 + 0.05, 0]}>
        <boxGeometry args={[width + 0.4, 0.1, width + 0.4]} />
        <meshBasicMaterial color="#ff2200" transparent opacity={0.4} />
      </mesh>
    </group>
  );
};

/* ─── Floating Particles ─── */
const Particles = () => {
  const particlesRef = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = Math.random() * 20 - 2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 80 - 20;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const arr = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        arr[i * 3 + 1] += Math.sin(clock.getElapsedTime() * 0.5 + i) * 0.003;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial color="#ff4433" size={0.08} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

/* ─── Camera Controller (responds to scroll progress) ─── */
const CameraController = ({ scrollProgress = 0 }) => {
  const { camera } = useThree();

  useFrame(() => {
    const progress = scrollProgress;
    // Camera moves forward (into the grid) and slightly down as user scrolls
    camera.position.z = 15 - progress * 25;
    camera.position.y = 6 - progress * 3;
    camera.position.x = Math.sin(progress * Math.PI * 0.5) * 2;
    camera.lookAt(0, 0, -20);
  });

  return null;
};

/* ─── Main Exportable TronGrid Component ─── */
const TronGrid = ({ scrollProgress = 0 }) => {
  const monoliths = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 16; i++) {
      const x = (Math.random() - 0.5) * 60;
      const z = -Math.random() * 60 - 10;
      const h = 8 + Math.random() * 16;
      const w = 1 + Math.random() * 2;
      positions.push({ position: [x, h / 2 - 2, z], height: h, width: w });
    }
    return positions;
  }, []);

  return (
    <div className="fixed inset-0 -z-40 pointer-events-none">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 6, 15], fov: 60, near: 0.1, far: 200 }}
        style={{ background: 'transparent' }}
      >
        <fog attach="fog" args={['#020202', 5, 80]} />
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 10, 5]} intensity={0.3} color="#ff4433" />
        <pointLight position={[0, 5, -10]} intensity={1.5} color="#ff2200" distance={40} decay={2} />
        <pointLight position={[-15, 3, -30]} intensity={0.8} color="#ff0000" distance={30} decay={2} />

        <CameraController scrollProgress={scrollProgress} />
        <GridFloor />
        <Particles />

        {monoliths.map((m, i) => (
          <Monolith key={i} position={m.position} height={m.height} width={m.width} />
        ))}
      </Canvas>
    </div>
  );
};

export default TronGrid;
