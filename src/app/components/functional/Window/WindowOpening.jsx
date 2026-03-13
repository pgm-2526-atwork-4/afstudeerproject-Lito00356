import { TransformControls, useBounds } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";

const WindowOpening = ({
  id,
  position = [0, 1.2, 0],
  rotation = [0, 0, 0],
  width = 1,
  height = 1,
  depth = 0.3,
  isSelected,
  onSelect,
  onDeselect,
  onTransform,
}) => {
  const groupRef = useRef();
  const transformRef = useRef();
  const hitRef = useRef();
  const bounds = useBounds();
  const [groupReady, setGroupReady] = useState(null);

  useEffect(() => {
    if (groupRef.current) {
      setGroupReady(groupRef.current);
    }
  }, []);

  return (
    <group>
      <group ref={groupRef} position={position} rotation={rotation}>
        <mesh>
          <boxGeometry args={[width, height, depth]} />
          <meshStandardMaterial color="#59c3c3" transparent opacity={0.45} visible={false} />
        </mesh>

        <mesh
          ref={hitRef}
          visible={false}
          onClick={(e) => {
            e.stopPropagation();
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

export default WindowOpening;
