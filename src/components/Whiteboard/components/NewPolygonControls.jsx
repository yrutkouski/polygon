import React, { useState, useContext } from 'react';
import { PolygonsContext } from '../../../utils/context';
import { generateId, getPolygonPoints } from '../../../utils/helpers';
import { ACTION } from '../../../utils/reducer';
import '../Whiteboard.css';

const NewPolygonControls = () => {
  const { polygons, dispatch } = useContext(PolygonsContext);

  const [newPolygon, setNewPolygon] = useState({
    color: '#FF0000',
    sides: 4,
    length: 100,
  });

  const handlePolygonAdd = () => {
    dispatch({
      type: ACTION.ADD,
      points: {
        id: generateId(),
        points: getPolygonPoints(newPolygon.sides, newPolygon.length, polygons?.length),
        color: newPolygon.color,
      },
    });
  };

  const handleNewPolygon = (field) => (e) => {
    setNewPolygon((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="whiteboard__controls">
      <label htmlFor="points">
        Sides:
        <input
          type="number"
          name="points"
          value={newPolygon.sides}
          onChange={handleNewPolygon('sides')}
        />
      </label>
      <label htmlFor="side-length">
        Length:
        <input
          type="number"
          name="side-length"
          value={newPolygon.length}
          onChange={handleNewPolygon('length')}
        />
      </label>
      <label htmlFor="color">
        Color:
        <input
          type="color"
          name="color"
          value={newPolygon.color}
          onChange={handleNewPolygon('color')}
        />
      </label>
      <button type="button" onClick={handlePolygonAdd}>Add polygon</button>
    </div>
  );
};

export default NewPolygonControls;
