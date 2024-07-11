import { createContext } from "react";

const ToolBoxContext=createContext({
    ToolBoxState:{},
    ColorStrokeTool:()=>{},
    ColorFillTool:()=>{},
    ChangeSizeTool: ()=>{}
});

export default ToolBoxContext;