import { useEffect } from "react";
import { useLocalOpenings } from "./useLocalOpenings";
import { getWallAngle, snapWindowToWall, hasWindowChanged } from "@core/utils/wallGeometry";
import { getModelDimensions, OPENING_MODELS } from "@core/utils/openingModels";

export const useCreateOpenings = (projectId, project, walls) => {
  const [openings, setOpenings] = useLocalOpenings(projectId);

  useEffect(() => {
    if (!project) return;
    if (openings.length !== 0) return;
    if (!project?.objects?.openings?.length) return;

    setOpenings(
      project.objects.openings.map((item) => {
        const targetPosition = item.position ?? [0, item.centerY ?? 1.35, 0];
        return snapWindowToWall(walls, item, targetPosition);
      }),
    );
  }, [project, walls, openings.length, setOpenings]);

  useEffect(() => {
    if (!walls.length) return;

    setOpenings((prev) => {
      if (!prev.length) return prev;

      let changed = false;
      const next = prev.map((item) => {
        const targetPosition = item.position ?? [0, item.centerY ?? 1.35, 0];
        const snapped = snapWindowToWall(walls, item, targetPosition);

        if (hasWindowChanged(item, snapped)) {
          changed = true;
        }

        return snapped;
      });

      return changed ? next : prev;
    });
  }, [walls, setOpenings]);

  const addOpening = async (modelType = "standard_single") => {
    const firstWall = walls[0];
    if (!firstWall) return;

    const model = OPENING_MODELS[modelType];
    if (!model) return;

    let dimensions;
    try {
      dimensions = await getModelDimensions(model.path);
    } catch (err) {
      console.error("Failed to load opening model:", err);
      return;
    }

    if (!dimensions.width || !dimensions.height) {
      console.error("Invalid model dimensions:", dimensions);
      return;
    }

    const yRot = model.rotationOffset?.[1] ?? 0;
    const isRotated90 = Math.abs(Math.abs(yRot) - Math.PI / 2) < 0.01;
    const width = isRotated90 ? dimensions.depth : dimensions.width;
    const depth = isRotated90 ? dimensions.width : dimensions.depth;

    const centerY = model.grounded ? dimensions.height / 2 : 1.35;
    const center = [(firstWall.start[0] + firstWall.end[0]) / 2, centerY, (firstWall.start[2] + firstWall.end[2]) / 2];
    const wallAngle = getWallAngle(firstWall);

    setOpenings((prev) => [
      ...prev,
      {
        id: `opening-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        type: model.grounded ? "door" : "window",
        modelType,
        wallId: firstWall.id,
        offset: 0,
        centerY,
        width,
        height: dimensions.height,
        depth,
        position: center,
        rotation: [0, -wallAngle, 0],
      },
    ]);
  };

  const handleOpeningTransform = (openingId, worldPosition) => {
    setOpenings((prev) => {
      const current = prev.find((item) => item.id === openingId);
      if (!current) return prev;
      const snapped = snapWindowToWall(walls, current, worldPosition);
      return prev.map((item) => (item.id === openingId ? snapped : item));
    });
  };

  const handleOpeningDelete = (id) => {
    setOpenings((prev) => prev.filter((item) => item.id !== id));
  };

  return { openings, addOpening, handleOpeningTransform, handleOpeningDelete };
};
