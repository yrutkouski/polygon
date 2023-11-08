import React, { useContext } from 'react';
import { PolygonsContext } from '../../../../utils/context';
import Sides from './Sides';
import Vertices from './Vertices';
import usePolygonHandlers from './usePolygonHandlers';

const Polygons = () => {
  const { polygons } = useContext(PolygonsContext);
  const { handlePolygonMove, handlePolygonDelete } = usePolygonHandlers();

  return (
    <>
      {polygons.map((polygon, index) => (
        <g key={polygon.id}>
          <polygon
            points={polygon.points.map(({ x, y }) => `${x},${y}`).join(' ')}
            fill={polygon.color}
            onMouseDown={handlePolygonMove(polygon.id, polygon.points)}
            onDoubleClick={handlePolygonDelete(index)}
          />
          <Vertices polygonId={polygon.id} />
          <Sides polygonId={polygon.id} />
        </g>
      ))}
    </>
  );
};

export default Polygons;
