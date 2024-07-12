import { createContext } from "react";

const BoardContext=createContext({
    active_tool:"",
    toolState:"",
    history:[[]],
    index:0,
    elements:[],
    handleActiveTool:()=>{},
    BoardMouseDownHandler: ()=>{},
    BoardMouseMoveHandler: ()=>{},
    BoardMouseUpHandler: ()=>{},
    textAreaBlurHandler: ()=>{},
    Undo: ()=>{},
    Redo: ()=>{},
});

export default BoardContext;