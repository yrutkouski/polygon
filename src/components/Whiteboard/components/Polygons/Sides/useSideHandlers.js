import { useContext } from 'react';
import { PolygonsContext } from '../../../../../utils/context';
import { useCurrentCoordinate, usePoints } from '../../../../../utils/hooks';
import { ACTION } from '../../../../../utils/reducer';

const useSideHandlers = (polygonId) => {
  const { dispatch } = useContext(PolygonsContext);
  const getCurrentCoordinate = useCurrentCoordinate();
  const getPoints = usePoints();

  const points = getPoints(polygonId);

  const handleVertexAdd = (index) => (e) => {
    const { x, y } = getCurrentCoordinate(e);

    if (points.some((point) => point.x === x && point.y === y)) return;

    dispatch({
      type: ACTION.VERTEX_ADD,
      id: polygonId,
      vertexIndex: index,
      newVertexPoint: { x, y },
    });
  };

  return {
    points,
    handleVertexAdd,
  };
};

export default useSideHandlers;
