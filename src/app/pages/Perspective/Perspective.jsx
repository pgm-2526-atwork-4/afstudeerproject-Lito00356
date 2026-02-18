import { Canvas } from "@react-three/fiber";
import "./perspective.css";
import React from "react";

const Perspective = () => {
  return (
    <>
      <mesh scale={[2, 4, 4]}>
        <boxGeometry />
        <meshBasicMaterial color="yellow" />
      </mesh>
    </>
  );
};

export default Perspective;
