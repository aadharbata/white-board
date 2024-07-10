import React, { useReducer } from 'react';
import BoardContext from './board-context';
import rough from 'roughjs/bin/rough';

const gen = rough.generator();

const initialBoardstate = {
  activetool: '',
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
      const { clientX, clientY } = action.payload;
      const newElement = {
        id: state.elements.length,
        x1: clientX,
        y1: clientY,
        x2: clientX,
        y2: clientY,
        roughElement: gen.line(clientX, clientY - 71, clientX, clientY - 71),
      };
      return {
        ...state,
        toolState: 'DRAWING',
        elements: [...state.elements, newElement],
      };
    }
    case 'MOUSE_MOVE': {
      const { clientX, clientY } = action.payload;
      const newElements = [...state.elements];
      const index = state.elements.length - 1;
      newElements[index].x2 = clientX;
      newElements[index].y2 = clientY;
      newElements[index].roughElement = gen.line(
        newElements[index].x1,
        newElements[index].y1 - 71,
        clientX,
        clientY - 71
      );
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

  const BoardMouseDownHandler = (event) => {
    const { clientX, clientY } = event;

    dispatchBoardActions({
      type: 'DROP_DOWN',
      payload: { clientX, clientY },
    });
  };

  const BoardMouseMoveHandler = (event) => {
    const { clientX, clientY } = event;

    dispatchBoardActions({
      type: 'MOUSE_MOVE',
      payload: { clientX, clientY },
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
