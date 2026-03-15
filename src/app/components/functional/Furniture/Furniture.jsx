import RadialMenu from "@functional/RadialMenu/RadialMenu";
import "./Furniture.css";
import { TransformControls, useBounds, useGLTF } from "@react-three/drei";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import ConfirmTransform from "@design/Button/SaveTransform/ConfirmTransform";

useGLTF.preload("/models/couches/sofa/sofa.gltf");

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
  const { scene: originalScene } = useGLTF("/models/couches/sofa/sofa.gltf");
  const scene = useMemo(() => originalScene.clone(), [originalScene]);
  const transformRef = useRef();
  const primitiveRef = useRef();
  const groupRef = useRef();
  const [groupReady, setGroupReady] = useState(null);
  const [translationMode, setTranslationMode] = useState("translate");
  const bounds = useBounds();
  const [hasMoved, setHasMoved] = useState(false);
  const isDragging = useRef(false);
  const initialTransform = useRef({ position, rotation });

  const { boxSize, boxOffset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(originalScene);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    return {
      boxSize: [size.x, size.y, size.z],
      boxOffset: [center.x, center.y, center.z],
    };
  }, [originalScene]);

  const halfWidth = boxSize[0] / 1.3;
  const halfHeight = boxSize[1];

  useEffect(() => {
    if (groupRef.current) {
      setGroupReady(groupRef.current);
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

  const handleOnReset = () => {
    const { position: initPos, rotation: initRot } = initialTransform.current;
    if (groupRef.current) {
      groupRef.current.position.set(...initPos);
      groupRef.current.rotation.set(...initRot);
    }
    onTransformChange(furnitureId, {
      position: initPos,
      rotation: initRot,
    });
  };

  const handleOnSave = () => {
    const pos = groupRef.current?.position;
    const rot = groupRef.current?.rotation;
    if (pos && rot) {
      const newPos = [pos.x, Math.max(0, pos.y), pos.z];
      const newRot = [rot.x, rot.y, rot.z];
      onTransformChange(furnitureId, {
        position: newPos,
        rotation: newRot,
      });
      initialTransform.current = { position: newPos, rotation: newRot };
    }
  };

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
            <ConfirmTransform
              position={[0, boxSize[1], -1]}
              onReset={() => {
                handleOnReset();
                setHasMoved(false);
              }}
              onSave={() => {
                handleOnSave();
                onSave?.();
                setHasMoved(false);
              }}
            />
          )}
        </primitive>
        <mesh
          position={boxOffset}
          visible={false}
          onClick={(e) => {
            e.stopPropagation();
            if (isDragging.current) return;
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
          onMouseDown={() => {
            isDragging.current = true;
          }}
          onMouseUp={() => {
            setTimeout(() => {
              isDragging.current = false;
            }, 50);
          }}
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
