import { useEffect, useState } from "react";

export const useLocalWindows = (projectId) => {
  const key = `windows_${projectId}`;

  const [windows, setWindows] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(windows));
  }, [windows, key]);

  return [windows, setWindows];
};
