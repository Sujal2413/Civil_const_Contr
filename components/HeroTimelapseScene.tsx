"use client";

import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type HeroTimelapseSceneProps = {
  rippleActive: boolean;
};

function TimelapsePhotoPlane({ rippleActive }: HeroTimelapseSceneProps) {
  const texture = useLoader(THREE.TextureLoader, "/assets/hero-crane-sunset.png");
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: null },
          uTime: { value: 0 },
          uRipple: { value: 0 },
          uViewportAspect: { value: 1 },
          uImageAspect: { value: 3656 / 1928 }
        },
        vertexShader: `
          varying vec2 vUv;

          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          precision highp float;

          varying vec2 vUv;
          uniform sampler2D uTexture;
          uniform float uTime;
          uniform float uRipple;
          uniform float uViewportAspect;
          uniform float uImageAspect;

          vec2 coverUv(vec2 uv) {
            vec2 scale = vec2(1.0);
            if (uViewportAspect > uImageAspect) {
              scale.y = uImageAspect / uViewportAspect;
            } else {
              scale.x = uViewportAspect / uImageAspect;
            }

            return (uv - 0.5) * scale + 0.5;
          }

          void main() {
            vec2 origin = vec2(0.62, 0.16);
            vec2 toPixel = vUv - origin;
            float distanceFromButton = length(toPixel);
            vec2 direction = normalize(toPixel + 0.0001);
            float rippleWave = sin(distanceFromButton * 76.0 - uTime * 9.0);
            float rippleFalloff = exp(-distanceFromButton * 5.2);
            float ripple = rippleWave * rippleFalloff * uRipple;

            vec2 uv = coverUv(vUv);
            uv += direction * ripple * 0.018;
            uv += vec2(
              sin((uv.y + uTime * 0.06) * 20.0),
              cos((uv.x - uTime * 0.05) * 18.0)
            ) * 0.0018 * uRipple;

            vec4 photo = texture2D(uTexture, uv);
            float timelapse = 0.5 + 0.5 * sin(uTime * 0.42);
            float skyZone = smoothstep(0.32, 0.88, vUv.y);
            vec3 twilight = mix(photo.rgb, photo.rgb * vec3(0.56, 0.66, 0.96), timelapse * 0.42);
            twilight += vec3(0.035, 0.016, 0.075) * skyZone * timelapse;
            twilight *= 1.0 - (timelapse * 0.13);

            gl_FragColor = vec4(twilight, 1.0);
          }
        `
      }),
    []
  );
  const { size, viewport } = useThree();
  const ripple = useRef(0);
  const elapsed = useRef(0);

  useEffect(() => {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    material.uniforms.uTexture.value = texture;
  }, [material, texture]);

  useFrame((_, delta) => {
    elapsed.current += delta;
    ripple.current = THREE.MathUtils.damp(ripple.current, rippleActive ? 1 : 0, 6, delta);
    material.uniforms.uTime.value = elapsed.current;
    material.uniforms.uRipple.value = ripple.current;
    material.uniforms.uViewportAspect.value = size.width / size.height;
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height, 1, 1]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default function HeroTimelapseScene({ rippleActive }: HeroTimelapseSceneProps) {
  return (
    <Canvas
      className="hero-webgl"
      dpr={[1, 1.65]}
      gl={{ alpha: false, antialias: true, powerPreference: "high-performance" }}
    >
      <TimelapsePhotoPlane rippleActive={rippleActive} />
    </Canvas>
  );
}
