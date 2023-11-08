import React, { useContext } from 'react';
import { UserContext } from '../../utils/context';
import './panel.css';

const Panel = () => {
  const { user, setUser } = useContext(UserContext);

  const handleLogOut = () => {
    sessionStorage.setItem('current_user', JSON.stringify({}));
    setUser({});
  };

  return (
    <div className="panel">
      <div className="panel__legend">
        <h4>Legend</h4>
        <p>Double click vertex or polygon to delete it.</p>
        <p>Click on side to add a new vertex.</p>
        <p>Mouse down to move vertex or polygon</p>
      </div>
      <div>
        <p>
          Hello,
          {user.username}
        </p>
        <button type="button" onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
};

export default Panel;
