"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";

type BuildingsHeroSceneProps = {
  onReady: () => void;
  timeOfDay: number;
  pointer: { x: number; y: number };
};

function SkyShader({ timeOfDay }: { timeOfDay: number }) {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uTimeOfDay: { value: timeOfDay },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float uTime;
          uniform float uTimeOfDay;

          float softNoise(vec2 p) {
            return sin(p.x) * sin(p.y);
          }

          void main() {
            // Dawn
            vec3 topDawn = vec3(0.07, 0.035, 0.12);
            vec3 duskDawn = vec3(0.91, 0.39, 0.20);
            vec3 violetDawn = vec3(0.28, 0.12, 0.32);
            vec3 lowDawn = vec3(0.025, 0.021, 0.025);

            // Midday
            vec3 topDay = vec3(0.1, 0.4, 0.8);
            vec3 duskDay = vec3(0.6, 0.8, 1.0);
            vec3 violetDay = vec3(0.4, 0.6, 0.9);
            vec3 lowDay = vec3(0.2, 0.3, 0.4);

            // Night
            vec3 topNight = vec3(0.02, 0.02, 0.05);
            vec3 duskNight = vec3(0.05, 0.1, 0.2);
            vec3 violetNight = vec3(0.1, 0.05, 0.15);
            vec3 lowNight = vec3(0.01, 0.01, 0.02);

            // Interpolate palettes
            vec3 top = mix(mix(topDawn, topDay, smoothstep(0.0, 0.5, uTimeOfDay)), topNight, smoothstep(0.5, 1.0, uTimeOfDay));
            vec3 dusk = mix(mix(duskDawn, duskDay, smoothstep(0.0, 0.5, uTimeOfDay)), duskNight, smoothstep(0.5, 1.0, uTimeOfDay));
            vec3 violet = mix(mix(violetDawn, violetDay, smoothstep(0.0, 0.5, uTimeOfDay)), violetNight, smoothstep(0.5, 1.0, uTimeOfDay));
            vec3 low = mix(mix(lowDawn, lowDay, smoothstep(0.0, 0.5, uTimeOfDay)), lowNight, smoothstep(0.5, 1.0, uTimeOfDay));

            float horizon = smoothstep(0.18, 0.78, vUv.y);
            vec3 color = mix(dusk, violet, smoothstep(0.12, 0.56, vUv.y));
            color = mix(color, top, horizon);
            color = mix(low, color, smoothstep(0.02, 0.24, vUv.y));

            float smoke = softNoise(vec2(vUv.x * 12.0 + uTime * 0.12, vUv.y * 9.0 - uTime * 0.08));
            smoke += softNoise(vec2(vUv.x * 21.0 - uTime * 0.07, vUv.y * 15.0 + uTime * 0.06)) * 0.45;
            float veil = smoothstep(0.18, 1.0, smoke) * smoothstep(0.05, 0.7, vUv.y) * 0.08;

            gl_FragColor = vec4(color + veil, 1.0);
          }
        `
      }),
    []
  );

  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    material.uniforms.uTime.value = elapsed.current;
    material.uniforms.uTimeOfDay.value = THREE.MathUtils.lerp(
      material.uniforms.uTimeOfDay.value,
      timeOfDay,
      0.1
    );
  });

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[60, 40, 1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function Skyline({ pointer, timeOfDay }: { pointer: { x: number; y: number }; timeOfDay: number }) {
  const group = useRef<THREE.Group>(null);
  const buildings = useMemo(
    () => [
      [-10.2, 0.9, 1.5],
      [-8.8, 1.7, 0.82],
      [-7.8, 1.0, 1.05],
      [-6.6, 2.2, 0.9],
      [-5.2, 1.4, 1.5],
      [-3.4, 2.8, 0.92],
      [-2.0, 1.8, 1.1],
      [-0.6, 3.2, 1.0],
      [1.0, 1.5, 1.4],
      [2.7, 2.4, 1.0],
      [4.3, 1.2, 1.45],
      [5.8, 3.6, 0.86],
      [7.0, 2.0, 1.05],
      [8.2, 1.35, 1.4],
      [9.7, 2.3, 0.96]
    ],
    []
  );

  useFrame(() => {
    if (!group.current) return;
    // Mid-ground parallax
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, pointer.x * -0.5, 0.1);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, -4.25 + pointer.y * -0.2, 0.1);
  });

  // Calculate building color based on time of day
  const buildingColor = useMemo(() => {
    const dawnColor = new THREE.Color("#070707");
    const dayColor = new THREE.Color("#1a1a1a");
    const nightColor = new THREE.Color("#020202");
    
    const color = new THREE.Color();
    if (timeOfDay < 0.5) {
      color.lerpColors(dawnColor, dayColor, timeOfDay * 2);
    } else {
      color.lerpColors(dayColor, nightColor, (timeOfDay - 0.5) * 2);
    }
    return color;
  }, [timeOfDay]);

  return (
    <group ref={group} position={[0, -4.25, -2]}>
      {buildings.map(([x, height, width]) => (
        <mesh key={`${x}-${height}`} position={[x, height / 2, 0]}>
          <boxGeometry args={[width, height, 0.22]} />
          <meshBasicMaterial color={buildingColor} />
          {/* Add glowing windows at night */}
          {timeOfDay > 0.7 && Math.random() > 0.5 && (
            <mesh position={[0, 0, 0.12]}>
              <planeGeometry args={[width * 0.8, height * 0.8]} />
              <meshBasicMaterial 
                color="#ffaa00" 
                transparent 
                opacity={(timeOfDay - 0.7) * 3 * Math.random()} 
                blending={THREE.AdditiveBlending} 
              />
            </mesh>
          )}
        </mesh>
      ))}
      <mesh position={[-8.1, 2.12, 0]}>
        <sphereGeometry args={[0.58, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color={buildingColor} />
      </mesh>
      <mesh position={[3.7, 1.92, 0]}>
        <sphereGeometry args={[0.46, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color={buildingColor} />
      </mesh>
    </group>
  );
}

function Crane({
  position,
  scale = 1,
  reverse = false,
  pointer,
  timeOfDay
}: {
  position: [number, number, number];
  scale?: number;
  reverse?: boolean;
  pointer: { x: number; y: number };
  timeOfDay: number;
}) {
  const group = useRef<THREE.Group>(null);
  const jib = useMemo(
    () =>
      reverse
        ? [
            [0, 1.7, 0],
            [-4.7, 2.35, 0],
            [0.2, 1.44, 0],
            [-4.7, 2.35, 0]
          ]
        : [
            [0, 1.7, 0],
            [4.9, 2.25, 0],
            [-0.2, 1.42, 0],
            [4.9, 2.25, 0]
          ],
    [reverse]
  );
  const cableX = reverse ? -2.4 : 2.7;

  const initialPosition = useRef(new THREE.Vector3(...position));

  useFrame(() => {
    if (!group.current) return;
    // Foreground parallax
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, initialPosition.current.x + pointer.x * -1.5 * scale, 0.1);
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, initialPosition.current.y + pointer.y * -0.5 * scale, 0.1);

    // Minor rotation
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.16, 0.08);
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, pointer.y * -0.018, 0.08);
  });

  const craneColor = useMemo(() => {
    return timeOfDay > 0.5 ? "#020202" : "#050505";
  }, [timeOfDay]);

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.14, 4.8, 0.18]} />
        <meshBasicMaterial color={craneColor} />
      </mesh>
      <mesh position={[0, 2.72, 0]}>
        <boxGeometry args={[0.7, 0.16, 0.18]} />
        <meshBasicMaterial color={craneColor} />
      </mesh>
      <Line points={jib as [number, number, number][]} color={craneColor} lineWidth={3.2} />
      <Line
        points={
          [
            [cableX, 2.08, 0],
            [cableX, 0.74, 0],
            [cableX - 0.12, 0.55, 0],
            [cableX + 0.12, 0.55, 0],
            [cableX, 0.74, 0]
          ] as [number, number, number][]
        }
        color={craneColor}
        lineWidth={2.1}
      />
    </group>
  );
}

function Particles({ timeOfDay }: { timeOfDay: number }) {
  const points = useRef<THREE.Points>(null);
  const count = 600; // Increased particle count
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      const seed = index * 17.13;
      positions[index * 3] = (Math.sin(seed) * 0.5 + 0.5) * 30 - 15;
      positions[index * 3 + 1] = (Math.cos(seed * 1.37) * 0.5 + 0.5) * 10 - 2;
      positions[index * 3 + 2] = Math.sin(seed * 0.71) * 2;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return particleGeometry;
  }, []);

  const elapsed = useRef(0);

  useFrame((_, delta) => {
    elapsed.current += delta;
    if (!points.current) return;
    points.current.rotation.z = Math.sin(elapsed.current * 0.12) * 0.012;
    points.current.position.x = Math.sin(elapsed.current * 0.18) * 0.22;
  });

  const particleColor = useMemo(() => {
    const dawnColor = new THREE.Color("#f4c1a7");
    const dayColor = new THREE.Color("#ffffff");
    const nightColor = new THREE.Color("#a7c1f4");
    
    const color = new THREE.Color();
    if (timeOfDay < 0.5) {
      color.lerpColors(dawnColor, dayColor, timeOfDay * 2);
    } else {
      color.lerpColors(dayColor, nightColor, (timeOfDay - 0.5) * 2);
    }
    return color;
  }, [timeOfDay]);

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial color={particleColor} size={0.03} transparent opacity={0.6} blending={THREE.AdditiveBlending} />
    </points>
  );
}

function SceneContents({ onReady, timeOfDay, pointer }: BuildingsHeroSceneProps) {
  const { gl } = useThree();
  
  useEffect(() => {
    // Wait for the first frame to render before calling onReady
    let frameId: number;
    const checkReady = () => {
      onReady();
    };
    frameId = requestAnimationFrame(checkReady);
    return () => cancelAnimationFrame(frameId);
  }, [onReady]);

  return (
    <>
      <SkyShader timeOfDay={timeOfDay} />
      <Particles timeOfDay={timeOfDay} />
      <Skyline pointer={pointer} timeOfDay={timeOfDay} />
      <Crane position={[-5.2, -2.0, 0.5]} scale={0.96} pointer={pointer} timeOfDay={timeOfDay} />
      <Crane position={[6.3, -1.85, 0.2]} scale={0.72} reverse pointer={pointer} timeOfDay={timeOfDay} />
      <Crane position={[1.9, -2.55, 0.8]} scale={0.54} pointer={pointer} timeOfDay={timeOfDay} />
    </>
  );
}

export default function BuildingsHeroScene(props: BuildingsHeroSceneProps) {
  return (
    <Canvas
      orthographic
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], zoom: 58 }}
      gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}
    >
      <SceneContents {...props} />
    </Canvas>
  );
}

