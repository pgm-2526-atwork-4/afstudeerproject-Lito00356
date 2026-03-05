import { Wireframe } from "@react-three/drei";
import React, { useMemo } from "react";
import * as THREE from "three";

const Room3D = ({ vertices = [], wallThickness = 0.2, height = 2.5 }) => {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();

    vertices.forEach((vert, i) => {
      if (i === 0) {
        shape.moveTo(vert[0], vert[2]);
      } else {
        shape.lineTo(vert[0], vert[2]);
      }
    });
    const extrudeSettings = {
      depth: height,
      bevelEnabled: false,
      setps: 1,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [vertices, wallThickness, height]);

  return (
    <>
      <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]}>
        <meshStandardMaterial color="lightBlue" side={2} />
        <Wireframe />
      </mesh>
    </>
  );
};

export default Room3D;
