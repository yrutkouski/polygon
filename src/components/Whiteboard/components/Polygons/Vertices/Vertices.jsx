import React from 'react';
import useVertexHandlers from './useVertexHandlers';

const Vertices = ({ polygonId }) => {
  const {
    draggable, points, handleVertexDelete, handleVertexMove,
  } = useVertexHandlers(polygonId);

  return (
    <>
      {points.map(({ x, y }, index) => (
        <g
          key={`${x},${y}`}
          onDoubleClick={handleVertexDelete(index)}
          onMouseDown={handleVertexMove(index)}
        >
          <circle
            cx={draggable.index === index ? draggable.x : x}
            cy={draggable.index === index ? draggable.y : y}
            r={5}
          />
        </g>
      ))}
    </>
  );
};

export default Vertices;
