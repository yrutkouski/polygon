export const ACTION = {
  INIT: 'INIT',
  ADD: 'ADD',
  DELETE: 'DELETE',
  MOVE: 'MOVE',
  VERTEX_ADD: 'VERTEX_ADD',
  VERTEX_UPDATE: 'VERTEX_UPDATE',
  VERTEX_DELETE: 'VERTEX_DELETE',
}

export const polygonsReducer = (polygons, action) => {
  switch (action.type) {
    case ACTION.INIT: {
      return action.polygons;
    }case ACTION.ADD: {
      return [...polygons, action.points];
    }
    case ACTION.DELETE: {
      return polygons.filter((_, i) => i !== action.index);
    }
    case ACTION.MOVE: {
      return polygons.map(polygon => {
        if (polygon.id === action.id) {
          return {...polygon, points: action.points};
        }
        return polygon;
      });
    }
    case ACTION.VERTEX_ADD: {
      return polygons.map(polygon => {
        if (polygon.id === action.id) {
          const _points = [...polygon.points];
          _points.splice(action.vertexIndex + 1, 0, action.newVertexPoint);
          return {...polygon, points: _points};
        }
        return polygon;
      });
    }
    case ACTION.VERTEX_UPDATE: {
      return polygons.map(polygon => {
        if (polygon.id === action.id) {
          const _points = polygon.points;
          _points[action.vertexIndex] = action.updatedVertexPoint;
          return {...polygon, points: _points};
        }
        return polygon;
      });
    }
    case ACTION.VERTEX_DELETE: {
      return polygons.map(polygon => {
        if (polygon.id === action.id) {
          const _points = polygon.points.filter((_, i) => i !== action.vertexIndex);
          return {...polygon, points: _points};
        }
        return polygon;
      });
    }
    default: {
      throw Error('Invalid action: ' + action.type);
    }
  }
}


