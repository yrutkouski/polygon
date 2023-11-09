import React from 'react';
import {
  jest, describe, it, expect,
} from '@jest/globals';
import { renderHook } from '@testing-library/react';
import { useCurrentCoordinate, usePoints } from '../utils/hooks';

describe('hooks', () => {
  describe('useCurrentCoordinate', () => {
    it('should return the correct coordinates based on the event', () => {
      const canvasRefValue = { current: { getBoundingClientRect: jest.fn(() => ({ x: 10, y: 10 })) } };
      jest.spyOn(React, 'useContext').mockImplementation(() => canvasRefValue);

      const { result } = renderHook(() => useCurrentCoordinate());

      const eventMock = { clientX: 10, clientY: 20 };

      const coordinates = result.current(eventMock);
      expect(coordinates).toEqual({ x: 0, y: 10 });
    });
  });

  describe('usePoints', () => {
    it('should return points for the given id', () => {
      const polygonsContextValue = {
        polygons: [
          { id: 'polygon1', points: [{ x: 0, y: 0 }] },
          { id: 'polygon2', points: [{ x: 0, y: 0 }, { x: 1, y: 1 }] },
        ],
      };
      jest.spyOn(React, 'useContext').mockImplementation(() => polygonsContextValue);

      const { result } = renderHook(() => usePoints());

      const polygonId = 'polygon1';
      const points = result.current(polygonId);

      expect(points).toEqual([{ x: 0, y: 0 }]);
    });

    it('should return empty points', () => {
      const polygonsContextValue = { polygons: [{ id: 'polygon1', points: [{ x: 0, y: 0 }] }] };
      jest.spyOn(React, 'useContext').mockImplementation(() => polygonsContextValue);

      const { result } = renderHook(() => usePoints());

      const polygonId = 'polygon2';
      const points = result.current(polygonId);

      expect(points).toEqual([]);
    });
  });
});
