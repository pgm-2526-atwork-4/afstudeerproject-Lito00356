import { useEffect } from "react";
import { useLocalWindows } from "./useLocalWindows";
import {
  WINDOW_DEFAULT,
  getWallAngle,
  snapWindowToWall,
  hasWindowChanged,
} from "@core/utils/wallGeometry";

export const useWindows = (projectId, project, walls) => {
  const [windows, setWindows] = useLocalWindows(projectId);

  useEffect(() => {
    if (!project) return;
    if (windows.length !== 0) return;
    if (!project?.objects?.windows?.length) return;

    setWindows(
      project.objects.windows.map((windowItem) => {
        const targetPosition = windowItem.position ?? [0, windowItem.centerY ?? 1.35, 0];
        return snapWindowToWall(walls, windowItem, targetPosition);
      }),
    );
  }, [project, walls, windows.length, setWindows]);

  useEffect(() => {
    if (!walls.length) return;

    setWindows((prev) => {
      if (!prev.length) return prev;

      let changed = false;
      const next = prev.map((windowItem) => {
        const targetPosition = windowItem.position ?? [0, windowItem.centerY ?? 1.35, 0];
        const snapped = snapWindowToWall(walls, windowItem, targetPosition);

        if (hasWindowChanged(windowItem, snapped)) {
          changed = true;
        }

        return snapped;
      });

      return changed ? next : prev;
    });
  }, [walls, setWindows]);

  const addWindow = () => {
    const firstWall = walls[0];
    if (!firstWall) return;

    const center = [
      (firstWall.start[0] + firstWall.end[0]) / 2,
      1.35,
      (firstWall.start[2] + firstWall.end[2]) / 2,
    ];
    const wallAngle = getWallAngle(firstWall);

    setWindows((prev) => [
      ...prev,
      {
        id: `window-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type: "window",
        wallId: firstWall.id,
        offset: 0,
        centerY: center[1],
        width: WINDOW_DEFAULT.width,
        height: WINDOW_DEFAULT.height,
        depth: WINDOW_DEFAULT.depth,
        position: center,
        rotation: [0, -wallAngle, 0],
      },
    ]);
  };

  const handleWindowTransform = (windowId, worldPosition) => {
    setWindows((prev) => {
      const currentWindow = prev.find((item) => item.id === windowId);
      if (!currentWindow) return prev;
      const snappedWindow = snapWindowToWall(walls, currentWindow, worldPosition);
      return prev.map((item) => (item.id === windowId ? snappedWindow : item));
    });
  };

  const handleWindowDelete = (id) => {
    setWindows((prev) => prev.filter((item) => item.id !== id));
  };

  return { windows, addWindow, handleWindowTransform, handleWindowDelete };
};
