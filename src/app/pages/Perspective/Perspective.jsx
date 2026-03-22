import "@style/theme.css";
import "./perspective.css";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Bounds, Environment, KeyboardControls, Loader, OrbitControls, Select, Sky } from "@react-three/drei";
import MenuProfile from "@design/MenuProfile/MenuProfile";
import { useQuery } from "@tanstack/react-query";
import { getProjectById, updateProjectImages } from "@core/modules/projects/api.projects";
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
import PageStatus from "@design/PageStatus/PageStatus";
import WallOpening from "@functional/WallOpening/WallOpening";
import { buildWallsFromProject, ROOM_HEIGHT } from "@core/utils/wallGeometry";
import { useCreateOpenings } from "@core/hooks/useOpenings";
import { useFurnitureManager } from "@core/hooks/useFurnitureManager";
import { useSelection } from "@core/hooks/useSelection";
import CameraViewChanger from "@design/Button/CameraViewChanger/CameraViewChanger";
import CameraController from "@functional/CameraController/CameraController";
import MenuLighting from "@design/MenuLighting/MenuLighting";
import MenuMaterials from "@design/MenuMaterials/MenuMaterials";
import useToast from "@functional/Toast/useToast";
import SnapshotOverlay from "@design/SnapshotOverlay/SnapshotOverlay";
import * as THREE from "three";

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
  const { addToast } = useToast();

  const canvasStateRef = useRef(null);
  const materialsInitialized = useRef(false);
  const controlsRef = useRef();

  const [isTopView, setIsTopView] = useState(false);
  const [lightingMode, setLightingMode] = useState("none");
  const [activeSkyPreset, setActiveSkyPreset] = useState(null);
  const [activeHdri, setActiveHdri] = useState(null);
  const [lightIntensity, setLightIntensity] = useState(1);
  const [floorMaterialId, setFloorMaterialId] = useState(null);
  const [wallMaterialId, setWallMaterialId] = useState(null);
  const [wallColor, setWallColor] = useState("#d4e3f0");

  const {
    data: project,
    isPending,
    error,
  } = useQuery({
    queryKey: ["project", projectNumberId],
    queryFn: () => getProjectById(projectNumberId),
  });

  const walls = useMemo(() => buildWallsFromProject(project), [project]);

  useEffect(() => {
    if (materialsInitialized.current) return;
    const saved = project?.objects?.materials;
    if (!saved) return;
    materialsInitialized.current = true;
    // eslint-disable-next-line
    setFloorMaterialId(saved.floorMaterialId ?? null);
    setWallMaterialId(saved.wallMaterialId ?? null);
    if (saved.wallColor) setWallColor(saved.wallColor);
  }, [project]);

  const { selectedObject, outlineSelection, handleSelect, handleDeselect } = useSelection();
  const { furniture, addFurniture, handleTransformChange, handleColorChange, handleFurnitureDelete, handleResetRotation } =
    useFurnitureManager(projectId, project);
  const { openings, addOpening, handleOpeningTransform, handleOpeningDelete } = useCreateOpenings(projectId, project, walls);

  const handleSave = () => {
    saveRoom.mutate(
      {
        id: project?.id,
        user_id: user.id,
        scene_name: project?.scene_name,
        room_data: project?.room_data,
        objects: { furniture, openings, materials: { floorMaterialId, wallMaterialId, wallColor } },
      },
      { onSuccess: () => addToast("Scene saved successfully!") },
    );
  };

  const handleMaterialsSave = () => {
    const currentObjects = project?.objects ?? {};
    saveRoom.mutate(
      {
        id: project?.id,
        user_id: user.id,
        scene_name: project?.scene_name,
        room_data: project?.room_data,
        objects: { ...currentObjects, materials: { floorMaterialId, wallMaterialId, wallColor } },
      },
      { onSuccess: () => addToast("Materials saved successfully!") },
    );
  };

  const handleMaterialsCancel = () => {
    const saved = project?.objects?.materials;
    setFloorMaterialId(saved?.floorMaterialId ?? null);
    setWallMaterialId(saved?.wallMaterialId ?? null);
    setWallColor(saved?.wallColor ?? "#d4e3f0");
  };

  const savedMaterials = project?.objects?.materials;
  const materialsAdjusted =
    floorMaterialId !== (savedMaterials?.floorMaterialId ?? null) ||
    wallMaterialId !== (savedMaterials?.wallMaterialId ?? null) ||
    wallColor !== (savedMaterials?.wallColor ?? "#d4e3f0");

  const handleObjectDelete = (id) => {
    const isOpening = openings.some((item) => item.id === id);
    if (isOpening) {
      handleOpeningDelete(id);
    } else {
      handleFurnitureDelete(id);
    }
    handleDeselect();
  };

  const handleObjectResetRotation = (id) => {
    const isOpening = openings.some((item) => item.id === id);
    if (!isOpening) {
      handleResetRotation(id);
    }
  };

  const skyPosition = useMemo(() => {
    if (!activeSkyPreset) return [5, 10, 5];

    const phi = THREE.MathUtils.degToRad(90 - activeSkyPreset.elevation);
    const theta = THREE.MathUtils.degToRad(activeSkyPreset.azimuth);

    return new THREE.Vector3().setFromSphericalCoords(1, phi, theta).multiplyScalar(10).toArray();
  }, [activeSkyPreset]);

  const takeScreenshot = () => {
    const state = canvasStateRef.current;
    if (!state) return;

    const { gl, scene, camera } = state;
    gl.render(scene, camera);
    const dataUrl = gl.domElement.toDataURL("image/jpeg", 0.9);
    return dataUrl.split(",")[1];
  };

  const handleScreenshot = async () => {
    const base64 = takeScreenshot();
    if (!base64) return;

    await updateProjectImages(user.id, project.id, base64, project.images ?? []);
    addToast("Snapshot saved successfully!");
  };

  const [snapshotCountdown, setSnapshotCountdown] = useState(null);

  const startSnapshot = () => setSnapshotCountdown(3);

  useEffect(() => {
    if (snapshotCountdown === null) return;
    if (snapshotCountdown === 0) {
      handleScreenshot();
      const timer = setTimeout(() => setSnapshotCountdown(null), 500);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(() => setSnapshotCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [snapshotCountdown]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCameraChange = () => {
    const controls = controlsRef.current;
    if (!controls) return;
    if (controls.target.y < 0) {
      controls.target.y = 0;
    }
    if (controls.object.position.y < 0.5) {
      controls.object.position.y = 0.5;
    }
  };

  // Onboarding — multi-flow system
  const [skipChecked, setSkipChecked] = useState(false);

  const perspectiveOb = useOnboarding("perspective");
  const movingOb = useOnboarding("MovingObjects");
  const lightingOb = useOnboarding("Lighting");
  const savingOb = useOnboarding("Saving");

  const hasModels = furniture.length > 0 || openings.length > 0;
  const hasLighting = lightingMode !== "none";

  const getActiveOnboarding = () => {
    if (perspectiveOb.isVisible) return { steps: ONBOARDING_STEPS.perspective, ob: perspectiveOb };
    if (hasModels && !!selectedObject && movingOb.isVisible) return { steps: ONBOARDING_STEPS.MovingObjects, ob: movingOb };
    if (hasLighting && lightingOb.isVisible) return { steps: ONBOARDING_STEPS.Lighting, ob: lightingOb };
    if (perspectiveOb.isCompleted && movingOb.isCompleted && lightingOb.isCompleted && savingOb.isVisible)
      return { steps: ONBOARDING_STEPS.Saving, ob: savingOb };
    return null;
  };

  const active = getActiveOnboarding();

  const handleTutorialReopen = () => {
    perspectiveOb.reopen();
    movingOb.reopen();
    lightingOb.reopen();
    savingOb.reopen();
  };

  if (isPending) return <PageStatus.Loading />;
  if (error) return <PageStatus.Error message={error.message} />;
  if (!project) return <PageStatus.NotFound message={`Project ${projectId} could not be found.`} />;

  return (
    <div className="canvas-page">
      <TitleBadge title="perspective">
        <CameraViewChanger isTopView={isTopView} onEnable={() => setIsTopView(true)} onDisable={() => setIsTopView(false)} />
      </TitleBadge>

      <KeyboardControls map={keyMap}>
        <Canvas
          dpr={[1, 2]}
          className="canvas"
          camera={{ position: [10, 6, 10], fov: 50 }}
          style={{ width: "100vw", height: "100vh" }}
          shadows
          gl={{ preserveDrawingBuffer: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 0.8 }}
          onCreated={(state) => {
            canvasStateRef.current = state;
          }}
        >
          <Suspense fallback={null}>
            {lightingMode === "none" && (
              <>
                <directionalLight />
                <ambientLight intensity={1} />
              </>
            )}
            {lightingMode === "sky" && (
              <>
                <Sky skyPosition={skyPosition} turbidity={3} rayleigh={0.2} mieCoefficient={0.007} mieDirectionalG={0.5} />
                <directionalLight
                  position={skyPosition}
                  castShadow
                  intensity={lightIntensity}
                  shadow-mapSize={[2048, 2048]}
                  shadow-camera-left={-15}
                  shadow-camera-right={15}
                  shadow-camera-top={15}
                  shadow-camera-bottom={-15}
                  shadow-camera-near={0.1}
                  shadow-camera-far={50}
                  shadow-bias={-0.002}
                  shadow-normalBias={0.02}
                />
                <ambientLight intensity={1} />
              </>
            )}
            {lightingMode === "hdri" && activeHdri && (
              <>
                <Environment
                  background
                  backgroundRotation={[0, Math.PI / 2, 0]}
                  files={activeHdri.file}
                  ground={{
                    height: 7,
                    radius: 25,
                    scale: 100,
                  }}
                  intensity={20}
                />
                <directionalLight
                  position={skyPosition}
                  castShadow
                  intensity={2}
                  shadow-mapSize={[2048, 2048]}
                  shadow-camera-left={-15}
                  shadow-camera-right={15}
                  shadow-camera-top={15}
                  shadow-camera-bottom={-15}
                  shadow-camera-near={0.1}
                  shadow-camera-far={50}
                  shadow-bias={-0.002}
                  shadow-normalBias={0.02}
                />
              </>
            )}

            <EffectComposer multisampling={8} autoClear={false}>
              <Outline
                selection={outlineSelection}
                visibleEdgeColor="orange"
                hiddenEdgeColor="orange"
                edgeStrength={3}
                width={1000}
              />
            </EffectComposer>

            <mesh>
              <Ground onPointerMissed={handleDeselect} />
            </mesh>

            {project?.room_data && (
              <Room3D
                walls={walls}
                wallThickness={0.1}
                height={ROOM_HEIGHT}
                openings={openings}
                floorMaterialId={floorMaterialId}
                wallMaterialId={wallMaterialId}
                wallColor={wallColor}
              />
            )}

            <Bounds margin={2}>
              {openings.map((item) => (
                <Select key={item.id} enabled={selectedObject === item.id}>
                  <WallOpening
                    furnitureId={item.id}
                    position={item.position}
                    rotation={item.rotation}
                    width={item.width}
                    height={item.height}
                    depth={item.depth}
                    modelType={item.modelType}
                    isSelected={selectedObject === item.id}
                    onSelect={(meshRef) => handleSelect(item.id, meshRef)}
                    onDeselect={handleDeselect}
                    onTransformChange={handleOpeningTransform}
                    onSave={handleSave}
                  />
                </Select>
              ))}
              {furniture.map((item) => (
                <Select key={item.id} enabled={selectedObject === item.id}>
                  <Furniture
                    key={item.id}
                    furnitureId={item.id}
                    modelPath={item.modelPath}
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
                    isTopView={isTopView}
                  />
                </Select>
              ))}
            </Bounds>

            <CameraController isTopView={isTopView} />
            <OrbitControls
              ref={controlsRef}
              target={[0, 0, 0]}
              maxPolarAngle={isTopView ? 0 : Math.PI / 2}
              minPolarAngle={isTopView ? 0 : 0}
              enableRotate={!isTopView}
              makeDefault
              onChange={handleCameraChange}
            />
          </Suspense>
        </Canvas>
        <Loader />
      </KeyboardControls>

      <div className="ui-overlay">
        {active && (
          <OnboardingModal
            isVisible
            title={active.steps[active.ob.currentStep]?.title}
            description={active.steps[active.ob.currentStep]?.description}
            currentStep={active.ob.currentStep}
            totalSteps={active.steps.length}
            onNext={() => active.ob.nextStep(active.steps.length)}
            onPrev={active.ob.prevStep}
            onClose={active.ob.close}
            onSkipDone={() => active.ob.skip(true)}
            skipChecked={skipChecked}
            onSkipChange={setSkipChecked}
            targetSelector={active.steps[active.ob.currentStep]?.targetSelector}
          />
        )}
        <div className="top-actions">
          <MenuProfile handleScreenshot={startSnapshot} />
          <TutorialBtn onReset={handleTutorialReopen} />
        </div>
        <MenuSave onSave={handleSave} />
        <MenuFurniture handleAddFurniture={addFurniture} handleAddOpening={addOpening} />
        <MenuLighting
          lightingMode={lightingMode}
          onModeChange={setLightingMode}
          activeSkyPreset={activeSkyPreset}
          onSkyPresetChange={(preset) => setActiveSkyPreset(preset)}
          onHdriChange={(hdri) => setActiveHdri(hdri)}
          activeHdri={activeHdri?.id}
          lightIntensity={lightIntensity}
          onIntensityChange={setLightIntensity}
        />
        <MenuMaterials
          floorMaterialId={floorMaterialId}
          onFloorChange={setFloorMaterialId}
          wallMaterialId={wallMaterialId}
          onWallMaterialChange={setWallMaterialId}
          wallColor={wallColor}
          onWallColorChange={setWallColor}
          onConfirm={handleMaterialsSave}
          onCancel={handleMaterialsCancel}
          materialsAdjusted={materialsAdjusted}
        />
        <ObjectOptions
          isVisible={!!selectedObject}
          onDelete={() => handleObjectDelete(selectedObject)}
          onResetRotation={() => handleObjectResetRotation(selectedObject)}
          onDeselect={handleDeselect}
        />
      </div>
      <SnapshotOverlay countdown={snapshotCountdown} />
    </div>
  );
};

export default Perspective;
