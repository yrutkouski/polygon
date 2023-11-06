import {useCallback, useState, useContext, useEffect, useRef} from 'react';
import {PolygonsContext, CanvasRefContext} from '../context';
import {ACTION} from '../reducer';

export const Vertices = ({polygonId}) => {
  const [polygons, dispatch] = useContext(PolygonsContext);
  const canvasRef = useContext(CanvasRefContext);

  const points = polygons.find(polygon => polygon.id === polygonId).points;

  const [draggable, setDraggable] = useState({});
  const abortControllerRef = useRef(new AbortController());

  useEffect(() => () => {
    abortControllerRef.current.abort();
  }, []);

  const handleVertexDelete = vertexIndex => () => {
    dispatch({
      type: ACTION.VERTEX_DELETE,
      id: polygonId,
      vertexIndex
    });
  };

  const handleVertexMove = useCallback(index => () => {
    abortControllerRef.current = new AbortController();
    setDraggable({index, x: points[index].split(',')[0], y: points[index].split(',')[1]});

    document.addEventListener('mousemove',
      e => {
        let boundCan = canvasRef.current.getBoundingClientRect();
        let x = e.clientX - boundCan.x;
        let y = e.clientY - boundCan.y;
        setDraggable(prev => ({index: prev.index, x, y}));

        dispatch({
          type: ACTION.VERTEX_UPDATE,
          id: polygonId,
          vertexIndex: index,
          updatedVertexPoint: `${x},${y}`
        });
      },
      {signal: abortControllerRef.current.signal});
    document.addEventListener('mouseup', () => {
      setDraggable({index: null, x: null, y: null})
      abortControllerRef.current.abort();
    });
  }, [dispatch, polygonId, setDraggable, points, canvasRef, abortControllerRef]);

  return (
    <>
      {points.map((coordinates, index) => (
        <g
          key={coordinates}
          onDoubleClick={handleVertexDelete(index)}
          onMouseDown={handleVertexMove(index)}
        >
          <circle
            cx={draggable.index === index ? draggable.x : coordinates.split(',')[0]}
            cy={draggable.index === index ? draggable.y : coordinates.split(',')[1]}
            r={5}
          />
        </g>
      ))}
    </>
  )
}
