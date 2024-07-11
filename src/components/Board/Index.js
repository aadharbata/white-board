import React, { useContext, useLayoutEffect, useRef, useEffect } from 'react';
import rough from 'roughjs';
import BoardContext from '../../store/board-context';
import "./Index.module.css";
import ToolBoxContext from '../../store/toolbox-context';

const Board = () => {

    const canvasRef = useRef();
    const { elements, BoardMouseDownHandler, BoardMouseMoveHandler, toolState, BoardMouseUpHandler } = useContext(BoardContext);
    const { ToolBoxState } = useContext(ToolBoxContext);

    useEffect(() => {
        const canvas = canvasRef.current; 
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;     
    }, []);

    useLayoutEffect(() => {
        const canvas = canvasRef.current; 
        const context = canvas.getContext("2d");
        context.save(); 
        const roughCanvas = rough.canvas(canvas);
        elements.forEach((element) => {
            if (element.type === "Pencil") {
                context.fillStyle = element.stroke;
                context.fill(element.path);
                context.restore();
            } else {
                roughCanvas.draw(element.roughElement);
            }
        });
        return () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, [elements]);
    
    const MouseDownHandler = (event) => {
        BoardMouseDownHandler(event, ToolBoxState);
    }

    const MouseMoveHandler = (event) => {
        if (toolState === "DRAWING") {
            BoardMouseMoveHandler(event, ToolBoxState);
        }
    }

    const MouseUpHandler = () => {
        BoardMouseUpHandler();
    }

    return (
        <div>
            <canvas ref={canvasRef} onMouseDown={MouseDownHandler} onMouseMove={MouseMoveHandler} onMouseUp={MouseUpHandler}/>
        </div>
    );
}

export default Board;