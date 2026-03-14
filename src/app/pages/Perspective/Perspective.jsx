import "@style/theme.css";
import "./perspective.css";
import { Canvas } from "@react-three/fiber";
import React, { useMemo, useState } from "react";
import { Bounds, KeyboardControls, OrbitControls, Select } from "@react-three/drei";
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
import { EffectComposer, Outline } from "@react-three/postprocessing";
import { useOnboarding } from "@core/hooks/useOnboarding";
import { ONBOARDING_STEPS } from "@core/config/onboardingSteps";
import OnboardingModal from "@design/OnboardingModal/OnboardingModal";
import MenuSave from "@design/MenuSave/MenuSave";
import TutorialBtn from "@design/Button/TutorialBtn/TutorialBtn";
import ObjectOptions from "@design/Button/ObjectOptions/ObjectOptions";
import WindowOpening from "@functional/Window/WindowOpening";
import { buildWallsFromProject, ROOM_HEIGHT } from "@core/utils/wallGeometry";
import { useWindows } from "@core/hooks/useWindows";
import { useFurnitureManager } from "@core/hooks/useFurnitureManager";
import { useSelection } from "@core/hooks/useSelection";

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

  const walls = useMemo(() => buildWallsFromProject(project), [project]);

  const { selectedObject, outlineSelection, handleSelect, handleDeselect } = useSelection();
  const { furniture, addFurniture, handleTransformChange, handleColorChange, handleFurnitureDelete, handleResetRotation } =
    useFurnitureManager(projectId, project);
  const { windows, addWindow, handleWindowTransform, handleWindowDelete } = useWindows(projectId, project, walls);

  const handleSave = () => {
    saveRoom.mutate({
      id: project?.id,
      user_id: user.id,
      scene_name: project?.scene_name,
      room_data: project?.room_data,
      objects: { furniture, windows },
    });
  };

  const handleObjectDelete = (id) => {
    const isWindow = windows.some((item) => item.id === id);
    if (isWindow) {
      handleWindowDelete(id);
    } else {
      handleFurnitureDelete(id);
    }
    handleDeselect();
  };

  const handleObjectResetRotation = (id) => {
    const isWindow = windows.some((item) => item.id === id);
    if (!isWindow) {
      handleResetRotation(id);
    }
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
          <mesh>
            <Ground onPointerMissed={handleDeselect} />
          </mesh>

          {project?.room_data && <Room3D walls={walls} wallThickness={0.2} height={ROOM_HEIGHT} openings={windows} />}

          <Bounds margin={2}>
            {windows.map((windowItem) => (
              <Select key={windowItem.id} enabled={selectedObject === windowItem.id}>
                <WindowOpening
                  id={windowItem.id}
                  position={windowItem.position}
                  rotation={windowItem.rotation}
                  width={windowItem.width}
                  height={windowItem.height}
                  depth={windowItem.depth}
                  isSelected={selectedObject === windowItem.id}
                  onSelect={(meshRef) => handleSelect(windowItem.id, meshRef)}
                  onDeselect={handleDeselect}
                  onTransform={handleWindowTransform}
                />
              </Select>
            ))}
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
                  onSave={handleSave}
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
          onClose={close}
          onSkipDone={() => skip(true)}
          skipChecked={skipChecked}
          onSkipChange={setSkipChecked}
        />
        <TutorialBtn onReset={reopen} />
        <MenuProfile />
        <MenuFurniture handleAddFurniture={addFurniture} handleAddWindow={addWindow} />
        <MenuSave onSave={handleSave} />
        <ObjectOptions
          isVisible={!!selectedObject}
          onDelete={() => handleObjectDelete(selectedObject)}
          onResetRotation={() => handleObjectResetRotation(selectedObject)}
        />
      </div>
    </div>
  );
};

export default Perspective;
