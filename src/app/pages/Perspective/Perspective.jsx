import "@style/theme.css";
import "./perspective.css";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { OrbitControls, useGLTF, Wireframe } from "@react-three/drei";
import MenuProfile from "@design/MenuProfile/MenuProfile";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectById } from "@core/modules/projects/api.projects";
import useAuth from "@functional/auth/useAuth";
import { useLocation, useParams } from "react-router";
import Ground from "@design/Ground/Ground";
import TitleBadge from "@design/TitleBadge/TitleBadge";
import Room3D from "@functional/Room3D/Room3D";
import Furniture from "@functional/Furniture/Furniture";
import MenuFurniture from "@design/MenuFurniture/MenuFurniture";
import { useSaveRoom } from "@core/hooks/useSaveRoom";

useGLTF.preload("/models/sofa.gltf");

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
  const [furniture, setFurniture] = useState([]);
  const { auth } = useAuth();
  const user = auth.user;
  const { projectId } = useParams();
  const id = Number(projectId);
  // const location = useLocation();
  // const blueprintData = location.state;
  const saveRoom = useSaveRoom();

  const {
    data: project,
    isPending,
    error,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
  });

  // const saveRoom = useMutation({
  //   mutationFn: uploadProject,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["user-room"] });
  //   },
  // });

  async function handleSave() {
    console.log("project saved");

    const body = {
      user_id: user.id,
      scene_name: "boxTest",
      objects: { furniture },
    };

    saveRoom.mutate(body);
  }

  const getPolygonVertices = (walls, points) => {
    if (!walls?.length || !points?.length) {
      return [];
    }

    const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
    const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

    const vertices = points.map((point) => {
      const relX = (point.x - centerX) / 100;
      const relZ = (point.y - centerY) / 100;
      return [relX, 0, relZ];
    });

    return vertices;
  };

  const addFurniture = () => {
    const newSofa = {
      id: `sofa-${Date.now()}`,
      type: "sofa",
      position: [2, 0, 2],
      scale: [1, 1, 1],
      rotation: [0, 0, 0],
    };
    console.log("succesfully added sofa");

    setFurniture((prev) => [...prev, newSofa]);
  };

  if (isPending) return <p>Laden...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!project) return <p>Project {projectId} niet gevonden</p>;

  return (
    <div className="canvas-page">
      <TitleBadge title="perspective" />
      <MenuFurniture handleAddFurniture={addFurniture} />
      <Canvas className="canvas" camera={{ position: [10, 6, 10], fov: 50 }} style={{ width: "100vw", height: "100vh" }}>
        <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={2} />
        {/* <Scene /> */}
        <mesh>
          <Ground />
        </mesh>

        {project?.room_data && <Room3D vertices={getPolygonVertices(project.room_data.points)} />}
        {furniture.map((item) => (
          <Furniture key={item.id} position={item.position} scale={item.scale} rotation={item.rotation} />
        ))}

        <OrbitControls target={[0, 0, 0]} maxPolarAngle={Math.PI / 2} makeDefault />
      </Canvas>
      <div className="ui-overlay">
        <MenuProfile />
        <button className="save-btn" onClick={() => handleSave()}>
          Sla blokje op
        </button>
      </div>
    </div>
  );
};

export default Perspective;
