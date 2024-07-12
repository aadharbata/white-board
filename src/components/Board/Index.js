import React, { useContext, useLayoutEffect, useRef, useEffect } from 'react';
import rough from 'roughjs';
import BoardContext from '../../store/board-context';
import "./Index.module.css";
import ToolBoxContext from '../../store/toolbox-context';
import html2canvas from 'html2canvas';
import classes from "./Index.module.css"

const Board = ({download,set}) => {

    const TextAreaRef=useRef();
    const canvasRef = useRef();
    const { elements, BoardMouseDownHandler, BoardMouseMoveHandler, toolState, BoardMouseUpHandler,textAreaBlurHandler ,Undo,Redo} = useContext(BoardContext);
    const { ToolBoxState } = useContext(ToolBoxContext);

    useEffect(() => {
        const canvas = canvasRef.current; 
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;     
    }, []);

    useEffect(() => {
        function handleKeyDown(event) {
          if (event.ctrlKey && event.key === "z") {
            Undo();
          } else if (event.ctrlKey && event.key === "y") {
            Redo();
          }
        }
    
        document.addEventListener("keydown", handleKeyDown);
    
        return () => {
          document.removeEventListener("keydown", handleKeyDown);
        };
      }, [Undo, Redo]);

    useLayoutEffect(() => {
        const canvas = canvasRef.current; 
        const context = canvas.getContext("2d");
        context.save(); 
        const roughCanvas = rough.canvas(canvas);
        elements.forEach((element) => {

            switch (element.type) {
                case "Pencil":{
                    context.fillStyle = element.stroke;
                    context.fill(element.path);
                    context.restore();
                    break;
                } 
                case "Eraser":{
                    context.fillStyle = element.stroke;
                    context.fill(element.path);
                    context.restore();
                    break;
                }
                case "Text":{
                    context.textBaseline = "top";
                    context.font = `${element.size}px Caveat`;
                    context.fillStyle = element.stroke;
                    context.fillText(element.text, element.x1, element.y1-10);
                    context.restore();
                    break;
                }
                case "Line":
                case "Rectangle":
                case "Circle":
                case "Arrow":{
                    roughCanvas.draw(element.roughElement);
                    break;
                }
                
                default:
                    break;
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

    useEffect(() => {
        const textarea = TextAreaRef.current;
        if (toolState === "WRITING") {
          setTimeout(() => {
            textarea.focus();
          }, 0);
        }
      }, [toolState]);

    if(download){
      const handleCaptureClick = async () => {
        if (canvasRef.current) {
          const canvas = await html2canvas(canvasRef.current);
          const dataUrl = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'canvas.png';
          link.click();
        }
      };
      handleCaptureClick();
      set();
    }
    

    return (
        <>  
        {toolState==="WRITING" && 
        <textarea ref={TextAreaRef}
        className={classes.textElementBox}
        style={{
            top: elements[elements.length - 1].y1-20,
            left: elements[elements.length - 1].x1,
            fontSize: `${elements[elements.length - 1]?.size}px`,
            color: elements[elements.length - 1]?.stroke,
          }}
          onBlur={(event) =>
            textAreaBlurHandler(event.target.value,ToolBoxState)
          }
        />}
        <div>
            <canvas ref={canvasRef} onMouseDown={MouseDownHandler} onMouseMove={MouseMoveHandler} onMouseUp={MouseUpHandler}/>
        </div>
        </>
    );
}

export default Board;