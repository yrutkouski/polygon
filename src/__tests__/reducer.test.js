import {
  describe, it, expect, beforeEach,
} from '@jest/globals';
import { ACTION, polygonsReducer } from '../utils/reducer';

describe('polygonsReducer', () => {
  let initialState;

  beforeEach(() => {
    initialState = [
      { id: 'polygon1', points: [{ x: 0, y: 0 }, { x: 1, y: 1 }] },
      { id: 'polygon2', points: [{ x: 2, y: 2 }, { x: 3, y: 3 }] },
    ];
  });

  it('should handle INIT action', () => {
    const action = { type: ACTION.INIT, polygons: initialState };
    const result = polygonsReducer([], action);

    expect(result).toEqual(initialState);
  });

  it('should handle ADD action', () => {
    const newPolygon = { id: 'polygon3', points: [{ x: 4, y: 4 }, { x: 5, y: 5 }] };
    const action = { type: ACTION.ADD, points: newPolygon };
    const result = polygonsReducer(initialState, action);

    expect(result).toEqual([...initialState, newPolygon]);
  });

  it('should handle DELETE action', () => {
    const indexToDelete = 0;
    const action = { type: ACTION.DELETE, index: indexToDelete };
    const result = polygonsReducer(initialState, action);

    expect(result).toEqual([{ id: 'polygon2', points: [{ x: 2, y: 2 }, { x: 3, y: 3 }] }]);
  });

  it('should handle MOVE action', () => {
    const idToMove = 'polygon1';
    const newPoints = [{ x: 10, y: 10 }, { x: 11, y: 11 }];
    const action = { type: ACTION.MOVE, id: idToMove, points: newPoints };
    const result = polygonsReducer(initialState, action);

    expect(result).toEqual([
      { id: 'polygon1', points: newPoints },
      { id: 'polygon2', points: [{ x: 2, y: 2 }, { x: 3, y: 3 }] },
    ]);
  });

  it('should handle VERTEX_ADD action (case #1)', () => {
    const polygonId = 'polygon1';
    const vertexIndex = 1;
    const newVertexPoint = { x: 5, y: 5 };
    const action = {
      type: ACTION.VERTEX_ADD, id: polygonId, vertexIndex, newVertexPoint,
    };
    const result = polygonsReducer(initialState, action);

    expect(result).toEqual([
      { id: 'polygon1', points: [{ x: 0, y: 0 }, { x: 1, y: 1 }, newVertexPoint] },
      { id: 'polygon2', points: [{ x: 2, y: 2 }, { x: 3, y: 3 }] },
    ]);
  });

  it('should handle VERTEX_ADD action (case #2)', () => {
    const polygonId = 'polygon1';
    const vertexIndex = 0;
    const newVertexPoint = { x: 4, y: 4 };
    const action = {
      type: ACTION.VERTEX_ADD, id: polygonId, vertexIndex, newVertexPoint,
    };
    const result = polygonsReducer(initialState, action);

    expect(result).toEqual([
      { id: 'polygon1', points: [{ x: 0, y: 0 }, newVertexPoint, { x: 1, y: 1 }] },
      { id: 'polygon2', points: [{ x: 2, y: 2 }, { x: 3, y: 3 }] },
    ]);
  });

  it('should handle VERTEX_UPDATE action', () => {
    const polygonId = 'polygon1';
    const vertexIndex = 0;
    const updatedVertexPoint = { x: 10, y: 10 };
    const action = {
      type: ACTION.VERTEX_UPDATE, id: polygonId, vertexIndex, updatedVertexPoint,
    };
    const result = polygonsReducer(initialState, action);

    expect(result).toEqual([
      { id: 'polygon1', points: [updatedVertexPoint, { x: 1, y: 1 }] },
      { id: 'polygon2', points: [{ x: 2, y: 2 }, { x: 3, y: 3 }] },
    ]);
  });

  it('should handle VERTEX_DELETE action', () => {
    const polygonId = 'polygon1';
    const vertexIndex = 1;
    const action = { type: ACTION.VERTEX_DELETE, id: polygonId, vertexIndex };
    const result = polygonsReducer(initialState, action);

    expect(result).toEqual([
      { id: 'polygon1', points: [{ x: 0, y: 0 }] },
      { id: 'polygon2', points: [{ x: 2, y: 2 }, { x: 3, y: 3 }] },
    ]);
  });
});
