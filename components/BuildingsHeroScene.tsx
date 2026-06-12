"use client";

import { Line } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function SkyShader() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 }
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

          float softNoise(vec2 p) {
            return sin(p.x) * sin(p.y);
          }

          void main() {
            vec3 top = vec3(0.07, 0.035, 0.12);
            vec3 dusk = vec3(0.91, 0.39, 0.20);
            vec3 violet = vec3(0.28, 0.12, 0.32);
            vec3 low = vec3(0.025, 0.021, 0.025);

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

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh position={[0, 0, -1.8]}>
      <planeGeometry args={[42, 24, 1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

function Skyline() {
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

  return (
    <group position={[0, -4.25, 0]}>
      {buildings.map(([x, height, width]) => (
        <mesh key={`${x}-${height}`} position={[x, height / 2, 0]}>
          <boxGeometry args={[width, height, 0.22]} />
          <meshBasicMaterial color="#070707" />
        </mesh>
      ))}
      <mesh position={[-8.1, 2.12, 0]}>
        <sphereGeometry args={[0.58, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#070707" />
      </mesh>
      <mesh position={[3.7, 1.92, 0]}>
        <sphereGeometry args={[0.46, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#070707" />
      </mesh>
    </group>
  );
}

function Crane({
  position,
  scale = 1,
  reverse = false
}: {
  position: [number, number, number];
  scale?: number;
  reverse?: boolean;
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

  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.16 - group.current.rotation.y) * 0.08;
    group.current.rotation.z += (pointer.y * -0.018 - group.current.rotation.z) * 0.08;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[0.14, 4.8, 0.18]} />
        <meshBasicMaterial color="#050505" />
      </mesh>
      <mesh position={[0, 2.72, 0]}>
        <boxGeometry args={[0.7, 0.16, 0.18]} />
        <meshBasicMaterial color="#050505" />
      </mesh>
      <Line points={jib as [number, number, number][]} color="#060606" lineWidth={3.2} />
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
        color="#060606"
        lineWidth={2.1}
      />
    </group>
  );
}

function Particles() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(360 * 3);
    for (let index = 0; index < 360; index += 1) {
      const seed = index * 17.13;
      positions[index * 3] = (Math.sin(seed) * 0.5 + 0.5) * 22 - 11;
      positions[index * 3 + 1] = (Math.cos(seed * 1.37) * 0.5 + 0.5) * 7 - 1.8;
      positions[index * 3 + 2] = Math.sin(seed * 0.71) * 0.6;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return particleGeometry;
  }, []);

  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.z = Math.sin(clock.elapsedTime * 0.12) * 0.012;
    points.current.position.x = Math.sin(clock.elapsedTime * 0.18) * 0.22;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial color="#f4c1a7" size={0.025} transparent opacity={0.46} />
    </points>
  );
}

export default function BuildingsHeroScene() {
  return (
    <Canvas
      orthographic
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 10], zoom: 58 }}
      gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}
    >
      <SkyShader />
      <Particles />
      <Skyline />
      <Crane position={[-5.2, -2.0, 0]} scale={0.96} />
      <Crane position={[6.3, -1.85, 0]} scale={0.72} reverse />
      <Crane position={[1.9, -2.55, 0]} scale={0.54} />
    </Canvas>
  );
}
