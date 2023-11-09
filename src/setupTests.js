import '@testing-library/jest-dom';
import '@testing-library/react';

const storageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

global.localStorage = storageMock;
global.sessionStorage = storageMock;
