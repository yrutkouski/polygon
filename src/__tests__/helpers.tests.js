import {
  jest, describe, it, expect,
} from '@jest/globals';
import { getPolygonPoints, generateId } from '../utils/helpers';

describe('helpers', () => {
  describe('getPolygonPoints', () => {
    it('should return correct number of points', () => {
      const numVertices = 3;
      const points = getPolygonPoints(numVertices);
      expect(points).toHaveLength(numVertices);
    });

    it('should return points with correct x and y values', () => {
      const numVertices = 4;
      const length = 100;
      const step = 5;
      const points = getPolygonPoints(numVertices, length, step);

      expect(points).toEqual([
        { x: 500, y: 400 },
        { x: 400, y: 500 },
        { x: 300, y: 400 },
        { x: 400, y: 300 },
      ]);
    });

    it('should throw an alert for less than 3 vertices', () => {
      const spyAlert = jest.spyOn(window, 'alert').mockImplementation(() => {
      });
      const numVertices = 2;
      getPolygonPoints(numVertices);
      expect(spyAlert).toHaveBeenCalledWith('A polygon must have at least 3 vertices.');
      spyAlert.mockRestore();
    });
  });

  describe('generateId', () => {
    it('should generate an ID with correct length', () => {
      const id = generateId();
      expect(id).toHaveLength(6);
    });

    it('should generate unique IDs', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).not.toEqual(id2);
    });
  });
});
