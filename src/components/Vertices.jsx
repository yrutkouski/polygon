import {useCallback, useState, useContext, useEffect, useRef} from 'react';
import { PointsContext } from '../context';

export const Vertices = ({ canvasRef }) => {
  const [points, setPoints] = useContext(PointsContext);
  const [draggable, setDraggable] = useState({});
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => () => {
      abortControllerRef.current.abort();
    }, []);

  const handlePointDelete = coordinates => () => {
    setPoints(points.filter(p => p !== coordinates));
  };

  const handlePointMove = useCallback(index => () => {
    abortControllerRef.current = new AbortController();
    setDraggable({ index, x: points[index].split(',')[0], y: points[index].split(',')[1]});

    document.addEventListener('mousemove',
      e => {
        let boundCan = canvasRef.current.getBoundingClientRect();
        let x = e.clientX - boundCan.x;
        let y = e.clientY - boundCan.y;
        setDraggable(prev => ({ index: prev.index, x, y}));

        setPoints(prev => {
          prev[index] = `${x},${y}`;
          return [...prev];
        });
      },
      {signal: abortControllerRef.current.signal});
    document.addEventListener('mouseup', () => {
      setDraggable({index: null, x: null, y: null})
      abortControllerRef.current.abort();
    });
  }, [setDraggable, setPoints, points, canvasRef, abortControllerRef]);

  return (
    <>
      {points.map((coordinates, index) => (
        <g
          key={coordinates}
          onDoubleClick={handlePointDelete(coordinates)}
          onMouseDown={handlePointMove(index)}
        >
          <circle
            cx={draggable.index === index ? draggable.x : coordinates.split(',')[0]}
            cy={draggable.index === index ? draggable.y : coordinates.split(',')[1]}
            r={4}
          />
        </g>
      ))}
    </>
  )
}
