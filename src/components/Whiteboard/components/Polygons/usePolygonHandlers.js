import {
  useContext, useCallback, useEffect, useRef,
} from 'react';
import { PolygonsContext } from '../../../../utils/context';
import { useCurrentCoordinate } from '../../../../utils/hooks';
import { ACTION } from '../../../../utils/reducer';

const usePolygonHandlers = () => {
  const { dispatch } = useContext(PolygonsContext);
  const getCurrentCoordinate = useCurrentCoordinate();

  const abortControllerRef = useRef(new AbortController());
  useEffect(() => () => {
    abortControllerRef.current.abort();
  }, []);

  const handlePolygonDelete = (index) => () => {
    dispatch({
      type: ACTION.DELETE,
      index,
    });
  };

  const handlePolygonMove = useCallback((polygonId, startPoints) => (e) => {
    abortControllerRef.current = new AbortController();
    const start = getCurrentCoordinate(e);

    const handleMouseMove = (mouseMoveEvent) => {
      const { x, y } = getCurrentCoordinate(mouseMoveEvent);

      dispatch({
        type: ACTION.MOVE,
        id: polygonId,
        points: startPoints.map((coordinates) => ({
          x: +coordinates.x + x - start.x,
          y: +coordinates.y + y - start.y,
        })),
      });
    };

    const handleMouseUp = () => {
      abortControllerRef.current.abort();

      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [dispatch, abortControllerRef]);

  return {
    handlePolygonDelete,
    handlePolygonMove,
  };
};

export default usePolygonHandlers;
