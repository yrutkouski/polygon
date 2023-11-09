import React from 'react';
import useSideHandlers from './useSideHandlers';

const Sides = ({ polygonId }) => {
  const { points, handleVertexAdd } = useSideHandlers(polygonId);

  return (
    <>
      {points.map((coordinates, index) => {
        const secondCoordinatesIndex = index < points.length - 1 ? index + 1 : 0;
        const { x: x1, y: y1 } = coordinates;
        const { x: x2, y: y2 } = points[secondCoordinatesIndex];

        return (
          <g
            key={`${x1},${y1}-${x2},${y2}`}
            onClick={handleVertexAdd(index)}
          >
            <line
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="black"
              strokeWidth="3"
            />
          </g>
        );
      })}
    </>
  );
};

export default Sides;
