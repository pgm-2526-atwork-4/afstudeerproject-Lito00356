import { TransformControls, useGLTF } from "@react-three/drei";
import React from "react";

const Furniture = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  const { scene } = useGLTF("/models/sofa.gltf");

  scene.traverse((child) => {
    if (child.material) {
      child.material.map = null;
      child.material.visible = true;
    }
  });

  return (
    <>
      <primitive object={scene} position={position} scale={scale} rotation={rotation} />;
      <TransformControls object={scene} />
    </>
  );
};

export default Furniture;
