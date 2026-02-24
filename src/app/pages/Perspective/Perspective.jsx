import { Canvas } from "@react-three/fiber";
import "@style/theme.css";
import "./perspective.css";
import React from "react";
import { OrbitControls } from "@react-three/drei";

const Perspective = () => {
  return (
    <>
      <Canvas className="canvas">
        <mesh scale={[2, 4, 4]}>
          <boxGeometry />
          <meshBasicMaterial color="yellow" />
        </mesh>
        <OrbitControls />
      </Canvas>
    </>
  );
};

export default Perspective;
