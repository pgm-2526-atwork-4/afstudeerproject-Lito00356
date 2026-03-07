import RadialMenu from "@functional/RadialMenu/RadialMenu";
import "./Furniture.css";
import { TransformControls, useGLTF } from "@react-three/drei";
import React, { useRef } from "react";

useGLTF.preload("/models/sofa.gltf");

const Furniture = ({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  furnitureId,
  isSelected,
  onSelect,
  onDeselect,
}) => {
  const object = useRef();
  const { scene } = useGLTF("/models/sofa.gltf");

  return (
    <mesh
      onClick={(e) => {
        e.stopPropagation();
        isSelected ? onDeselect() : onSelect();
      }}
    >
      <primitive object={scene} position={position} scale={scale} rotation={rotation} ref={object} />
      {isSelected && (
        <>
          <TransformControls mode="translate" object={scene} size={0.5} />
        </>
      )}
      <RadialMenu furnitureId={furnitureId} position={position} offsetX={0.8} offsetY={0.5} />
    </mesh>
  );
};

export default Furniture;
