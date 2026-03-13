import { useState } from "react";

export const useSelection = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [outlineSelection, setOutlineSelection] = useState([]);

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

  return { selectedObject, outlineSelection, handleSelect, handleDeselect };
};
