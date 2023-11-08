import { useContext } from 'react';
import { CanvasRefContext, PolygonsContext } from './context';

export const useUser = () => {
  const currentUser = JSON.parse(sessionStorage.getItem('current_user'));
  const users = JSON.parse(localStorage.getItem('users'));

  const saveUser = (updatedUsers) => {
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const logUser = (user) => {
    sessionStorage.setItem('current_user', JSON.stringify(user));
  };

  return {
    currentUser, logUser, saveUser, users,
  };
};

export const useCurrentCoordinate = () => {
  const canvasRef = useContext(CanvasRefContext);

  return (e) => {
    const boundCan = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - boundCan.x;
    const y = e.clientY - boundCan.y;

    return { x, y };
  };
};

export const usePoints = () => {
  const { polygons } = useContext(PolygonsContext);

  return (polygonId) => polygons.find((polygon) => polygon.id === polygonId).points || [];
};
