import React, { useMemo } from "react";
import * as THREE from "three";

const Wall = ({ start, end, height, thickness }) => {
  const { position, rotation, length } = useMemo(() => {
    const dx = end[0] - start[0];
    const dz = end[2] - start[2];
    const wallLength = Math.sqrt(dx * dx + dz * dz);
    const angle = Math.atan2(dz, dx);

    // Extend each wall by half thickness on each side so corners meet
    const extendedLength = wallLength + thickness;

    const midX = (start[0] + end[0]) / 2;
    const midZ = (start[2] + end[2]) / 2;

    return {
      position: [midX, height / 2, midZ],
      rotation: [0, -angle, 0],
      length: extendedLength,
    };
  }, [start, end, height, thickness]);

  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[length, height, thickness]} />
      <meshStandardMaterial color="lightBlue" side={THREE.DoubleSide} />
    </mesh>
  );
};

const Floor = ({ walls }) => {
  const geometry = useMemo(() => {
    if (!walls.length) return null;

    const shape = new THREE.Shape();
    shape.moveTo(walls[0].start[0], -walls[0].start[2]);
    walls.forEach((wall) => {
      shape.lineTo(wall.end[0], -wall.end[2]);
    });

    return new THREE.ShapeGeometry(shape);
  }, [walls]);

  if (!geometry) return null;

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
      <meshStandardMaterial color="#e0d5c1" side={THREE.DoubleSide} />
    </mesh>
  );
};

const Room3D = ({ walls = [], wallThickness = 0.2, height = 2.5 }) => {
  return (
    <group>
      {walls.map((wall) => (
        <Wall key={wall.id} start={wall.start} end={wall.end} height={height} thickness={wallThickness} />
      ))}
      <Floor walls={walls} />
    </group>
  );
};

export default Room3D;
