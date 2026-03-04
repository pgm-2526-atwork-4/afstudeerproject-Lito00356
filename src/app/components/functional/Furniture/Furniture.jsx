import { TransformControls, useGLTF } from "@react-three/drei";
import React from "react";

const Furniture = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  const { scene } = useGLTF("/models/sofa.gltf");

  return (
    <>
      <primitive object={scene} position={position} scale={scale} rotation={rotation} />;
      <TransformControls mode="translate" object={scene} size={0.5} />
    </>
  );
};

export default Furniture;
