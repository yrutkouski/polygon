import React from 'react';
import '../Whiteboard.css';

const UserWhiteboards = ({
  whiteboardIds,
  selected,
  handleWhiteboardSelect,
  handleWhiteboardDelete,
  handleWhiteboardLoad,
}) => (
  <div className="whiteboard__list">
    <ul>
      {whiteboardIds.map((whiteboardId) => (
        <li key={whiteboardId}>
          <input
            name="whiteboards"
            type="radio"
            checked={whiteboardId === selected}
            onChange={handleWhiteboardSelect(whiteboardId)}
          />
          {whiteboardId}
        </li>
      ))}
    </ul>
    <button type="button" onClick={handleWhiteboardDelete} disabled={selected === null}>
      Delete Selected
    </button>
    <button type="button" onClick={handleWhiteboardLoad} disabled={selected === null}>
      Load Selected
    </button>
  </div>
);

export default UserWhiteboards;
