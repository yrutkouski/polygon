import {useRef, useState, useContext, useMemo} from 'react';
import {CanvasRefContext, PolygonsContext, UserContext} from '../context';
import {generateId} from '../helpers';
import {ACTION} from '../reducer';
import {Polygons} from './Polygons';

export const Whiteboard = () => {
  const [polygons, dispatch] = useContext(PolygonsContext);
  const [user] = useContext(UserContext);
  const canvasRef = useRef(null);

  const [dataCallTrigger, setDataCallTrigger] = useState(false);
  const allWhiteboards = useMemo(
    () => JSON.parse(localStorage.getItem('whiteboards')) || {},
    [dataCallTrigger],
  );

  const allWhiteboardsIds = useMemo(
    () => allWhiteboards[user.username]?.map(({id}) => id) || [],
    [allWhiteboards, user.username],
  );

  const getWhiteboardPolygons = useMemo(
    () => whiteboardId => allWhiteboards[user.username]?.find(({id}) => id === whiteboardId)?.polygons || [],
    [allWhiteboards, user.username],
  );

  const [whiteboardIds, setWhiteboardIds] = useState(allWhiteboardsIds);
  const [selected, setSelected] = useState(null);
  const [currentWhiteboardId, setCurrentWhiteboardId] = useState(null);

  const handleWhiteboardSelect = id => () => {
    setSelected(id);
  };

  const handleWhiteboardDelete = () => {
    setWhiteboardIds(prev => prev.filter((id) => id !== selected));
    if (selected === currentWhiteboardId) setCurrentWhiteboardId(null);

    const updatedUserWhiteboards = allWhiteboards[user.username].filter(({id}) => id !== selected);
    const updatedAllWhiteboards = {
      ...allWhiteboards,
      [user.username]: updatedUserWhiteboards,
    };

    localStorage.setItem('whiteboards', JSON.stringify(updatedAllWhiteboards));
    setDataCallTrigger(prev => !prev);
  };

  const handleWhiteboardLoad = () => {
    setCurrentWhiteboardId(selected);

    dispatch({
      type: ACTION.INIT,
      polygons: getWhiteboardPolygons(selected),
    });
  };

  const handleWhiteboardCreate = () => {
    setCurrentWhiteboardId(generateId());
    setSelected(null);

    dispatch({
      type: ACTION.INIT,
      polygons: [],
    });
  };

  const handleWhiteboardSave = () => {
    let updatedUserWhiteboards;
    if (whiteboardIds.length) {
      updatedUserWhiteboards = whiteboardIds.map(whiteboardId => ({
        id: whiteboardId,
        polygons: whiteboardId === currentWhiteboardId ? polygons : getWhiteboardPolygons(whiteboardId),
      }));
    } else {
      updatedUserWhiteboards = [{ id: currentWhiteboardId, polygons }]
    }

    if (whiteboardIds.indexOf(currentWhiteboardId) === -1) {
      setWhiteboardIds(prev => [...prev, currentWhiteboardId]);
      updatedUserWhiteboards.push({ id: currentWhiteboardId, polygons });
    }

    const updatedAllWhiteboards = {
      ...allWhiteboards,
      [user.username]: updatedUserWhiteboards,
    };

    localStorage.setItem('whiteboards', JSON.stringify(updatedAllWhiteboards));
    setDataCallTrigger(prev => !prev);
  };

  return (
    <div>
      {!!currentWhiteboardId && (
        <div>
          <CanvasRefContext.Provider value={canvasRef}>
            <svg width={1000} height={500} id="canvas" ref={(el) => (canvasRef.current = el)}>
              <Polygons/>
            </svg>
          </CanvasRefContext.Provider>
        </div>
      )}
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
      <button onClick={handleWhiteboardDelete} disabled={selected === null}>
        Delete Selected
      </button>
      <button onClick={handleWhiteboardLoad} disabled={selected === null}>
        Load Selected
      </button>
      <button onClick={handleWhiteboardCreate}>New board</button>
      {!!currentWhiteboardId && (
        <button onClick={handleWhiteboardSave}>Save board</button>
      )}
    </div>
  );
};
