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
      case "CHANGE_FILL":{
        return {
            ...state,
            [action.payload.tool]: {
              ...state[action.payload.tool],
              fill: action.payload.fill,
            }
        }
      }
      case "CHANGE_SIZE":{
        return {
            ...state,
            [action.payload.tool]: {
              ...state[action.payload.tool],
              size: action.payload.size,
            }
        }
      }
        default:
            break;
    }
}

const InitialToolBoxState={
    ["Pencil"]:{
        stroke: COLORS.BLACK,
        fill: null,
        size: 20
    },
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
    },
    ["Eraser"]:{
        stroke: "#ffffff",
        fill: null,
        size: 50
    },
    ["Text"]:{
        stroke: COLORS.BLACK,
        fill: null,
        size: 32
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
    const ChangeFillColorHandler=(tool,fill)=>{
        dispatchToolBoxActions({
            type: "CHANGE_FILL",
            payload:{
                tool,
                fill
            }
        })
    }

  const HandleBrushSize=(tool,size)=>{
        dispatchToolBoxActions({
            type:"CHANGE_SIZE",
            payload:{
                tool,
                size
            }
        })
  }

  const ToolBoxContextValue={
        ToolBoxState:toolBoxState,
        ColorStrokeTool: ChangeColorHandler,
        ColorFillTool: ChangeFillColorHandler,
        ChangeSizeTool: HandleBrushSize
  };


  return (
    <ToolBoxContext.Provider value={ToolBoxContextValue}>
        {children}
    </ToolBoxContext.Provider>
  )
}

export default ToolBoxContextProvider;
