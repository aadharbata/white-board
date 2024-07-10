import { createContext } from "react";

const ToolBoxContext=createContext({
    ToolBoxState:{},
    ColorChangeTool:()=>{}
});

export default ToolBoxContext;