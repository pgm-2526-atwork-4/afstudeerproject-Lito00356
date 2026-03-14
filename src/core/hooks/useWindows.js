import { useEffect } from "react";
import { useLocalWindows } from "./useLocalWindows";
import { getWallAngle, snapWindowToWall, hasWindowChanged } from "@core/utils/wallGeometry";
import { getModelDimensions, WINDOW_MODELS } from "@core/utils/windowModels";

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

  const addWindow = async (modelType = "standard_single") => {
    const firstWall = walls[0];
    if (!firstWall) return;

    const model = WINDOW_MODELS[modelType];
    if (!model) return;

    let dimensions;
    try {
      dimensions = await getModelDimensions(model.path);
    } catch (err) {
      console.error("Failed to load window model:", err);
      return;
    }

    if (!dimensions.width || !dimensions.height) {
      console.error("Invalid model dimensions:", dimensions);
      return;
    }
    const centerY = model.ground ? dimensions.height / 2 : 1.35;

    const center = [(firstWall.start[0] + firstWall.end[0]) / 2, centerY, (firstWall.start[2] + firstWall.end[2]) / 2];
    const wallAngle = getWallAngle(firstWall);

    setWindows((prev) => [
      ...prev,
      {
        id: `window-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type: "window",
        modelType,
        wallId: firstWall.id,
        offset: 0,
        centerY,
        width: dimensions.width,
        height: dimensions.height,
        depth: dimensions.depth,
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
