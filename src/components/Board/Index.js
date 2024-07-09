import React, { useContext } from 'react'
import { useEffect, useRef } from "react";
import rough from 'roughjs';
import BoardContext from '../../store/board-context';

const Board = () => {

    const canvasRef = useRef();
    const {elements,BoardMouseDownHandler}=useContext(BoardContext);

    useEffect(() => {

        const canvas=canvasRef.current; 
        canvas.height=window.innerHeight;
        canvas.width=window.innerWidth;     
    }, []);

    useEffect(()=>{

      const canvas=canvasRef.current; 
      const context = canvas.getContext("2d");
      context.save(); 
      const roughCanvas = rough.canvas(canvas);
      elements.forEach((element) => {
        roughCanvas.draw(element.roughElement);
      });
      return () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
      };

    },[elements]);
  

  return (
    <div>
          <canvas ref={canvasRef} onMouseDown={(event)=>BoardMouseDownHandler(event)} />
    </div>
  )
}

export default Board;