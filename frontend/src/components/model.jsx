import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import React, { useRef } from "react";

export default function RobotModel() {
  const group = useRef();
  const headRef = useRef();
  const eyeL = useRef();
  const eyeR = useRef();

  const { scene, nodes } = useGLTF("/robot.glb");
  const { pointer, viewport } = useThree();

  useFrame(() => {
    const target = new THREE.Vector3(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2,
      2
    );

    // HEAD follows cursor
    const current = headRef.current.quaternion.clone();
    headRef.current.lookAt(target);
    const targetQuat = headRef.current.quaternion.clone();
    headRef.current.quaternion.copy(current);
    headRef.current.quaternion.slerp(targetQuat, 0.08);

    // EYES follow cursor more strongly
    eyeL.current.lookAt(target);
    eyeR.current.lookAt(target);
  });

  return (
    <group ref={group} position={[0.9, -10.3, 0]} scale={.2}>
      <primitive ref={headRef} object={nodes.Head} />
      <primitive ref={eyeL} object={nodes.Eye_L} />
      <primitive ref={eyeR} object={nodes.Eye_R} />
      <primitive object={nodes.body} />
      <primitive object={nodes.led1} />
      <primitive object={nodes.led2} />
    </group>
  );
}
