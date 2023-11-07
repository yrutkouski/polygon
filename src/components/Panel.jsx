import {useState, useContext} from 'react';
import {PolygonsContext, UserContext} from '../context';
import {getPolygonPoints, generateId} from '../helpers';
import {ACTION} from '../reducer';

export const Panel = () => {
  const [, dispatch] = useContext(PolygonsContext);
  const [user, setUser] = useContext(UserContext);
  const [sides, setSides] = useState(4);

  const handleLogOut = e => {
    e.preventDefault();
    sessionStorage.setItem('current_user', JSON.stringify({}));
    setUser({});
  };

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
      <div>
        <p>Hello, {user.username}</p>
        <form onSubmit={handleLogOut}>
          <button type="submit">Log Out</button>
        </form>
      </div>
      <label htmlFor="points">
        New polygon sides:
        <input type="number" name="points" value={sides} onChange={handleSides}/>
      </label>
      <button onClick={handlePolygonAdd}>Add polygon</button>
    </div>
  )
}
