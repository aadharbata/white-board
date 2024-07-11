import React, { useReducer } from 'react';
import BoardContext from './board-context';
import { CreateElement } from '../utils/CreateElement';

const initialBoardstate = {
  activetool: 'Line',
  toolState: 'NONE',
  elements: [],
};

const BoardReducers = (state, action) => {
  switch (action.type) {
    case 'CHANGE_TOOL': {
      return {
        ...state,
        activetool: action.payload.tool,
      };
    }
    case 'DROP_DOWN': {
      const { clientX, clientY, toolbox } = action.payload;
      console.log(toolbox);
      const type = {
        type: state.activetool,
        stroke: toolbox[state.activetool]?.stroke,
        fill : toolbox[state.activetool]?.fill,
        size: toolbox[state.activetool]?.size
      };
      const newElement = CreateElement(
        state.elements.length,
        clientX,
        clientY,
        clientX,
        clientY,
        type
      );
      return {
        ...state,
        toolState: 'DRAWING',
        elements: [...state.elements, newElement],
      };
    }
    case 'MOUSE_MOVE': {
      const { clientX, clientY, toolbox } = action.payload;
      console.log(toolbox);
      const newElements = [...state.elements];
      const index = state.elements.length - 1;
      const { x1, y1 } = newElements[index];
      const newElement = CreateElement(index, x1, y1, clientX, clientY, {
        type: state.activetool,
        stroke: toolbox[state.activetool]?.stroke,
        fill: toolbox[state.activetool]?.fill,
        size: toolbox[state.activetool]?.size
      });
      newElements[index] = newElement;
      return {
        ...state,
        elements: newElements,
      };
    }
    case 'MOUSE_UP': {
      return {
        ...state,
        toolState: 'NONE',
      };
    }
    default:
      return state;
  }
};

const BoardContextProvider = ({ children }) => {
  const [BoardState, dispatchBoardActions] = useReducer(BoardReducers, initialBoardstate);

  const setActiveTool = (tool) => {
    dispatchBoardActions({
      type: 'CHANGE_TOOL',
      payload: { tool },
    });
  };

  const BoardMouseDownHandler = (event, toolbox) => {
    const { clientX, clientY } = event;

    dispatchBoardActions({
      type: 'DROP_DOWN',
      payload: { clientX, clientY, toolbox },
    });
  };

  const BoardMouseMoveHandler = (event, toolbox) => {
    const { clientX, clientY } = event;
    console.log(toolbox);
    dispatchBoardActions({
      type: 'MOUSE_MOVE',
      payload: { clientX, clientY, toolbox },
    });
  };

  const BoardMouseUpHandler = () => {
    dispatchBoardActions({
      type: 'MOUSE_UP',
    });
  };

  const BoardContextValue = {
    active_tool: BoardState.activetool,
    toolState: BoardState.toolState,
    elements: BoardState.elements,
    handleActiveTool: setActiveTool,
    BoardMouseDownHandler: BoardMouseDownHandler,
    BoardMouseMoveHandler: BoardMouseMoveHandler,
    BoardMouseUpHandler: BoardMouseUpHandler,
  };

  return (
    <BoardContext.Provider value={BoardContextValue}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardContextProvider;
