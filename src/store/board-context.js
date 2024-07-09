import { createContext } from "react";

const BoardContext=createContext({
    active_tool:"",
    elements:[],
    handleActiveTool:()=>{},
    BoardMouseDownHandler: ()=>{}
});

export default BoardContext;