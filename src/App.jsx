import React, { useReducer, useState, useMemo } from 'react';
import { Whiteboard, Panel, Login } from './components';
import { PolygonsContext, UserContext } from './utils/context';
import { isEmpty } from './utils/helpers';
import { polygonsReducer } from './utils/reducer';
import { useUser } from './utils/hooks';
import './app.css';

const App = () => {
  const [polygons, dispatch] = useReducer(polygonsReducer, []);

  const { currentUser } = useUser();
  const [user, setUser] = useState(currentUser);

  const memoUserProviderValue = useMemo(() => ({ user, setUser }), [user, setUser]);
  const memoPolygonsProviderValue = useMemo(() => ({ polygons, dispatch }), [polygons, dispatch]);

  return (
    <UserContext.Provider value={memoUserProviderValue}>
      <div className="container">
        {isEmpty(user)
          ? (
            <Login />
          )
          : (
            <PolygonsContext.Provider value={memoPolygonsProviderValue}>
              <Panel />
              <Whiteboard />
            </PolygonsContext.Provider>
          )}
      </div>
    </UserContext.Provider>
  );
};

export default App;
