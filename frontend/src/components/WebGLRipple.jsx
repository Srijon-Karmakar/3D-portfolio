import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { rippleVertex, rippleFragment } from "../shaders/rippleShader";

function RipplePlane({ click }) {
  const mesh = useRef();
  const { viewport } = useThree();

  const material = useRef(
    new THREE.ShaderMaterial({
      vertexShader: rippleVertex,
      fragmentShader: rippleFragment,
      uniforms: {
        uTexture: { value: null },
        uCenter: { value: new THREE.Vector2(0.5, 0.5) },
        uTime: { value: 0 },
        uStrength: { value: 0 },
      },
    })
  );

  useEffect(() => {
    if (!click) return;
    material.current.uniforms.uCenter.value.set(
      click.x / window.innerWidth,
      1 - click.y / window.innerHeight
    );
    material.current.uniforms.uStrength.value = click.strength;
  }, [click]);

  useFrame((_, delta) => {
    material.current.uniforms.uTime.value += delta;
    material.current.uniforms.uStrength.value *= 0.96;
  });

  return (
    <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry />
      <primitive object={material.current} attach="material" />
    </mesh>
  );
}

export default function WebGLRipple({ click }) {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 100 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {click && <RipplePlane click={click} />}
    </Canvas>
  );
}
