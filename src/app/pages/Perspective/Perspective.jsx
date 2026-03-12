import "@style/theme.css";
import "./perspective.css";
import { Canvas } from "@react-three/fiber";
import React, { useState } from "react";
import { Bounds, KeyboardControls, OrbitControls, Select, Wireframe } from "@react-three/drei";
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
import { useOnboarding } from "@core/hooks/useOnboarding";
import { ONBOARDING_STEPS } from "@core/config/onboardingSteps";
import OnboardingModal from "@design/OnboardingModal/OnboardingModal";
import MenuSave from "@design/MenuSave/MenuSave";
import TutorialBtn from "@design/Button/TutorialBtn/TutorialBtn";
import ObjectOptions from "@design/Button/ObjectOptions/ObjectOptions";

const keyMap = [
  { name: "translate", keys: ["w"] },
  { name: "rotate", keys: ["r"] },
];

const Perspective = () => {
  const { auth } = useAuth();
  const user = auth.user;
  const { projectId } = useParams();
  const projectNumberId = Number(projectId);
  const saveRoom = useSaveRoom();

  const {
    data: project,
    isPending,
    error,
  } = useQuery({
    queryKey: ["project", projectNumberId],
    queryFn: () => getProjectById(projectNumberId),
  });

  const [selectedObject, setSelectedObject] = useState(null);
  const [outlineSelection, setOutlineSelection] = useState([]);
  const [furniture, setFurniture] = useLocalFurniture(projectId) ?? [];

  async function handleSave() {
    const body = {
      id: project?.id,
      user_id: user.id,
      scene_name: project?.scene_name,
      room_data: project?.room_data,
      objects: { furniture },
    };

    saveRoom.mutate(body);
  }

  const addFurniture = () => {
    const newObject = {
      id: `sofa-${Date.now()}`,
      type: "sofa",
      position: [5, 0, 5],
      scale: [0.5, 0.5, 0.5],
      rotation: [0, 0, 0],
      color: "rgba(240, 240, 240, 1)",
    };

    setFurniture((prev) => [...prev, newObject]);
  };

  const handleTransformChange = (furnitureId, changes) => {
    setFurniture((prev) => prev.map((item) => (item.id === furnitureId ? { ...item, ...changes } : item)));
  };

  const handleSelect = (id, meshRef) => {
    setSelectedObject(id);

    const meshes = [];
    meshRef?.traverse?.((child) => {
      if (child.isMesh) {
        meshes.push(child);
      }
    });
    setOutlineSelection(meshes);
  };

  const handleDeselect = () => {
    setSelectedObject(null);
    setOutlineSelection([]);
  };

  const handleColorChange = (furnitureId, color) => {
    setFurniture((prev) => prev.map((item) => (item.id === furnitureId ? { ...item, color } : item)));
  };

  const handleFurnitureDelete = (id) => {
    setFurniture((prev) => prev.filter((item) => item.id !== id));
    handleDeselect();
  };

  const handleResetRotation = (id) => {
    handleTransformChange(id, { rotation: [0, 0, 0] });
  };

  // Onboarding
  const onboardingSteps = ONBOARDING_STEPS.perspective;
  const [skipChecked, setSkipChecked] = useState(false);
  const { isVisible, currentStep, nextStep, prevStep, skip, close, reopen } = useOnboarding("perspective");

  if (isPending) return <p>Laden...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!project) return <p>Project {projectId} not found</p>;

  return (
    <div className="canvas-page">
      <TitleBadge title="perspective" />

      <KeyboardControls map={keyMap}>
        <Canvas
          dpr={[1, 2]}
          className="canvas"
          camera={{ position: [10, 6, 10], fov: 50 }}
          style={{ width: "100vw", height: "100vh" }}
        >
          <EffectComposer multisampling={8} autoClear={false}>
            <Outline
              selection={outlineSelection}
              visibleEdgeColor="orange"
              hiddenEdgeColor="orange"
              edgeStrength={3}
              width={1000}
            />
          </EffectComposer>
          <directionalLight position={[3.3, 1.0, 4.4]} castShadow intensity={2} />
          <pointLight position={[0, 8, 0]} color="#ffff00" intensity={1} />
          {/* <Scene /> */}
          <mesh>
            <Ground
              // Dat werkt toch nog niet zo goed
              onPointerMissed={() => {
                setSelectedObject(null);
                setOutlineSelection([]);
              }}
            />
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
          <Bounds margin={2}>
            {furniture.map((item) => (
              <Select key={item.id} enabled={selectedObject === item.id}>
                <Furniture
                  key={item.id}
                  furnitureId={item.id}
                  color={item.color ?? "rgba(240, 240, 240, 1)"}
                  position={item.position}
                  scale={item.scale}
                  rotation={item.rotation}
                  isSelected={selectedObject === item.id}
                  onSelect={(meshRef) => handleSelect(item.id, meshRef)}
                  onDeselect={handleDeselect}
                  onTransformChange={handleTransformChange}
                  onColorChange={handleColorChange}
                />
              </Select>
            ))}
          </Bounds>

          <OrbitControls target={[0, 0, 0]} maxPolarAngle={Math.PI / 2} makeDefault />
        </Canvas>
      </KeyboardControls>
      <div className="ui-overlay">
        <OnboardingModal
          isVisible={isVisible}
          title={onboardingSteps[currentStep]?.title}
          description={onboardingSteps[currentStep]?.description}
          currentStep={currentStep}
          totalSteps={onboardingSteps.length}
          onNext={() => nextStep(onboardingSteps.length)}
          onPrev={prevStep}
          onClose={() => (skipChecked ? skip(true) : close())}
          skipChecked={skipChecked}
          onSkipChange={setSkipChecked}
        />
        <TutorialBtn onReset={reopen} />
        <MenuProfile />
        <MenuFurniture handleAddFurniture={addFurniture} />
        <MenuSave onSave={handleSave} />
        <ObjectOptions
          isVisible={!!selectedObject}
          onDelete={() => handleFurnitureDelete(selectedObject)}
          onResetRotation={() => handleResetRotation(selectedObject)}
        />
      </div>
    </div>
  );
};

export default Perspective;
