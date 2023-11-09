import React from 'react';
import {
  jest, describe, it, expect, beforeEach,
} from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import { UserContext, PolygonsContext } from '../utils/context';
import useWhiteboardHandlers from '../components/Whiteboard/useWhiteboardHandlers';

describe('useWhiteboardHandlers', () => {
  let result;

  beforeEach(() => {
    result = renderHook(() => useWhiteboardHandlers(), {
      wrapper: ({ children }) => (
        <UserContext.Provider value={{ user: { username: 'testUser' } }}>
          <PolygonsContext.Provider value={{ polygons: [], dispatch: jest.fn() }}>
            {children}
          </PolygonsContext.Provider>
        </UserContext.Provider>
      ),
    }).result;
  });

  it('should initialize with default values', () => {
    const {
      whiteboardIds,
      currentWhiteboardId,
      selected,
    } = result.current;

    expect(whiteboardIds).toEqual([]);
    expect(currentWhiteboardId).toBeNull();
    expect(selected).toBeNull();
  });

  it('should handle whiteboard create', () => {
    act(() => {
      result.current.handleWhiteboardCreate();
    });

    const {
      currentWhiteboardId,
      selected,
    } = result.current;

    expect(currentWhiteboardId).not.toBeNull();
    expect(selected).toBeNull();
  });

  it('should handle whiteboard save', () => {
    act(() => {
      result.current.handleWhiteboardCreate();
    });

    act(() => {
      result.current.handleWhiteboardSave();
    });

    const { whiteboardIds, currentWhiteboardId } = result.current;

    expect(whiteboardIds.length).toBe(1);
    expect(whiteboardIds[0]).toBe(currentWhiteboardId);
  });

  it('should handle whiteboard load', () => {
    act(() => {
      result.current.handleWhiteboardCreate();
    });

    act(() => {
      result.current.handleWhiteboardSave();
    });

    const initialCurrentWhiteboardId = result.current.currentWhiteboardId;

    act(() => {
      result.current.handleWhiteboardCreate();
    });

    const newCurrentWhiteboardId = result.current.currentWhiteboardId;

    act(() => {
      result.current.handleWhiteboardSelect(initialCurrentWhiteboardId)();
    });

    act(() => {
      result.current.handleWhiteboardLoad();
    });

    const { selected, currentWhiteboardId } = result.current;

    expect(selected).toBe(currentWhiteboardId);
    expect(newCurrentWhiteboardId).not.toEqual(initialCurrentWhiteboardId);
  });

  it('should handle whiteboard delete', () => {
    act(() => {
      result.current.handleWhiteboardCreate();
    });

    act(() => {
      result.current.handleWhiteboardSave();
    });

    const initialWhiteboardIds = [...result.current.whiteboardIds];
    const initialCurrentWhiteboardId = result.current.currentWhiteboardId;

    act(() => {
      result.current.handleWhiteboardSelect(initialCurrentWhiteboardId)();
    });

    act(() => {
      result.current.handleWhiteboardDelete();
    });

    const { whiteboardIds, currentWhiteboardId, selected } = result.current;

    expect(whiteboardIds).toEqual(initialWhiteboardIds.filter((id) => id !== initialCurrentWhiteboardId));
    expect(currentWhiteboardId).toBeNull();
    expect(selected).toBeNull();
  });
});
