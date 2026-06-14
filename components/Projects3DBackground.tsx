"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function AbstractBuilding() {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.1;
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }
  });

  return (
    <group ref={group}>
      {/* Central Core */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 4, 1.5]} />
        <meshBasicMaterial color="#33221c" wireframe transparent opacity={0.3} />
      </mesh>
      
      {/* Outer Structure */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[2.5, 3, 2.5]} />
        <meshBasicMaterial color="#e7794c" wireframe transparent opacity={0.15} />
      </mesh>

      {/* Accents */}
      <mesh position={[1.5, 1, 1.5]}>
        <boxGeometry args={[0.5, 2, 0.5]} />
        <meshBasicMaterial color="#a98a80" wireframe transparent opacity={0.4} />
      </mesh>
      <mesh position={[-1.5, 0, -1.5]}>
        <boxGeometry args={[0.8, 1.5, 0.8]} />
        <meshBasicMaterial color="#e7794c" wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export default function Projects3DBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas
        camera={{ position: [5, 3, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
      >
        <AbstractBuilding />
      </Canvas>
    </div>
  );
}
