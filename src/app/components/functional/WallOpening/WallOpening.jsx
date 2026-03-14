import { TransformControls, useBounds, useGLTF } from "@react-three/drei";
import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { OPENING_MODELS } from "@core/utils/openingModels";

const WallOpening = ({
  id,
  position = [0, 1.2, 0],
  rotation = [0, 0, 0],
  width = 1,
  height = 1,
  depth = 0.3,
  modelType = "standard_single",
  isSelected,
  onSelect,
  onDeselect,
  onTransform,
}) => {
  const groupRef = useRef();
  const transformRef = useRef();
  const bounds = useBounds();
  const [groupReady, setGroupReady] = useState(null);
  const isDragging = useRef(false);

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
    if (groupRef.current) {
      setGroupReady(groupRef.current);
    }
  }, []);

  return (
    <group>
      <group ref={groupRef} position={position} rotation={rotation}>
        <primitive object={model} position={modelOffset} rotation={modelConfig?.rotationOffset ?? [0, 0, 0]} />

        <mesh
          visible={false}
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
          <boxGeometry args={[Math.max(0.6, width), Math.max(0.6, height), Math.max(0.6, depth)]} />
          <meshBasicMaterial />
        </mesh>
      </group>

      {isSelected && groupReady && (
        <TransformControls
          ref={transformRef}
          object={groupReady}
          mode="translate"
          space="local"
          size={0.55}
          showZ={true}
          onMouseDown={() => { isDragging.current = true; }}
          onMouseUp={() => { setTimeout(() => { isDragging.current = false; }, 50); }}
          onObjectChange={() => {
            const pos = groupRef.current?.position;
            if (!pos) return;
            onTransform(id, [pos.x, pos.y, pos.z]);
          }}
        />
      )}
    </group>
  );
};

export default WallOpening;
