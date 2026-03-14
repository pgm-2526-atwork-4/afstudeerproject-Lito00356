import { useEffect, useState } from "react";

export const useLocalOpenings = (projectId) => {
  const key = `openings_${projectId}`;

  const [openings, setOpenings] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(openings));
  }, [openings, key]);

  return [openings, setOpenings];
};
