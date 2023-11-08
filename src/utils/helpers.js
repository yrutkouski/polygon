export const getPolygonPoints = (numVertices, side = 100, step = 0) => {
  if (numVertices < 3) {
    alert('A polygon must have at least 3 vertices.');
  }

  const points = [];
  const shift = 150 + step * 50;
  const angleStep = (2 * Math.PI) / numVertices;

  for (let i = 0; i < numVertices; i++) {
    const initialAngle = i * angleStep;
    const x = Math.floor(shift + side * Math.cos(initialAngle));
    const y = Math.floor(shift + side * Math.sin(initialAngle));
    points.push({
      x: Math.max(0, Math.min(1000, x)),
      y: Math.max(0, Math.min(500, y)),
    });
  }

  return points;
};

export const generateId = () => {
  const randomID = Math.floor(Math.random() * 1000000);
  return randomID.toString().padStart(6, '0');
};

export const isEmpty = (obj) => Object.keys(obj).length === 0;

export const initStorage = () => {
  if (!localStorage.getItem('users')) localStorage.setItem('users', JSON.stringify([]));
  if (!sessionStorage.getItem('current_user')) sessionStorage.setItem('current_user', JSON.stringify({}));
  if (!localStorage.getItem('whiteboards')) localStorage.setItem('whiteboards', JSON.stringify({}));
};
