import {useReducer, useState} from 'react';
import './App.css';
import {Whiteboard, Panel, Login} from './components';
import {PolygonsContext, UserContext} from './context'
import {isEmpty} from './helpers'
import {polygonsReducer} from './reducer'

export const App = () => {
  const [polygons, dispatch] = useReducer(polygonsReducer, []);

  const currentUser = JSON.parse(sessionStorage.getItem('current_user'));
  const [user, setUser] = useState(currentUser);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {isEmpty(user)
        ? (
          <Login/>
        )
        : (<PolygonsContext.Provider value={[polygons, dispatch]}>
          <div className="container">
            <Panel/>
            <Whiteboard/>
          </div>
        </PolygonsContext.Provider>)}
    </UserContext.Provider>
  )
}
