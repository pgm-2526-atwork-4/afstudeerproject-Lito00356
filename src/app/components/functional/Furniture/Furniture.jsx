import RadialMenu from "@functional/RadialMenu/RadialMenu";
import "./Furniture.css";
import { TransformControls, useBounds, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import SaveTransform from "@design/Button/SaveTransform/SaveTransform";

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
  onSave,
  color,
  onColorChange,
}) => {
  const { scene } = useGLTF("/models/sofa.gltf");
  const transformRef = useRef();
  const primitiveRef = useRef();
  const groupRef = useRef();
  const [groupReady, setGroupReady] = useState(null);
  const [translationMode, setTranslationMode] = useState("translate");
  const [boxSize, setBoxSize] = useState([1, 1, 1]);
  const bounds = useBounds();
  const [hasMoved, setHasMoved] = useState(false);

  const halfWidth = boxSize[0] / 1.4;
  const halfHeight = boxSize[1] / 1.5;

  useEffect(() => {
    if (groupRef.current) {
      setGroupReady(groupRef.current);
    }
  }, []);

  useEffect(() => {
    if (!scene) return;

    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    // eslint-disable-next-line
    setBoxSize([size.x * 1.4, size.y * 2.5, size.z * 1.4]);
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
      <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
        <primitive ref={primitiveRef} object={scene}>
          {isSelected && (
            <RadialMenu
              furnitureId={furnitureId}
              position={[0, 0, 0]}
              leftOffset={-halfWidth + 0.5}
              rightOffset={halfWidth - 1}
              height={halfHeight}
              onColorChange={onColorChange}
            />
          )}
          {isSelected && hasMoved && (
            <SaveTransform
              position={[1.5, boxSize[1] - 1.5, 1]}
              onSave={() => {
                const pos = groupRef.current?.position;
                const rot = groupRef.current?.rotation;
                if (pos && rot) {
                  onTransformChange(furnitureId, {
                    position: [pos.x, Math.max(0, pos.y), pos.z],
                    rotation: [rot.x, rot.y, rot.z],
                  });
                }
                onSave?.();
                setHasMoved(false);
              }}
            />
          )}
        </primitive>
        <mesh
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
      </group>

      {isSelected && groupReady && (
        <TransformControls
          ref={transformRef}
          object={groupReady}
          mode={translationMode}
          size={0.5}
          onObjectChange={() => {
            setHasMoved(true);
            const pos = groupRef.current?.position;
            const rot = groupRef.current?.rotation;

            if (pos && pos.y < 0) {
              groupRef.current.position.y = 0;
            }

            if (pos || rot) {
              onTransformChange(furnitureId, {
                position: [pos.x, Math.max(0, pos.y), pos.z],
                rotation: [rot.x, rot.y, rot.z],
              });
            }
          }}
        />
      )}
    </group>
  );
};

export default Furniture;
