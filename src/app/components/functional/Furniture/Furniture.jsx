import "./Furniture.css";
import { Html, TransformControls, useGLTF } from "@react-three/drei";
import { BrickWall, Palette } from "lucide-react";
import React, { useRef } from "react";

useGLTF.preload("/models/sofa.gltf");

const Furniture = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  const object = useRef();
  const { scene } = useGLTF("/models/sofa.gltf");

  return (
    <>
      <primitive object={scene} position={position} scale={scale} rotation={rotation} ref={object}>
        <Html position={[0, 1, 0]} wrapperClass="container" distanceFactor={5}>
          <div className="color">
            <Palette />
          </div>
          <div className="material">
            <BrickWall />
          </div>
        </Html>
      </primitive>
      <TransformControls mode="translate" object={scene} size={0.5} />
    </>
  );
};

export default Furniture;
