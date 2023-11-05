import {useState} from 'react';
import {Polygon} from './components';
import {PointsContext} from './context'
import {getPolygonPoints} from './helpers'
import './App.css';

export const App = () => {
  const [points, setPoints] = useState(["170,170", "30,170", "30,30", "170,30"]);
  const [sides, setSides] = useState(points.length);

  const handleSides = e => {
    setSides(e.target.value);
  };

  const handlePolygonDelete = () => {
    setPoints([]);
    setSides(0);
  };

  const handlePolygonAdd = () => {
    const newPoints = getPolygonPoints(sides);
    setPoints(newPoints);
  };

  return (
    <PointsContext.Provider value={[points, setPoints]}>
      <div className="container">
        <div>
          <label htmlFor="points">
            Polygon sides:
            <input type="number" name="points" value={sides} onChange={handleSides}/>
          </label>
          {points.length
            ? (<button onClick={handlePolygonDelete}>Remove polygon</button>)
            : (<button onClick={handlePolygonAdd}>Add polygon</button>)
          }
          <p>{points.join(' ')}</p>
        </div>
        <Polygon/>
      </div>
    </PointsContext.Provider>
  )
}
