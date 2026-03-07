import RadialMenu from "@functional/RadialMenu/RadialMenu";
import "./Furniture.css";
import { TransformControls, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";

useGLTF.preload("/models/sofa.gltf");

const Furniture = ({
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  furnitureId,
  isSelected,
  onSelect,
  onDeselect,
  onPositionChange,
}) => {
  const { scene } = useGLTF("/models/sofa.gltf");
  const transformRef = useRef();
  const primitiveRef = useRef();
  const [primitiveReady, setPrimitiveReady] = useState(null);

  useEffect(() => {
    if (primitiveRef.current) {
      setPrimitiveReady(primitiveRef.current);
    }
  }, []);

  return (
    <mesh>
      <primitive
        ref={primitiveRef}
        object={scene}
        position={position}
        scale={scale}
        rotation={rotation}
        onClick={(e) => {
          e.stopPropagation();
          isSelected ? onDeselect() : onSelect();
        }}
      />
      {isSelected && (
        <>
          <TransformControls
            ref={transformRef}
            object={primitiveReady}
            mode="translate"
            size={0.5}
            onObjectChange={() => {
              const pos = primitiveRef.current?.position;
              if (pos) {
                onPositionChange(furnitureId, [pos.x, pos.y, pos.z]);
              }
            }}
          />
        </>
      )}
      <RadialMenu furnitureId={furnitureId} position={position} offsetX={0.8} offsetY={0.5} />
    </mesh>
  );
};

export default Furniture;
