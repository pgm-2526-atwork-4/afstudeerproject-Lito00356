import { TransformControls, useBounds, useGLTF } from "@react-three/drei";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OPENING_MODELS } from "@core/utils/openingModels";
import ConfirmTransform from "@design/Button/SaveTransform/ConfirmTransform";

const WallOpening = ({
  position = [0, 1.2, 0],
  rotation = [0, 0, 0],
  width = 1,
  height = 1,
  depth = 0.3,
  modelType = "standard_single",
  isSelected,
  onSelect,
  onDeselect,
  onTransformChange,
  onSave,
  furnitureId,
}) => {
  const groupRef = useRef();
  const transformRef = useRef();
  const bounds = useBounds();
  const [groupReady, setGroupReady] = useState(null);
  const isDragging = useRef(false);
  const [hasMoved, setHasMoved] = useState(false);
  const initialTransform = useRef({ position, rotation });

  const modelConfig = OPENING_MODELS[modelType];
  const { scene } = useGLTF(modelConfig?.path);

  const model = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if (!child.isMesh) return;
      child.material = child.material.clone();
      child.material.side = THREE.DoubleSide;
    });
    return cloned;
  }, [scene]);

  const modelOffset = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    return [-center.x, -center.y, -center.z];
  }, [scene]);

  useEffect(() => {
    if (!model) return;
    model.traverse((child) => {
      if (!child.isMesh) return;
      const mat = child.material;
      const isGlass =
        mat.transparent ||
        mat.opacity < 1 ||
        mat.name?.toLowerCase().includes("glass") ||
        mat.name?.toLowerCase().includes("glas");
      child.castShadow = !isGlass;
      child.receiveShadow = true;
    });
  }, [model]);

  useEffect(() => {
    if (groupRef.current) {
      setGroupReady(groupRef.current);
    }
  }, []);

  const handleOnReset = () => {
    const { position: initPos, rotation: initRot } = initialTransform.current;
    if (groupRef.current) {
      groupRef.current.position.set(...initPos);
      groupRef.current.rotation.set(...initRot);
    }
    onTransformChange(furnitureId, initPos);
  };

  const handleOnSave = () => {
    const pos = groupRef.current?.position;
    const rot = groupRef.current?.rotation;
    if (pos && rot) {
      const newPos = [pos.x, Math.max(0, pos.y), pos.z];
      onTransformChange(furnitureId, newPos);
      initialTransform.current = { position: newPos, rotation: rotation };
    }
  };

  return (
    <group>
      <group ref={groupRef} position={position} rotation={rotation}>
        <primitive object={model} position={modelOffset} rotation={modelConfig?.rotationOffset ?? [0, 0, 0]} />

        <mesh
          visible={false}
          castShadow={false}
          onClick={(e) => {
            e.stopPropagation();
            if (isDragging.current) return;
            if (!isSelected) {
              bounds.refresh(e.object).fit();
              onSelect(groupRef.current);
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
          <boxGeometry castShadow args={[Math.max(0.6, width), Math.max(0.6, height), Math.max(0.6, depth)]} />
          <meshBasicMaterial />
        </mesh>
      </group>

      {isSelected && hasMoved && (
        <ConfirmTransform
          position={[position[0], position[1] + 0.8, position[2]]}
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

      {isSelected && groupReady && (
        <TransformControls
          ref={transformRef}
          object={groupReady}
          mode="translate"
          space="local"
          size={0.55}
          showZ={true}
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
            if (!pos) return;
            onTransformChange(furnitureId, [pos.x, pos.y, pos.z]);
          }}
        />
      )}
    </group>
  );
};

export default WallOpening;
