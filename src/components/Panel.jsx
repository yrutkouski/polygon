import {useState, useContext} from 'react';
import {PolygonsContext} from '../context';
import {getPolygonPoints, generateId} from '../helpers';
import {ACTION} from '../reducer';

export const Panel = () => {
  const [, dispatch] = useContext(PolygonsContext);
  const [sides, setSides] = useState(4);

  const handleSides = e => {
    setSides(e.target.value);
  };

  const handlePolygonAdd = () => {
    dispatch({
      type: ACTION.ADD,
      points: {
        id: generateId(),
        points: getPolygonPoints(sides)
      }
    });
  };

  return (
    <div>
      <label htmlFor="points">
        New polygon sides:
        <input type="number" name="points" value={sides} onChange={handleSides}/>
      </label>
      <button onClick={handlePolygonAdd}>Add polygon</button>
    </div>
  )
}
