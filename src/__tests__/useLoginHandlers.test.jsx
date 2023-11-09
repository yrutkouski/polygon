import React from 'react';
import {
  jest, describe, it, expect, beforeEach,
} from '@jest/globals';
import { renderHook, act } from '@testing-library/react';
import useLoginHandlers, { FORM_ACTION } from '../components/Login/useLoginHandlers';
import * as hooks from '../utils/hooks';

describe('useLoginHandlers', () => {
  let setUserMock;
  let logUserMock;
  let saveUserMock;

  beforeEach(() => {
    setUserMock = jest.fn();
    logUserMock = jest.fn();
    saveUserMock = jest.fn();
    jest.spyOn(React, 'useContext').mockImplementation(() => ({ setUser: setUserMock }));

    jest.clearAllMocks();
  });

  it('should handle login', () => {
    jest.spyOn(React, 'useRef').mockImplementation(() => ({ current: { value: 'test' } }));
    jest.spyOn(hooks, 'useUser').mockImplementation(() => ({
      logUser: logUserMock,
      saveUser: saveUserMock,
      users: [
        { username: 'test', password: 'test' },
      ],
    }));

    const { result } = renderHook(() => useLoginHandlers());

    act(() => {
      result.current.handleSubmit(FORM_ACTION.LOGIN)();
    });

    expect(result.current.error).toBeFalsy();
    expect(logUserMock).toBeCalled();
    expect(setUserMock).toBeCalled();
  });

  it('should not handle login', () => {
    jest.spyOn(React, 'useRef').mockImplementation(() => ({ current: { value: 'test' } }));
    jest.spyOn(hooks, 'useUser').mockImplementation(() => ({
      logUser: logUserMock,
      saveUser: saveUserMock,
      users: [
        { username: 'not_test', password: 'not_test' },
      ],
    }));

    const { result } = renderHook(() => useLoginHandlers());

    act(() => {
      result.current.handleSubmit(FORM_ACTION.LOGIN)();
    });

    expect(result.current.error).not.toBeFalsy();
    expect(logUserMock).not.toBeCalled();
    expect(setUserMock).not.toBeCalled();
  });

  it('should handle signup', () => {
    jest.spyOn(React, 'useRef').mockImplementation(() => ({ current: { value: 'test' } }));
    jest.spyOn(hooks, 'useUser').mockImplementation(() => ({
      logUser: logUserMock,
      saveUser: saveUserMock,
      users: [],
    }));

    const { result } = renderHook(() => useLoginHandlers());

    act(() => {
      result.current.handleSubmit(FORM_ACTION.SIGNUP)();
    });

    expect(result.current.error).toBeFalsy();
    expect(saveUserMock).toBeCalled();
    expect(logUserMock).toBeCalled();
    expect(setUserMock).toBeCalled();
  });

  it('should not handle signup', () => {
    jest.spyOn(React, 'useRef').mockImplementation(() => ({ current: { value: 'test' } }));
    jest.spyOn(hooks, 'useUser').mockImplementation(() => ({
      logUser: logUserMock,
      saveUser: saveUserMock,
      users: [{
        username: 'test', password: 'test',
      }],
    }));

    const { result } = renderHook(() => useLoginHandlers());

    act(() => {
      result.current.handleSubmit(FORM_ACTION.SIGNUP)();
    });

    expect(result.current.error).not.toBeFalsy();
    expect(saveUserMock).not.toBeCalled();
    expect(logUserMock).not.toBeCalled();
    expect(setUserMock).not.toBeCalled();
  });
});
