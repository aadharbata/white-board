import React, { useReducer } from 'react'
import ToolBoxContext from './toolbox-context';
import { COLORS } from '../constant';


const ToolBoxReducers=(state,action)=>{
    switch (action.type) {
      case "CHANGE_COLOR":
            return {
              ...state,
              [action.payload.tool]: {
                ...state[action.payload.tool],
                stroke: action.payload.color,
              },
        };
    
        default:
            break;
    }
}

const InitialToolBoxState={
    ["Line"]:{
        stroke: COLORS.BLACK,
        size:1
    },
    ["Rectangle"]:{
        stroke: COLORS.BLACK,
        fill: null,
        size: 1
    },
    ["Circle"]:{
        stroke: COLORS.BLACK,
        fill: null,
        size: 1
    },
    ["Arrow"]:{
        stroke: COLORS.BLACK,
        fill: null,
        size: 1
    }
};

const ToolBoxContextProvider = ({children}) => {

    const [toolBoxState,dispatchToolBoxActions]=useReducer(ToolBoxReducers,InitialToolBoxState);


    const ChangeColorHandler=(tool,color)=>{
        dispatchToolBoxActions({
            type: "CHANGE_COLOR",
            payload:{
                tool,
                color
            }
        })
    }

  const ToolBoxContextValue={
        ToolBoxState:toolBoxState,
        ColorChangeTool: ChangeColorHandler
  };

  return (
    <ToolBoxContext.Provider value={ToolBoxContextValue}>
        {children}
    </ToolBoxContext.Provider>
  )
}

export default ToolBoxContextProvider;