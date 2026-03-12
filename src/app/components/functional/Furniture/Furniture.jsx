import RadialMenu from "@functional/RadialMenu/RadialMenu";
import "./Furniture.css";
import { TransformControls, useBounds, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

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
  const [boxSize, setBoxSize] = useState([1, 1, 1]);
  const bounds = useBounds();

  const halfWidth = boxSize[0] / 1.4;
  const halfHeight = boxSize[1];

  useEffect(() => {
    if (primitiveRef.current) {
      setPrimitiveReady(primitiveRef.current);
    }
  }, []);

  useEffect(() => {
    if (!scene) return;

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector2();
    box.getSize(size);
    // eslint-disable-next-line
    setBoxSize([size.x, size.y * 2, size.z]);
  }, [scene]);

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
      <primitive ref={primitiveRef} object={scene} position={position} scale={scale} rotation={rotation}>
        {isSelected && (
          <RadialMenu
            furnitureId={furnitureId}
            position={position}
            leftOffset={-halfWidth}
            rightOffset={halfWidth - 0.5}
            height={halfHeight}
            onColorChange={onColorChange}
          />
        )}
      </primitive>
      <mesh
        position={position}
        rotation={rotation}
        visible={false}
        onClick={(e) => {
          e.stopPropagation();
          if (!isSelected) {
            bounds.refresh(e.object).fit();
            onSelect(primitiveRef.current);
          } else {
            onDeselect();
          }
        }}
        onPointerEnter={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "pointer";
        }}
        onPointerLeave={(e) => {
          e.stopPropagation();
          document.body.style.cursor = "default";
        }}
      >
        <boxGeometry args={boxSize} />
        <meshBasicMaterial />
      </mesh>

      {isSelected && primitiveReady && (
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
                  position: [pos.x, Math.max(0, pos.y), pos.z],
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
