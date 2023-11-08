import {
  useContext, useState, useCallback, useEffect, useRef,
} from 'react';
import { PolygonsContext } from '../../../../../utils/context';
import { useCurrentCoordinate, usePoints } from '../../../../../utils/hooks';
import { ACTION } from '../../../../../utils/reducer';

const useVertexHandlers = (polygonId) => {
  const { dispatch } = useContext(PolygonsContext);
  const getCurrentCoordinate = useCurrentCoordinate();
  const getPoints = usePoints();

  const [draggable, setDraggable] = useState({});

  const points = getPoints(polygonId);

  const abortControllerRef = useRef(new AbortController());
  useEffect(() => () => {
    abortControllerRef.current.abort();
  }, []);

  const handleVertexDelete = (vertexIndex) => () => {
    dispatch({
      type: ACTION.VERTEX_DELETE,
      id: polygonId,
      vertexIndex,
    });
  };

  const handleVertexMove = useCallback((index) => () => {
    abortControllerRef.current = new AbortController();
    setDraggable({ index, x: points[index].x, y: points[index].y });

    const handleMouseMove = (e) => {
      const { x, y } = getCurrentCoordinate(e);
      setDraggable((prev) => ({ index: prev.index, x, y }));

      dispatch({
        type: ACTION.VERTEX_UPDATE,
        id: polygonId,
        vertexIndex: index,
        updatedVertexPoint: { x, y },
      });
    };

    const handleMouseUp = () => {
      setDraggable({ index: null, x: null, y: null });
      abortControllerRef.current.abort();

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [dispatch, polygonId, points, abortControllerRef]);

  return {
    points,
    handleVertexDelete,
    handleVertexMove,
    draggable,
  };
};

export default useVertexHandlers;
