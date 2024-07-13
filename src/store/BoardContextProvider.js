import React, { useCallback, useReducer } from 'react';
import BoardContext from './board-context';
import { getSvgPathFromStroke } from '../utils/CreateElement';
import getStroke from 'perfect-freehand';
import { CreateElement } from '../utils/CreateElement';

const initialBoardState = {
    activetool: 'Pencil',
    toolState: 'NONE',
    history:[[]],
    index:0,
    elements: [],
};

const BoardReducers = (state, action) => {
    switch (action.type) {
        case 'CHANGE_TOOL':
            return {
                ...state,
                activetool: action.payload.tool,
            };
        case 'DROP_DOWN': {
            const { clientX, clientY, toolbox } = action.payload;
            const toolSettings = toolbox[state.activetool] || {};
            const type = {
                type: state.activetool,
                stroke: toolSettings.stroke,
                fill: toolSettings.fill,
                size: toolSettings.size
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
                toolState: state.activetool==="Text"? 'WRITING' : "DRAWING",
                elements: [...state.elements, newElement],
            };
        }
        case 'MOUSE_MOVE': {
            const { clientX, clientY, toolbox } = action.payload;
            const newElements = [...state.elements];
            const index = state.elements.length - 1;
            const { x1, y1 } = newElements[index];
            
            if (state.activetool === "Pencil" ) {
                newElements[index].points = [
                    ...newElements[index].points,
                    { x: clientX, y: clientY }
                ];
                newElements[index].path = new Path2D(
                    getSvgPathFromStroke(getStroke(newElements[index].points,{size: toolbox["Pencil"].size}))
                );
            } 
            else if(state.activetool==="Eraser"){
              newElements[index].points = [
                ...newElements[index].points,
                { x: clientX, y: clientY }
            ];
            newElements[index].path = new Path2D(
                getSvgPathFromStroke(getStroke(newElements[index].points,{size: toolbox["Eraser"].size}))
            );
            } 
            else {
                const toolSettings = toolbox[state.activetool] || {};
                const newElement = CreateElement(index, x1, y1, clientX, clientY, {
                    type: state.activetool,
                    stroke: toolSettings.stroke,
                    fill: toolSettings.fill,
                    size: toolSettings.size
                });
                newElements[index] = newElement;
            }
            return {
                ...state,
                elements: newElements
            };
        }
        case 'MOUSE_UP':
            return {
                ...state,
                toolState: 'NONE',
            };
        case "CHANGE_TEXT": {
                const index = state.elements.length - 1;
                const newElements = [...state.elements];
                newElements[index].text = action.payload.text;
                const newElement=[...state.elements];
                const newHistory=state.history.slice(0,state.index+1);
                newHistory.push(newElement);
                return {
                  ...state,
                  toolState: "NONE",
                  elements: newElements,
                  history: newHistory,
                  index: state.index+1
                };
        }
        case "SAVE":{
            const newElements=[...state.elements];
            const newHistory=state.history.slice(0,state.index+1);
            newHistory.push(newElements);
            return {
                ...state,
                history: newHistory,
                index: state.index+1,
            }
        }
        case "Undo":{
            if(state.index===0) {
                return{
                    ...state
                }
            }
            return {
                ...state,
                elements: state.history[state.index-1],
                index: state.index-1
            }
        }
        case "Redo":{
            if(state.index>=state.history.length-1) {
                return {
                    ...state
                }
            }
            return{
                ...state,
                elements: state.history[state.index+1],
                index: state.index+1
            }
        }
        default:
            return state;
    }
};

const BoardContextProvider = ({ children }) => {
    const [BoardState, dispatchBoardActions] = useReducer(BoardReducers, initialBoardState);

    const setActiveTool = (tool) => {
        dispatchBoardActions({
            type: 'CHANGE_TOOL',
            payload: { tool },
        });
    };

    const BoardMouseDownHandler = (event, toolbox) => {
        if(BoardState.toolState==="WRITING") return;

        const { clientX, clientY } = event;

        dispatchBoardActions({
            type: 'DROP_DOWN',
            payload: { clientX, clientY, toolbox },
        });
    };

    const BoardMouseMoveHandler = (event, toolbox) => {
        if(BoardState.toolState==="WRITING") return;
        const { clientX, clientY } = event;
        dispatchBoardActions({
            type: 'MOUSE_MOVE',
            payload: { clientX, clientY, toolbox },
        });
    };

    const BoardMouseUpHandler = () => {
        if(BoardState.toolState==="WRITING") return;
        if(BoardState.toolState==="DRAWING"){
            dispatchBoardActions({
                type:"SAVE"
            })
        }
        dispatchBoardActions({
            type: 'MOUSE_UP',
        });
    };

    const textAreaBlurHandler = (text) => {
      dispatchBoardActions({
          type:"CHANGE_TEXT",
          payload: {
            text,
          },
        });
      };

    const UndoHandler=useCallback(()=>{
        dispatchBoardActions({
            type:"Undo"
        });
    },);
    const RedoHandler=useCallback(()=>{
        dispatchBoardActions({
            type:"Redo"
        });
    },[]);

    const BoardContextValue = {
        active_tool: BoardState.activetool,
        toolState: BoardState.toolState,
        elements: BoardState.elements,
        handleActiveTool: setActiveTool,
        BoardMouseDownHandler: BoardMouseDownHandler,
        BoardMouseMoveHandler: BoardMouseMoveHandler,
        BoardMouseUpHandler: BoardMouseUpHandler,
        textAreaBlurHandler: textAreaBlurHandler,
        Undo: UndoHandler,
        Redo: RedoHandler
    };

    return (
        <BoardContext.Provider value={BoardContextValue}>
            {children}
        </BoardContext.Provider>
    );
};

export default BoardContextProvider;