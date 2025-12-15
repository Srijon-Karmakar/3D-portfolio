// src/components/CubebotModel.jsx
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// adjust path if needed
useGLTF.preload("/cubebot.glb");

export default function CubebotModel(props) {
  const group = useRef();
  const { scene } = useGLTF("/cubebot.glb");

  const headRef = useRef(null);

  // find the head object from Blender ("Head" as in your outliner)
  useEffect(() => {
    const head = scene.getObjectByName("Head");
    if (head) {
      headRef.current = head;
    }

    const eyeL = scene.getObjectByName("Eye_L");
    const eyeR = scene.getObjectByName("Eye_R");

    [eyeL, eyeR].forEach((eye) => {
      if (eye && eye.material && eye.material.isMeshStandardMaterial) {
        eye.material.emissive = new THREE.Color("#ffffff");
        eye.material.emissiveIntensity = 4; // tweak for glow strength
      }
    });


  }, [scene]);

  useFrame((state) => {
    const { x, y } = state.pointer; // -1..1 normalized

    // small idle sway for whole body
    if (group.current) {
      const t = state.clock.getElapsedTime();
      const idleTilt = Math.sin(t * 0.7) * 0.05; // gentle breathing
      group.current.rotation.x = idleTilt;
    }

    // make head follow cursor
    if (headRef.current) {
      const targetHeadY = x * 0.6;   // left-right
      const targetHeadX = -y * 0.35; // up-down
      const damping = 1.32;

      headRef.current.rotation.y = THREE.MathUtils.lerp(
        headRef.current.rotation.y,
        targetHeadY,
        damping
      );

      headRef.current.rotation.x = THREE.MathUtils.lerp(
        headRef.current.rotation.x,
        targetHeadX,
        damping
      );
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} />
    </group>
  );
}
