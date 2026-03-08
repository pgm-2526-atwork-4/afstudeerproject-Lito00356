import { getOpenings, saveOpenings } from "@core/modules/projects/api.projects";
import { useCallback, useEffect, useState } from "react";

export const useOpenings = (projectId) => {
  const [openingsByWall, setOpeningsByWall] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    const fetch = async () => {
      setLoading(true);
      const data = await getOpenings(projectId);
      setOpeningsByWall(data);
      setLoading(false);
    };

    fetch();
  }, [projectId]);

  const persist = useCallback(
    async (updated) => {
      setOpeningsByWall(updated);
      await saveOpenings(projectId, updated);
    },
    [projectId],
  );

  const addOpening = useCallback(
    async ({ wallId, type, width, height, offsetX, offsetY }) => {
      const newOpening = {
        id: crypto.randomUUID(),
        type,
        width,
        height,
        offsetX,
        offsetY,
      };

      const updated = {
        ...openingsByWall,
        [wallId]: [...(openingsByWall[wallId] ?? []), newOpening],
      };

      await persist(updated);
    },
    [openingsByWall, persist],
  );

  const removeOpening = useCallback(
    async (wallId, openingId) => {
      const updated = {
        ...openingsByWall,
        [wallId]: (openingsByWall[wallId] ?? []).filter((o) => o.id !== openingId),
      };

      await persist(updated);
    },
    [openingsByWall, persist],
  );

  const updateOpening = useCallback(
    async (wallId, openingId, changes) => {
      const updated = {
        ...openingsByWall,
        [wallId]: (openingsByWall[wallId] ?? []).map((o) => (o.id == openingId ? { ...o, ...changes } : o)),
      };

      await persist(updated);
    },
    [openingsByWall, persist],
  );

  return {
    openingsByWall,
    loading,
    addOpening,
    removeOpening,
    updateOpening,
  };
};
