import { createContext } from "react";

const BoardContext=createContext({
    active_tool:"",
    toolState:"",
    elements:[],
    handleActiveTool:()=>{},
    BoardMouseDownHandler: ()=>{},
    BoardMouseMoveHandler: ()=>{},
    BoardMouseUpHandler: ()=>{}
});

export default BoardContext;