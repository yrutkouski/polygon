import {useRef} from 'react';
import {CanvasRefContext} from '../context';
import {Polygons} from './Polygons';

export const Whiteboard = () => {
  const canvasRef = useRef(null);

  return (
    <div>
      <CanvasRefContext.Provider value={canvasRef}>
        <svg width={1000} height={500} id="canvas" ref={el => canvasRef.current = el}>
          <Polygons/>
        </svg>
      </CanvasRefContext.Provider>
    </div>
  )
}
