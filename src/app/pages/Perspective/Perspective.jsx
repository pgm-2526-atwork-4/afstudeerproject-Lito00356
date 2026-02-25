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
  const [room, setRoom] = useState({
    objects: [],
  });

  function addCube() {
    setRoom((prev) => ({
      ...prev,
      objects: [
        ...prev.objects,
        {
          id: crypto.randomUUID(),
          type: "box",
          position: [0, 0, 0],
          color: "red",
        },
      ],
    }));
  }

  function saveCube() {
    console.log("hello");
  }

  return (
    <div className="canvas-page">
      <Canvas className="canvas">
        <Scene />
        <mesh scale={[5, 0, 5]}>
          <plane />
        </mesh>
        {room.objects.map((obj) => {
          switch (obj.type) {
            case "box":
              return (
                <mesh scale={[2, 4, 4]} key={obj.id}>
                  <boxGeometry />
                  <meshBasicMaterial color={obj.color} />
                  <Wireframe fillMix={0} stroke={"black"} thickness={0.02} />
                </mesh>
              );
            case "sphere":
              return <Sphere key={obj.id} {...obj} />;
          }
        })}
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
