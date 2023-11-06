import {useReducer} from 'react';
import './App.css';
import {Whiteboard, Panel} from './components';
import {PolygonsContext} from './context'
import {polygonsReducer} from './reducer'

export const App = () => {
  const [polygons, dispatch] = useReducer(polygonsReducer, []);

  return (
    <PolygonsContext.Provider value={[polygons, dispatch]}>
      <div className="container">
        <Panel/>
        <Whiteboard/>
      </div>
    </PolygonsContext.Provider>
  )
}
