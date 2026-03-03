import { TransformControls } from "@react-three/drei";
import React, { useMemo, useRef } from "react";
import * as THREE from "three";

const Room3D = ({ vertices = [], height = 2.5 }) => {
  const geoRef = useRef();
  const shape = useMemo(() => {
    const newShape = new THREE.Shape();

    if (vertices.length === 0) {
      newShape.moveTo(0, 0);
      newShape.lineTo(4, 0);
      newShape.lineTo(4, 4);
      newShape.lineTo(0, 4);
      newShape.lineTo(0, 0);

      return newShape;
    }

    newShape.moveTo(vertices[0][0], vertices[0][2]);

    for (let i = 1; i < vertices.length; i++) {
      newShape.lineTo(vertices[i][0], vertices[i][2]);
    }

    newShape.lineTo(vertices[0][0], vertices[0][2]);

    return newShape;
  }, [vertices]);

  const geometry = useMemo(() => {
    const settings = { depth: height, bevelEnabled: false };
    return new THREE.ExtrudeGeometry(shape, settings);
  }, [shape, height]);

  return (
    <>
      <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]} position={[0, height, 0]} ref={geoRef}>
        <meshStandardMaterial color="lightBlue" />
      </mesh>
      <TransformControls object={geometry} />
    </>
  );
};

export default Room3D;
