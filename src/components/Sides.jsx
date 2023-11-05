import {useContext} from 'react';
import {PointsContext} from '../context';

export const Sides = () => {
  const [points] = useContext(PointsContext);

  return (
    <>
      {points.map((coordinates, index) => {
        let secondCoordinatesIndex = index < points.length - 1 ? index + 1 : 0;
        const [x1, y1] = coordinates.split(',');
        const [x2, y2] = points[secondCoordinatesIndex].split(',');

        return (
          <g
            key={coordinates}
          >
            <line
              key={coordinates}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="black"
              strokeWidth="2"
            />
          </g>
        );
      })}
    </>
  )
}
