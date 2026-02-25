import { Canvas, useThree } from "@react-three/fiber";
import "@style/theme.css";
import "./perspective.css";
import React, { useEffect, useState } from "react";
import { OrbitControls, Wireframe } from "@react-three/drei";
import MenuProfile from "@design/MenuProfile/MenuProfile";

function Scene() {
  const { setSize } = useThree();

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [setSize]);

  return (
    <>
      <mesh scale={[10, 10, 0]} rotation-x={Math.PI * 1.5} position={[0, -2, 0]}>
        <planeGeometry />
        <meshBasicMaterial color={"white"} />
      </mesh>
    </>
  );
}

const Perspective = () => {
  const [boxes, setBoxes] = useState([]);

  function addCube() {
    const newCube = {
      id: crypto.randomUUID(),
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [5, 4, 3],
      color: "red",
    };

    setBoxes((prev) => [...prev, newCube]);
  }

  function saveCube() {
    console.log("hello");
  }

  return (
    <div className="canvas-page">
      <Canvas className="canvas">
        <ambientLight intensity={1} />
        <Scene />
        <mesh scale={[5, 0, 5]}>
          <plane />
        </mesh>
        {boxes.map((box) => (
          <mesh key={box.id} position={box.position} rotation={box.rotation} scale={box.scale}>
            <boxGeometry />
            <meshStandardMaterial color={box.color} />
            <Wireframe fillMix={0} stroke={"black"} thickness={0.02} />
          </mesh>
        ))}
        <OrbitControls />
      </Canvas>
      <div className="ui-overlay">
        <MenuProfile />
        <button className="add-block-btn" onClick={() => addCube()}>
          + Voeg blokje toe
        </button>
        <button className="save-btn" onClick={() => saveCube()}>
          Sla blokje op
        </button>
      </div>
    </div>
  );
};

export default Perspective;
