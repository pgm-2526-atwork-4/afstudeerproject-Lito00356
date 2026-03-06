import { useEffect, useState } from "react";

export const useLocalFurniture = (projectId) => {
  const key = `furniture_${projectId}`;

  const [furniture, setFurniture] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(furniture));
  }, [furniture, key]);

  return [furniture, setFurniture];
};
