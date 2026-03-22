export const ROOM_HEIGHT = 2.5;

export const WINDOW_DEFAULT = {
  width: 1,
  height: 1,
  depth: 0.35,
};

const EPSILON = 0.0001;

export const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const nearlyEqual = (a, b, epsilon = EPSILON) => Math.abs(a - b) <= epsilon;

export const vectorsNearlyEqual = (a = [], b = [], epsilon = EPSILON) =>
  a.length === b.length && a.every((value, index) => nearlyEqual(value, b[index], epsilon));

export const buildWallsFromProject = (project) => {
  const walls = project?.room_data?.walls;
  if (!walls?.length) return [];

  const points = walls.flatMap((w) => [
    { x: w.startPosition.x / 100, z: w.startPosition.y / 100 },
    { x: w.endPosition.x / 100, z: w.endPosition.y / 100 },
  ]);

  const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
  const centerZ = points.reduce((sum, p) => sum + p.z, 0) / points.length;

  const centered = walls.map((wall) => ({
    id: wall.id,
    start: [wall.startPosition.x / 100 - centerX, 0, wall.startPosition.y / 100 - centerZ],
    end: [wall.endPosition.x / 100 - centerX, 0, wall.endPosition.y / 100 - centerZ],
  }));

  const signedArea = centered.reduce((sum, wall) => {
    return sum + (wall.start[0] * wall.end[2] - wall.end[0] * wall.start[2]);
  }, 0);

  if (signedArea > 0) {
    return centered.map((wall) => ({ ...wall, start: wall.end, end: wall.start }));
  }

  return centered;
};

export const getWallAngle = (wall) => {
  const dx = wall.end[0] - wall.start[0];
  const dz = wall.end[2] - wall.start[2];
  return Math.atan2(dz, dx);
};

export const findClosestWall = (walls, position) => {
  if (!walls.length) return null;

  let closest = null;

  walls.forEach((wall) => {
    const x1 = wall.start[0];
    const z1 = wall.start[2];
    const x2 = wall.end[0];
    const z2 = wall.end[2];

    const vx = x2 - x1;
    const vz = z2 - z1;
    const lenSq = vx * vx + vz * vz;
    if (lenSq === 0) return;

    const wx = position[0] - x1;
    const wz = position[2] - z1;
    const tRaw = (wx * vx + wz * vz) / lenSq;
    const t = clamp(tRaw, 0, 1);

    const px = x1 + t * vx;
    const pz = z1 + t * vz;
    const dx = position[0] - px;
    const dz = position[2] - pz;
    const distanceSq = dx * dx + dz * dz;
    const wallLength = Math.sqrt(lenSq);

    if (!closest || distanceSq < closest.distanceSq) {
      closest = { wall, t, px, pz, wallLength, distanceSq };
    }
  });

  return closest;
};

export const snapWindowToWall = (walls, windowItem, worldPosition) => {
  const closest = findClosestWall(walls, worldPosition);
  if (!closest) {
    return {
      ...windowItem,
      position: worldPosition,
      rotation: windowItem.rotation ?? [0, 0, 0],
    };
  }

  const width = windowItem.width ?? WINDOW_DEFAULT.width;
  const height = windowItem.height ?? WINDOW_DEFAULT.height;
  const grounded = windowItem.type === "door";
  const halfWidth = width / 2;
  const maxOffset = Math.max(0, closest.wallLength / 2 - halfWidth - 0.05);
  const rawOffset = (closest.t - 0.5) * closest.wallLength;
  const offset = clamp(rawOffset, -maxOffset, maxOffset);
  const centerY = grounded ? height / 2 : clamp(worldPosition[1], height / 2 + 0.05, ROOM_HEIGHT - height / 2 - 0.05);
  const tFromOffset = closest.wallLength === 0 ? 0.5 : offset / closest.wallLength + 0.5;
  const snappedX = closest.wall.start[0] + (closest.wall.end[0] - closest.wall.start[0]) * tFromOffset;
  const snappedZ = closest.wall.start[2] + (closest.wall.end[2] - closest.wall.start[2]) * tFromOffset;
  const wallAngle = getWallAngle(closest.wall);

  return {
    ...windowItem,
    wallId: closest.wall.id,
    offset,
    centerY,
    position: [snappedX, centerY, snappedZ],
    rotation: [0, -wallAngle, 0],
  };
};

export const hasWindowChanged = (prevWindow, nextWindow) => {
  if (prevWindow.wallId !== nextWindow.wallId) return true;
  if (!nearlyEqual(prevWindow.offset ?? 0, nextWindow.offset ?? 0)) return true;
  if (!nearlyEqual(prevWindow.centerY ?? 0, nextWindow.centerY ?? 0)) return true;
  if (!vectorsNearlyEqual(prevWindow.position ?? [], nextWindow.position ?? [])) return true;
  if (!vectorsNearlyEqual(prevWindow.rotation ?? [0, 0, 0], nextWindow.rotation ?? [0, 0, 0])) return true;
  return false;
};
