import {useContext} from 'react';
import {PolygonsContext, CanvasRefContext} from '../context';
import {ACTION} from '../reducer';

export const Sides = ({polygonId}) => {
  const [polygons, dispatch] = useContext(PolygonsContext);
  const canvasRef = useContext(CanvasRefContext);

  const points = polygons.find(polygon => polygon.id === polygonId).points;

  const handlePointAdd = index => e => {
    let boundCan = canvasRef.current.getBoundingClientRect();
    let x = e.clientX - boundCan.x;
    let y = e.clientY - boundCan.y;

    dispatch({
      type: ACTION.VERTEX_ADD,
      id: polygonId,
      vertexIndex: index,
      newVertexPoint: `${x},${y}`
    });
  };

  return (
    <>
      {points.map((coordinates, index) => {
        let secondCoordinatesIndex = index < points.length - 1 ? index + 1 : 0;
        const [x1, y1] = coordinates.split(',');
        const [x2, y2] = points[secondCoordinatesIndex].split(',');

        return (
          <g
            key={coordinates}
            onClick={handlePointAdd(index)}
          >
            <line
              key={coordinates}
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
  )
}
