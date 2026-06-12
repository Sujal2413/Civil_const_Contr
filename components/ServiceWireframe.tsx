"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type ServiceWireframeProps = {
  active?: boolean;
};

function WireMesh({ active = false }: ServiceWireframeProps) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const speed = active ? 1.8 : 0.58;
    mesh.current.rotation.x += delta * speed * 0.62;
    mesh.current.rotation.y += delta * speed;
  });

  return (
    <mesh ref={mesh}>
      <icosahedronGeometry args={[1.45, 2]} />
      <meshBasicMaterial
        color={active ? "#e7794c" : "#9a9a9a"}
        wireframe
        transparent
        opacity={active ? 0.88 : 0.42}
      />
    </mesh>
  );
}

export default function ServiceWireframe({ active = false }: ServiceWireframeProps) {
  return (
    <Canvas
      orthographic
      dpr={[1, 1.7]}
      camera={{ position: [0, 0, 6], zoom: 70 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={1} />
      <WireMesh active={active} />
    </Canvas>
  );
}
