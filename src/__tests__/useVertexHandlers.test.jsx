import React from 'react';
import {
  jest, describe, it, expect, beforeEach,
} from '@jest/globals';
import { renderHook, act, fireEvent } from '@testing-library/react';
import { PolygonsContext, CanvasRefContext } from '../utils/context';
import { ACTION } from '../utils/reducer';
import useVertexHandlers from '../components/Whiteboard/components/Polygons/Vertices/useVertexHandlers';

describe('useVertexHandlers', () => {
  let dispatchMock;
  let polygonsMock;
  let canvasRefMock;
  let result;
  const polygonId = 'polygon1';
  const vertexIndex = 0;

  beforeEach(() => {
    dispatchMock = jest.fn();
    polygonsMock = [{ id: 'polygon1', points: [{ x: 0, y: 0 }] }];
    canvasRefMock = { current: { getBoundingClientRect: jest.fn(() => ({ x: 10, y: 10 })) } };

    result = renderHook(() => useVertexHandlers('polygon1'), {
      wrapper: ({ children }) => (
        <CanvasRefContext.Provider value={canvasRefMock}>
          <PolygonsContext.Provider value={{ polygons: polygonsMock, dispatch: dispatchMock }}>
            {children}
          </PolygonsContext.Provider>
        </CanvasRefContext.Provider>
      ),
    }).result;

    jest.clearAllMocks();
  });

  it('should handle vertex delete', () => {
    act(() => {
      result.current.handleVertexDelete(vertexIndex)();
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: ACTION.VERTEX_DELETE,
      id: polygonId,
      vertexIndex,
    });
  });

  it('should handle vertex move', () => {
    act(() => {
      result.current.handleVertexMove(vertexIndex)();
    });

    act(() => {
      fireEvent.mouseMove(document, { clientX: 10, clientY: 20 });
    });

    act(() => {
      fireEvent.mouseUp(document);
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: ACTION.VERTEX_UPDATE,
      id: polygonId,
      vertexIndex,
      updatedVertexPoint: { x: 0, y: 10 },
    });
  });
});
