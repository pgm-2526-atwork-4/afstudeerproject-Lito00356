import { useEffect } from "react";
import { useLocalFurniture } from "./useLocalFurniture";

export const useFurnitureManager = (projectId, project) => {
  const [furniture, setFurniture] = useLocalFurniture(projectId);

  useEffect(() => {
    if (!project?.objects?.furniture?.length) return;
    if (furniture.length === 0) {
      setFurniture(project.objects.furniture);
    }
  }, [project, furniture.length, setFurniture]);

  const addFurniture = () => {
    const newObject = {
      id: `sofa-${Date.now()}`,
      type: "sofa",
      position: [5, 0, 5],
      scale: [0.8, 0.8, 0.8],
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
