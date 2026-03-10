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
  onTransformChange,
  color,
  onColorChange,
}) => {
  const { scene } = useGLTF("/models/sofa.gltf");
  const transformRef = useRef();
  const primitiveRef = useRef();
  const [primitiveReady, setPrimitiveReady] = useState(null);
  const [translationMode, setTranslationMode] = useState("translate");

  useEffect(() => {
    if (primitiveRef.current) {
      setPrimitiveReady(primitiveRef.current);
    }
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "w") setTranslationMode("translate");
      if (e.key === "r") setTranslationMode("rotate");
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!scene) return;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.material.color.set(color);
        child.material.needsUpdate = true;
      }
    });
  }, [color, scene]);

  return (
    <group>
      <primitive
        ref={primitiveRef}
        object={scene}
        position={position}
        scale={scale}
        rotation={rotation}
        onClick={(e) => {
          e.stopPropagation();
          isSelected ? onDeselect() : onSelect(primitiveRef.current);
        }}
      >
        <RadialMenu
          furnitureId={furnitureId}
          position={position}
          offsetX={0.8}
          offsetY={0.5}
          onColorChange={onColorChange}
        />
      </primitive>

      {isSelected && (
        <>
          <TransformControls
            ref={transformRef}
            object={primitiveReady}
            mode={translationMode}
            size={0.5}
            onObjectChange={() => {
              const pos = primitiveRef.current?.position;
              const rot = primitiveRef.current?.rotation;

              if (pos && pos.y < 0) {
                primitiveRef.current.position.y = 0;
              }

              if (pos || rot) {
                onTransformChange(furnitureId, {
                  position: [pos.x, pos.y, pos.z],
                  rotation: [rot.x, rot.y, rot.z],
                });
              }
            }}
          />
        </>
      )}
    </group>
  );
};

export default Furniture;
