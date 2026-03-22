import { useEffect, useRef } from "react";
import { useLocalFurniture } from "./useLocalFurniture";

export const useFurnitureManager = (projectId, project) => {
  const [furniture, setFurniture] = useLocalFurniture(projectId);
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return;
    if (!project?.objects?.furniture?.length) return;
    if (furniture.length === 0) {
      setFurniture(project.objects.furniture);
    }
    hasInitialized.current = true;
  }, [project, furniture.length, setFurniture]);

  const addFurniture = (modelInfo) => {
    const newObject = {
      id: `${modelInfo.id}-${Date.now()}`,
      type: modelInfo.id,
      modelPath: modelInfo.path,
      position: [0, 0, 0],
      scale: [1, 1, 1],
      rotation: [0, 0, 0],
      color: "rgba(240, 240, 240, 1)",
    };

    setFurniture((prev) => [...prev, newObject]);
  };

  const handleTransformChange = (furnitureId, changes) => {
    setFurniture((prev) =>
      prev.map((item) => (item.id === furnitureId ? { ...item, ...changes } : item)),
    );
  };

  const handleColorChange = (furnitureId, color) => {
    setFurniture((prev) =>
      prev.map((item) => (item.id === furnitureId ? { ...item, color } : item)),
    );
  };

  const handleFurnitureDelete = (id) => {
    setFurniture((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetRotation = (id) => {
    handleTransformChange(id, { rotation: [0, 0, 0] });
  };

  return {
    furniture,
    addFurniture,
    handleTransformChange,
    handleColorChange,
    handleFurnitureDelete,
    handleResetRotation,
  };
};
