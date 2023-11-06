import {useContext, useRef, useEffect, useCallback} from 'react';
import {PolygonsContext, CanvasRefContext} from '../context';
import {ACTION} from '../reducer';
import {Sides} from './Sides';
import {Vertices} from './Vertices';

export const Polygons = () => {
  const [polygons, dispatch] = useContext(PolygonsContext);
  const canvasRef = useContext(CanvasRefContext);

  const abortControllerRef = useRef(new AbortController());

  useEffect(() => () => {
    abortControllerRef.current.abort();
  }, []);

  const handlePolygonDelete = index => () => {
    dispatch({
      type: ACTION.DELETE,
      index
    })
  }

  const handlePolygonMove = useCallback((polygonId, startPoints) => e => {
    abortControllerRef.current = new AbortController();
    const boundCan = canvasRef.current.getBoundingClientRect()
    const start = {x: e.clientX - boundCan.x, y: e.clientY - boundCan.y};

    document.addEventListener('mousemove',
      e => {
        let x = e.clientX - boundCan.x;
        let y = e.clientY - boundCan.y;

        dispatch({
          type: ACTION.MOVE,
          id: polygonId,
          points: startPoints.map(coordinates => (`${+coordinates.split(',')[0] + x - start.x},${+coordinates.split(',')[1] + y - start.y}`))
        })
      },
      {signal: abortControllerRef.current.signal});
    document.addEventListener('mouseup', () => {
      abortControllerRef.current.abort();
    });
  }, [dispatch, canvasRef, abortControllerRef]);

  return (
    <>
      {polygons.map((polygon, index) => (
        <g key={polygon.id}>
          <polygon
            points={polygon.points.join(' ')}
            fill="red"
            onMouseDown={handlePolygonMove(polygon.id, polygon.points)}
            onDoubleClick={handlePolygonDelete(index)}
          />
          <Vertices polygonId={polygon.id}/>
          <Sides polygonId={polygon.id}/>
        </g>
      ))}

    </>
  )
}
