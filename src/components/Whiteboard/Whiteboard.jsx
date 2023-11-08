import React, { useRef } from 'react';
import { CanvasRefContext } from '../../utils/context';
import { Polygons, NewPolygonControls, UserWhiteboards } from './components';
import useWhiteboardHandlers from './useWhiteboardHandlers';
import './Whiteboard.css';

const Whiteboard = () => {
  const canvasRef = useRef(null);

  const {
    selected,
    whiteboardIds,
    currentWhiteboardId,
    handleWhiteboardCreate,
    handleWhiteboardSave,
    handleWhiteboardSelect,
    handleWhiteboardDelete,
    handleWhiteboardLoad,
  } = useWhiteboardHandlers();

  return (
    <div className="whiteboard">
      <div>
        <button type="button" onClick={handleWhiteboardCreate}>New board</button>
        {!!currentWhiteboardId && (
        <>
          <button type="button" onClick={handleWhiteboardSave}>Save board</button>
          <NewPolygonControls />
        </>
        )}
      </div>
      {!!currentWhiteboardId && (
        <div className="whiteboard__canvas-wrapper">
          <CanvasRefContext.Provider value={canvasRef}>
            <svg
              width={1200}
              height={600}
              className="whiteboard__canvas"
              ref={(el) => { canvasRef.current = el; }}
            >
              <Polygons />
            </svg>
          </CanvasRefContext.Provider>
        </div>
      )}
      {!!whiteboardIds.length && (
      <UserWhiteboards
        {...{
          whiteboardIds,
          selected,
          handleWhiteboardSelect,
          handleWhiteboardDelete,
          handleWhiteboardLoad,
        }}
      />
      )}
    </div>
  );
};

export default Whiteboard;
