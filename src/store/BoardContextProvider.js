import React, { useReducer } from 'react'
import BoardContext from './board-context';
import rough from "roughjs/bin/rough";


const gen = rough.generator();
const initialBoardstate={
    activetool:"",
    elements:[]
}

const BoardReducers=(state,action)=>{
    switch (action.type) {
      case "CHANGE_TOOL":
        return(
          {
            ...state,
            activetool: action.payload.tool
          }
        )
      case "DROP_DOWN":
        const{clientX,clientY}=action.payload;
        const newElement={
          id: state.elements.length,
          x1: clientX,
          y1: clientY,
          x2: clientX,
          y2: clientY,
          roughElement: gen.line(10,10,clientX,clientY),
        }
        return(
          {
            ...state,
            elements: [...state.elements,newElement]
          }
        )

      default:
        return state;
    }
}

const BoardContextProvider = ({children}) => {

  const [BoardState,dispatchBoardActions]=useReducer(BoardReducers,initialBoardstate);

  const setActiveTool=(tool)=>{
      dispatchBoardActions({
        type: "CHANGE_TOOL",
        payload:{
          tool
        }
      })
  }

  const BoardMouseDownHandler=(event)=>{
      const {clientX,clientY}=event;

      dispatchBoardActions({
        type:"DROP_DOWN",
        payload:{
          clientX,
          clientY
        }
      })
  }

  const BoardContextValue={
      active_tool: BoardState.activetool,
      elements: BoardState.elements,
      handleActiveTool: setActiveTool,
      BoardMouseDownHandler: BoardMouseDownHandler
  };

  return (
        <BoardContext.Provider value={BoardContextValue}> 
            {children}
        </BoardContext.Provider>
  )
}

export default BoardContextProvider;