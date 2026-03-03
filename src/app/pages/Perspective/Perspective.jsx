import { Canvas, useThree } from "@react-three/fiber";
import "@style/theme.css";
import "./perspective.css";
import React, { useEffect, useState } from "react";
import { OrbitControls, Wireframe } from "@react-three/drei";
import MenuProfile from "@design/MenuProfile/MenuProfile";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProjectById, uploadProject } from "@core/modules/projects/api.projects";
import useAuth from "@functional/auth/useAuth";
import { useLocation, useParams } from "react-router";
import Ground from "@design/Ground/Ground";
import TitleBadge from "@design/TitleBadge/TitleBadge";
import Room3D from "../../components/functional/Room3D/Room3D";

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

  return <></>;
}

const Perspective = () => {
  const [boxes, setBoxes] = useState([]);
  const queryClient = useQueryClient();
  const { auth } = useAuth();
  const user = auth.user;
  const { projectId } = useParams();
  const location = useLocation();
  const blueprintData = location.state;

  const {
    data: project,
    isPending,
    error,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
  });

  const saveRoom = useMutation({
    mutationFn: uploadProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-room"] });
    },
  });

  async function handleSave() {
    const body = {
      user_id: user.id,
      scene_name: "boxTest",
      objects: { boxes },
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

  if (isPending) return <p>Loading...</p>;
  if (error || !project) return <p>Could not load project</p>;

  return (
    <div className="canvas-page">
      <TitleBadge title="perspective" />
      <Canvas className="canvas" camera={{ position: [10, 6, 10], fov: 50 }} style={{ width: "100vw", height: "100vh" }}>
        <ambientLight intensity={1} />
        <Scene />
        <mesh>
          <Ground />
        </mesh>

        <Room3D vertices={getPolygonVertices(blueprintData.walls, blueprintData.points)} height={2.5} />

        {project?.objects?.boxes?.map((box) => (
          <mesh key={box.id} position={box.position} rotation={box.rotation} scale={box.scale}>
            <boxGeometry />
            <meshStandardMaterial color={box.color} />
            <Wireframe fillMix={0} stroke={"black"} thickness={0.02} />
          </mesh>
        ))}
        <OrbitControls target={[0, 0, 0]} maxPolarAngle={Math.PI / 2} />
      </Canvas>
      <div className="ui-overlay">
        <MenuProfile />
        <button className="add-block-btn">+ Voeg blokje toe</button>
        <button className="save-btn" onClick={() => handleSave()}>
          Sla blokje op
        </button>
      </div>
    </div>
  );
};

export default Perspective;
