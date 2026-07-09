import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';

/**
 * DataArchitecture — Infinite Raymarched Cyber-City Background
 * ────────────────────────────────────────────────────────────
 * A fullscreen fragment-shader pass (renders behind everything in the
 * canvas). It raymarches an endless field of monolithic "server node"
 * monoliths with glowing circuitry and energy pulses, drowned in heavy
 * distance fog so the upper screen stays clean for typography.
 *
 * Optimized for a UI background:
 *  - 48 march steps + 0.85 step scale, MAX_DIST clamped just past where
 *    the fog fully swallows geometry (no wasted marching).
 *  - Per-cell hashed heights/width/presence → an organic skyline, not a
 *    repeating sine wave.
 *  - Theme colour, mouse-parallax and scroll all fed in as uniforms
 *    (no shader recompiles).
 */

const vertexShader = /* glsl */ `
  void main() {
    // Fullscreen triangle/quad in clip space — ignores the camera entirely
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec2  uResolution;
  uniform float uTime;
  uniform vec3  uColor;
  uniform vec2  uMouse;   // smoothed, -1..1
  uniform float uScroll;  // 0..1 page scroll
  uniform float uIntro;   // 0 (high in the void) → 1 (landed in the corridor)

  #define STEPS 48
  #define MAXD  42.0
  #define SURF  0.02

  mat2 rot(float a){ float s = sin(a), c = cos(a); return mat2(c, -s, s, c); }

  // Anti-aliased grid lines — screen-space width via fwidth, so lines stay a
  // crisp ~1px at any distance instead of shimmering into noise.
  // Floor on fwidth prevents division-by-near-zero at oblique raymarch angles.
  float gridAA(vec2 c){
    vec2 fw = max(fwidth(c), vec2(0.03));
    vec2 g = abs(fract(c - 0.5) - 0.5) / fw;
    return 1.0 - clamp(min(g.x, g.y), 0.0, 1.0);
  }

  float hash21(vec2 p){
    p = fract(p * vec2(123.34, 345.45));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
  }

  float sdBox(vec3 p, vec3 b){
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
  }

  // Scene SDF — nearest tower across a 3x3 cell neighbourhood + floor.
  // Sampling neighbours (not just the current cell) makes the field TRUE-metric
  // and continuous across cell boundaries. That is what kills the noise: a
  // single-cell SDF is non-metric, so the marcher overshoots tower edges AND
  // getNormal() explodes at silhouettes — together they produced the torn,
  // flickering fragments. A metric field removes both at the source.
  float map(vec3 p, out float cellRnd){
    float fl = p.y + 2.0;                        // ground plane
    vec2 baseId = floor((p.xz + 2.0) / 4.0);
    float best = 1e5;
    float bestRnd = hash21(baseId);

    for (int i = -1; i <= 1; i++){
      for (int j = -1; j <= 1; j++){
        vec2 nid = baseId + vec2(float(i), float(j));
        // Central column (x-cell 0) stays an empty avenue for the camera
        float corridor = step(0.5, abs(nid.x));
        float present  = step(0.18, hash21(nid + 11.7)) * corridor;
        if (present < 0.5) continue;
        float rnd    = hash21(nid);
        float height = mix(0.5, 4.5, rnd);
        float w      = mix(0.55, 0.9, fract(rnd * 31.7));
        vec2 local   = p.xz - 4.0 * nid;         // this cell's tower center is at 4*nid
        float box = sdBox(vec3(local.x, p.y - (height - 2.0), local.y), vec3(w, height, w));
        if (box < best){ best = box; bestRnd = rnd; }
      }
    }
    cellRnd = bestRnd;
    return min(best, fl);
  }

  float mapD(vec3 p){ float r; return map(p, r); }

  vec3 getNormal(vec3 p){
    vec2 e = vec2(0.015, 0.0);
    return normalize(vec3(
      mapD(p + e.xyy) - mapD(p - e.xyy),
      mapD(p + e.yxy) - mapD(p - e.yxy),
      mapD(p + e.yyx) - mapD(p - e.yyx)));
  }

  void main(){
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
    float t = uTime * 0.55;
    float intro = clamp(uIntro, 0.0, 1.0);

    // ── Intro drop-in: start high in the pitch-black void looking straight
    //    down, then plunge and level out into the corridor (driven by GSAP).
    float camY = mix(34.0, 1.7, intro) + uScroll * 2.0;
    vec3 ro = vec3(0.0, camY, t * 2.4);
    vec3 rd = normalize(vec3(uv.x, uv.y - 0.26, 1.0));

    // Pitch the ray straight down at the start, ease level as we land
    rd.yz *= rot(-(1.0 - intro) * 1.25);

    // Auto sway + cursor parallax (only after we've landed)
    float sway = sin(t * 0.18) * 0.12 + uMouse.x * 0.22 * intro;
    rd.xz *= rot(sway);
    rd.yz *= rot(-uMouse.y * 0.10 * intro);

    // ── Raymarch — the SDF is now truly metric (3x3 neighbourhood), so a plain
    //    sphere-trace is exact and cannot overshoot a tower edge. ──
    float d = 0.0, cellRnd = 0.0, hitRnd = 0.0;
    for (int i = 0; i < STEPS; i++){
      vec3 p = ro + rd * d;
      float ds = map(p, cellRnd);
      if (ds < SURF){ hitRnd = cellRnd; break; }
      d += ds;
      if (d > MAXD) break;
    }

    vec3 col = vec3(0.0);
    if (d < MAXD){
      vec3 p = ro + rd * d;
      vec3 n = getNormal(p);
      vec3 an = abs(n);

      // ── Distance fade: kill high-frequency detail before it goes sub-pixel ──
      float detailFade = 1.0 - smoothstep(8.0, MAXD * 0.7, d);

      // ── Circuitry: crisp anti-aliased grid on every face (triplanar) ──
      float gX = gridAA(p.yz * 2.0);   // faces pointing along X
      float gY = gridAA(p.xz * 2.0);   // floor / horizontal faces
      float gZ = gridAA(p.xy * 2.0);   // faces pointing along Z
      float lines = (gX * an.x + gY * an.y + gZ * an.z) * detailFade;

      // ── Single descending laser scanline down each pillar ──
      //    fract() loop = one clean line dropping top→bottom; per-pillar hash
      //    offset so they fall out of unison; gated to vertical faces only.
      //    Threshold widens with distance so it never goes sub-pixel.
      float scanW = 0.05 + d * 0.0015;
      float scan = smoothstep(scanW, 0.0, abs(fract(p.y * 0.3 + uTime * 0.5 + hitRnd * 3.0) - 0.5));
      scan *= (1.0 - an.y) * detailFade;

      // Faint diffuse so the monoliths read as solid volumes
      float dif = clamp(dot(n, normalize(vec3(0.5, 1.0, 0.3))), 0.0, 1.0);
      vec3 base = vec3(0.02) * dif;

      // Per-tower brightness variation for depth
      vec3 c = mix(uColor * 0.7, uColor * 1.25, hitRnd);
      col = base + c * lines * 1.2 + c * scan * 2.2;
    }

    // ── Atmospheric fog → the site's void colour (keeps distance clean) ──
    vec3 voidCol = vec3(0.004, 0.007, 0.022);
    float fog = exp(-0.0032 * d * d);
    col = mix(voidCol, col, fog);

    // Darken the upper screen so headline/nav text stays readable
    col *= mix(0.3, 1.0, smoothstep(0.4, -0.3, uv.y));
    // Subtle horizon bloom low on screen
    col += uColor * 0.03 * smoothstep(0.2, -0.4, uv.y) * fog;

    // Vignette + gentle gamma lift for the glow
    col *= 1.0 - dot(uv, uv) * 0.3;
    col = pow(max(col, 0.0), vec3(0.85));

    gl_FragColor = vec4(col, 1.0);
  }
`;

const THEME_COLOR = {
  red:  new THREE.Color(1.0, 0.12, 0.14),
  blue: new THREE.Color(0.10, 0.65, 1.0),
};

const DataArchitecture = ({ theme = 'red', scrollProgress = 0 }) => {
  const matRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const bufSize = useMemo(() => new THREE.Vector2(1, 1), []);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uColor: { value: (THEME_COLOR[theme] || THEME_COLOR.red).clone() },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScroll: { value: 0 },
    uIntro: { value: 0 },
  }), []); // built once — values mutate in useFrame, never recreate

  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Recolour on theme switch without recompiling the shader
  useEffect(() => {
    if (matRef.current) {
      matRef.current.uniforms.uColor.value.copy(THEME_COLOR[theme] || THEME_COLOR.red);
    }
  }, [theme]);

  // "Through the clouds" drop-in: plunge from the void into the corridor once,
  // right as the site reveals (this component mounts when the boot finishes).
  useEffect(() => {
    const mat = matRef.current;
    if (!mat) return;
    mat.uniforms.uIntro.value = 0;
    const tween = gsap.to(mat.uniforms.uIntro, {
      value: 1,
      duration: 3.4,
      ease: 'power2.inOut',
      delay: 0.2,
    });
    return () => tween.kill();
  }, []);

  useFrame((state) => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    u.uTime.value = state.clock.elapsedTime;
    state.gl.getDrawingBufferSize(bufSize);
    u.uResolution.value.copy(bufSize);
    // Smooth (spring-ish) parallax + scroll easing
    u.uMouse.value.x += (mouse.current.x - u.uMouse.value.x) * 0.04;
    u.uMouse.value.y += (mouse.current.y - u.uMouse.value.y) * 0.04;
    u.uScroll.value += (scrollProgress - u.uScroll.value) * 0.05;
  });

  return (
    <mesh frustumCulled={false} renderOrder={-10}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
};

export default DataArchitecture;
