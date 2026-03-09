export const getDistance = (p1, p2) => {
  const dx = p2.x - p1.x;
  const dy = p2.y - p2.y;
  const pixels = Math.sqrt(dx * dx + dy * dy);

  const cm = Math.round(pixels);
  const meter = (cm / 100).toFixed(2);

  return { pixels, cm, meter };
};
