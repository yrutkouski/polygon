export const getPolygonPoints = (numVertices, side = 100) => {
  if (numVertices < 3) {
    throw new Error("A polygon must have at least 3 vertices.");
  }

  const points = [];
  const angleStep = (2 * Math.PI) / numVertices;

  for (let i = 0; i < numVertices; i++) {
    const initialAngle = i * angleStep;
    const x = Math.floor(250 + side * Math.cos(initialAngle));
    const y = Math.floor(250 + side * Math.sin(initialAngle));
    points.push(`${Math.max(0, Math.min(1000, x))},${Math.max(0, Math.min(500, y))}`);
  }

  return points;
}

export const generateId = () => {
  const randomID = Math.floor(Math.random() * 1000000);
  return randomID.toString().padStart(6, '0');
}

export const isEmpty = obj => {
  return Object.keys(obj).length === 0;
}
