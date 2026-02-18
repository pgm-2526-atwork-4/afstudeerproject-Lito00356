import { Canvas } from "@react-three/fiber";
import "./perspective.css";
import React from "react";
import { OrbitControls } from "@react-three/drei";
import { Scene } from "three";

const Perspective = () => {
  return (
    <>
      <mesh scale={[2, 4, 4]}>
        <boxGeometry />
        <meshBasicMaterial color="yellow" />
      </mesh>
      <OrbitControls />
    </>
  );
};

export default Perspective;
