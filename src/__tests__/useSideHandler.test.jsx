import React from 'react';
import {
  jest, describe, it, expect, beforeEach,
} from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import { PolygonsContext, CanvasRefContext } from '../utils/context';
import { ACTION } from '../utils/reducer';
import useSideHandlers from '../components/Whiteboard/components/Polygons/Sides/useSideHandlers';

describe('useSideHandlers', () => {
  let dispatchMock;
  let polygonsMock;
  let canvasRefMock;
  let result;
  const polygonId = 'polygon1';
  const vertexIndex = 0;

  beforeEach(() => {
    dispatchMock = jest.fn();
    polygonsMock = [{ id: 'polygon1', points: [{ x: 0, y: 0 }] }];
    canvasRefMock = { current: { getBoundingClientRect: jest.fn(() => ({ x: 0, y: 0 })) } };

    result = renderHook(() => useSideHandlers('polygon1'), {
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

  it('should handle vertex add', () => {
    act(() => {
      result.current.handleVertexAdd(vertexIndex)({ clientX: 10, clientY: 20 });
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: ACTION.VERTEX_ADD,
      id: polygonId,
      vertexIndex,
      newVertexPoint: { x: 10, y: 20 },
    });
  });

  it('should handle vertex add on the top of existing', () => {
    act(() => {
      result.current.handleVertexAdd(vertexIndex)({ clientX: 0, clientY: 0 });
    });

    expect(dispatchMock).not.toHaveBeenCalled();
  });
});
