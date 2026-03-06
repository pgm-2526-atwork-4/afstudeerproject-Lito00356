import "@style/theme.css";
import "./perspective.css";
import { Canvas } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { OrbitControls, Select, Wireframe } from "@react-three/drei";
import MenuProfile from "@design/MenuProfile/MenuProfile";
import { useQuery } from "@tanstack/react-query";
import { getProjectById } from "@core/modules/projects/api.projects";
import useAuth from "@functional/auth/useAuth";
import { useParams } from "react-router";
import Ground from "@design/Ground/Ground";
import TitleBadge from "@design/TitleBadge/TitleBadge";
import Room3D from "@functional/Room3D/Room3D";
import Furniture from "@functional/Furniture/Furniture";
import MenuFurniture from "@design/MenuFurniture/MenuFurniture";
import { useSaveRoom } from "@core/hooks/useSaveRoom";
import { useLocalFurniture } from "@core/hooks/useLocalFurniture";
import { EffectComposer, Outline } from "@react-three/postprocessing";

// function Scene() {
//   const { setSize } = useThree();

//   useEffect(() => {
//     const handleResize = () => {
//       setSize(window.innerWidth, window.innerHeight);
//     };

//     window.addEventListener("resize", handleResize);
//     handleResize();

//     return () => window.removeEventListener("resize", handleResize);
//   }, [setSize]);

//   return <></>;
// }

const Perspective = () => {
  const { auth } = useAuth();
  const user = auth.user;
  const { projectId } = useParams();
  const id = Number(projectId);
  const saveRoom = useSaveRoom();
  const [selectedObject, setSelectedObject] = useState(null);
  const cube = useRef();

  const {
    data: project,
    isPending,
    error,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
  });

  const [furniture, setFurniture] = useLocalFurniture(projectId);

  async function handleSave() {
    console.log("project saved");

    const body = {
      user_id: user.id,
      scene_name: project?.scene_name,
      room_data: project?.room_data,
      objects: { furniture },
    };

    saveRoom.mutate(body);
  }

  const addFurniture = () => {
    const newSofa = {
      id: `sofa-${Date.now()}`,
      type: "sofa",
      position: [5, 0, 2],
      scale: [0.5, 0.5, 0.5],
      rotation: [0, 0, 0],
    };

    setFurniture((prev) => [...prev, newSofa]);
  };

  if (isPending) return <p>Laden...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!project) return <p>Project {projectId} not found</p>;

  return (
    <div className="canvas-page">
      <TitleBadge title="perspective" />
      <MenuFurniture handleAddFurniture={addFurniture} />
      <Canvas
        dpr={[1, 2]}
        className="canvas"
        camera={{ position: [10, 6, 10], fov: 50 }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <EffectComposer multisampling={8} autoClear={false}>
          <Outline blur visibleEdgeColor="white" edgeStrength={100} width={500} />
        </EffectComposer>
        <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={2} />
        <pointLight position={[0, 8, 0]} color="#ffff00" intensity={1} />
        {/* <Scene /> */}
        <mesh>
          <Ground />
        </mesh>

        {project?.room_data && (
          <Room3D
            walls={project.room_data.walls.map((w) => ({
              id: w.id,
              start: [w.startPosition.x / 100, 0, w.startPosition.y / 100],
              end: [w.endPosition.x / 100, 0, w.endPosition.y / 100],
            }))}
            wallThickness={0.2}
          />
        )}

        {furniture.map((item) => (
          <Select key={item.id} enabled={selectedObject === item.id}>
            <Furniture
              key={item.id}
              position={item.position}
              scale={item.scale}
              rotation={item.rotation}
              isSelected={selectedObject === item.id}
              onSelect={() => setSelectedObject(item.id)}
              onDeselect={() => setSelectedObject(null)}
            />
          </Select>
        ))}

        <OrbitControls target={[0, 0, 0]} maxPolarAngle={Math.PI / 2} makeDefault />
      </Canvas>
      <div className="ui-overlay">
        <MenuProfile />
        <button className="save-btn" onClick={() => handleSave()}>
          Save scene
        </button>
      </div>
    </div>
  );
};

export default Perspective;
