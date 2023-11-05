import {useContext, useRef} from 'react';
import {PointsContext} from '../context';
import {Sides} from './Sides';
import {Vertices} from './Vertices';

export const Polygon = () => {
  const [points] = useContext(PointsContext);

  const canvasRef = useRef(null);

  return (
    <div>
      <svg width={1000} height={500} id="canvas" ref={el => canvasRef.current = el}>
        <polygon
          points={points.join(' ')}
          fill="red"
        />
        <Vertices canvasRef={canvasRef}/>
        <Sides/>
      </svg>
    </div>
  )
}
