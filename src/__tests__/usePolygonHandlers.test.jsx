import React from 'react';
import {
  jest, describe, it, expect, beforeEach,
} from '@jest/globals';
import { renderHook, act, fireEvent } from '@testing-library/react';
import { PolygonsContext, CanvasRefContext } from '../utils/context';
import { ACTION } from '../utils/reducer';
import usePolygonHandlers from '../components/Whiteboard/components/Polygons/usePolygonHandlers';

describe('usePolygonHandlers', () => {
  let dispatchMock;
  let canvasRefMock;
  let result;

  beforeEach(() => {
    dispatchMock = jest.fn();
    canvasRefMock = { current: { getBoundingClientRect: jest.fn(() => ({ x: 10, y: 10 })) } };

    result = renderHook(() => usePolygonHandlers(), {
      wrapper: ({ children }) => (
        <CanvasRefContext.Provider value={canvasRefMock}>
          <PolygonsContext.Provider value={{ dispatch: dispatchMock }}>
            {children}
          </PolygonsContext.Provider>
        </CanvasRefContext.Provider>
      ),
    }).result;

    jest.clearAllMocks();
  });

  it('should handle polygon delete', () => {
    act(() => {
      result.current.handlePolygonDelete(0)();
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: ACTION.DELETE,
      index: 0,
    });
  });

  it('should handle polygon move', () => {
    act(() => {
      result.current.handlePolygonMove(1, [{ x: 10, y: 20 }, { x: 20, y: 30 }])({
        clientX: 10,
        clientY: 20,
      });
    });

    act(() => {
      fireEvent.mouseMove(document, { clientX: 10, clientY: 10 });
    });

    act(() => {
      fireEvent.mouseUp(document);
    });

    expect(dispatchMock).toHaveBeenCalledWith({
      type: ACTION.MOVE,
      id: 1,
      points: [{ x: 10, y: 10 }, { x: 20, y: 20 }],
    });
  });
});
