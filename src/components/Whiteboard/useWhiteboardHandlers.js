import { useMemo, useContext, useState } from 'react';
import { PolygonsContext, UserContext } from '../../utils/context';
import { generateId } from '../../utils/helpers';
import { ACTION } from '../../utils/reducer';

const whiteboardStorageMethods = (dataCallTrigger, username) => {
  const allWhiteboards = useMemo(
    () => JSON.parse(localStorage.getItem('whiteboards')) || {},
    [dataCallTrigger],
  );

  const allWhiteboardsIds = useMemo(
    () => allWhiteboards[username]?.map(({ id }) => id) || [],
    [allWhiteboards, username],
  );

  const getWhiteboardPolygons = useMemo(
    () => (whiteboardId) => allWhiteboards[username]?.find(({ id }) => id === whiteboardId)?.polygons || [],
    [allWhiteboards, username],
  );

  const saveWhiteboards = (whiteboards) => {
    localStorage.setItem('whiteboards', JSON.stringify(whiteboards));
  };

  return {
    allWhiteboards,
    allWhiteboardsIds,
    getWhiteboardPolygons,
    saveWhiteboards,
  };
};

const useWhiteboardHandlers = () => {
  const { user: { username } } = useContext(UserContext);
  const { polygons, dispatch } = useContext(PolygonsContext);

  const [dataCallTrigger, setDataCallTrigger] = useState(false);
  const {
    allWhiteboards,
    allWhiteboardsIds,
    getWhiteboardPolygons,
    saveWhiteboards,
  } = whiteboardStorageMethods(dataCallTrigger, username);

  const [whiteboardIds, setWhiteboardIds] = useState(allWhiteboardsIds);
  const [selected, setSelected] = useState(null);
  const [currentWhiteboardId, setCurrentWhiteboardId] = useState(null);

  const handleWhiteboardSelect = (id) => () => {
    setSelected(id);
  };

  const handleWhiteboardDelete = () => {
    setWhiteboardIds((prev) => prev.filter((id) => id !== selected));
    if (selected === currentWhiteboardId) setCurrentWhiteboardId(null);

    const updatedUserWhiteboards = allWhiteboards[username].filter(({ id }) => id !== selected);
    const updatedAllWhiteboards = {
      ...allWhiteboards,
      [username]: updatedUserWhiteboards,
    };

    saveWhiteboards(updatedAllWhiteboards);
    setDataCallTrigger((prev) => !prev);
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
    let updatedUserWhiteboards = [];
    if (whiteboardIds.length) {
      updatedUserWhiteboards = whiteboardIds.map((whiteboardId) => ({
        id: whiteboardId,
        polygons: whiteboardId === currentWhiteboardId ? polygons : getWhiteboardPolygons(whiteboardId),
      }));
    }

    if (whiteboardIds.indexOf(currentWhiteboardId) === -1) {
      setWhiteboardIds((prev) => [...prev, currentWhiteboardId]);
      updatedUserWhiteboards.push({ id: currentWhiteboardId, polygons });
    }

    const updatedAllWhiteboards = {
      ...allWhiteboards,
      [username]: updatedUserWhiteboards,
    };

    saveWhiteboards(updatedAllWhiteboards);
    setDataCallTrigger((prev) => !prev);
  };

  return {
    whiteboardIds,
    currentWhiteboardId,
    selected,
    handleWhiteboardCreate,
    handleWhiteboardSave,
    handleWhiteboardSelect,
    handleWhiteboardDelete,
    handleWhiteboardLoad,
  };
};

export default useWhiteboardHandlers;
