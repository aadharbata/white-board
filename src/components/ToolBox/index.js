import React, { useContext } from "react";
import cx from "classnames";
import classes from "./index.module.css";
import { COLORS, TOOL_BOX } from "../../constant";
import BoardContext from "../../store/board-context";
import ToolBoxContext from "../../store/toolbox-context";
import { STROKE_ACTIONS } from "../../constant";
import { FILL_COLOR } from "../../constant";
import { SIZE_TOOL } from "../../constant";

const Toolbox = () => {
  const { active_tool } = useContext(BoardContext);
  const { ToolBoxState, ColorStrokeTool ,ColorFillTool,ChangeSizeTool} = useContext(ToolBoxContext);

  const strokeColor = ToolBoxState[active_tool]?.stroke;
  const FillColor=ToolBoxState[active_tool]?.fill;
  const size=ToolBoxState[active_tool]?.size;

  return (
    TOOL_BOX.includes(active_tool)&&
     <div className={classes.container}>
      {STROKE_ACTIONS.includes(active_tool) &&<div className={classes.selectOptionContainer}>
        
        <div className={classes.toolBoxLabel}>Stroke Color</div>
        <div className={classes.colorsContainer}>
          {Object.keys(COLORS).map((k) => {
            return (
              <div
                key={k}
                className={cx(classes.colorBox, {
                  [classes.activeColorBox]: strokeColor === COLORS[k]
                })}
                style={{ backgroundColor: COLORS[k] }}
                onClick={() => ColorStrokeTool(active_tool, COLORS[k])}
              ></div>
            );
          })}
        </div>
      </div>
      }
      {FILL_COLOR.includes(active_tool) &&<div className={classes.selectOptionContainer}>
        
        <div className={classes.toolBoxLabel}>FILL Color</div>
        <div className={classes.colorsContainer}>
          {Object.keys(COLORS).map((k) => {
            return (
              <div
                key={k}
                className={cx(classes.colorBox, {
                  [classes.activeColorBox]: FillColor === COLORS[k]
                })}
                style={{ backgroundColor: COLORS[k] }}
                onClick={() => ColorFillTool(active_tool, COLORS[k])}
              ></div>
            );
          })}
        </div>
      </div>
      }
      {SIZE_TOOL.includes(active_tool) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>{active_tool==="Text"?"Font Size":"Brush Size"}</div>
          <input
            type="range"
            min={active_tool === "Text" ? 12 : 1}
            max={active_tool === "Text" ? 64 : 10}
            step={1}
            value={size}
            onChange={(event)=>ChangeSizeTool(active_tool,event.target.value)}
          ></input>
        </div>
      )}
    </div>
    );
};

export default Toolbox;
