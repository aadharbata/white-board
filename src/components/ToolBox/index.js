import React, { useContext } from "react";
import cx from "classnames";
import classes from "./index.module.css";
import { COLORS, TOOL_BOX, STROKE_ACTIONS, FILL_COLOR, SIZE_TOOL } from "../../constant";
import BoardContext from "../../store/board-context";
import ToolBoxContext from "../../store/toolbox-context";

const Toolbox = () => {
  const { active_tool } = useContext(BoardContext);
  const { ToolBoxState, ColorStrokeTool, ColorFillTool, ChangeSizeTool } = useContext(ToolBoxContext);

  const strokeColor = ToolBoxState[active_tool]?.stroke;
  const FillColor = ToolBoxState[active_tool]?.fill;
  const size = ToolBoxState[active_tool]?.size;

  return (
    TOOL_BOX.includes(active_tool) && (
      <div className={classes.container}>
        {STROKE_ACTIONS.includes(active_tool) && (
          <div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>Stroke Color</div>
            <div className={classes.colorsContainer}>
              <div>
                <input
                  className={classes.colorPicker}
                  type="color"
                  value={strokeColor}
                  onChange={(e) => ColorStrokeTool(active_tool, e.target.value)}
                />
              </div>
              {Object.keys(COLORS).map((k) => (
                <div
                  key={k}
                  className={cx(classes.colorBox, {
                    [classes.activeColorBox]: strokeColor === COLORS[k]
                  })}
                  style={{ backgroundColor: COLORS[k] }}
                  onClick={() => ColorStrokeTool(active_tool, COLORS[k])}
                />
              ))}
            </div>
          </div>
        )}
        {FILL_COLOR.includes(active_tool) && (
        <div className={classes.selectOptionContainer}>
          <div className={classes.toolBoxLabel}>Fill Color</div>
          <div className={classes.colorsContainer}>
            {FillColor === null ? (
              <div
                className={cx(classes.colorPicker, classes.noFillColorBox)}
                onClick={() => ColorFillTool(active_tool, COLORS.BLACK)}
              ></div>
            ) : (
              <div>
                <input
                  className={classes.colorPicker}
                  type="color"
                  value={strokeColor}
                  onChange={(e) => ColorFillTool(active_tool, e.target.value)}
                ></input>
              </div>
            )}
            <div
              className={cx(classes.colorBox, classes.noFillColorBox, {
                [classes.activeColorBox]: FillColor === null,
              })}
              onClick={() => ColorFillTool(active_tool, null)}
            ></div>
            {Object.keys(COLORS).map((k) => {
              return (
                <div
                  key={k}
                  className={cx(classes.colorBox, {
                    [classes.activeColorBox]: FillColor === COLORS[k],
                  })}
                  style={{ backgroundColor: COLORS[k] }}
                  onClick={() =>ColorFillTool(active_tool, COLORS[k])}
                ></div>
              );
            })}
          </div>
        </div>
      )}
        {SIZE_TOOL.includes(active_tool) && (
          <div className={classes.selectOptionContainer}>
            <div className={classes.toolBoxLabel}>
              {active_tool === "Text" ? "Font Size" : active_tool==="Eraser"? "Eraser Size": "Brush Size"}
            </div>
            <input
              type="range"
              min={
                active_tool === "Pencil"
                  ? 10
                  : active_tool === "Text"
                  ? 12
                  : active_tool==="Eraser"
                  ? 10
                  : 1
              }
              max={
                active_tool === "Pencil"
                  ? 100
                  : active_tool === "Text"
                  ? 64
                  : active_tool==="Eraser"
                  ? 150
                  : 10
              }
              step={1}
              value={size}
              onChange={(event) =>
                ChangeSizeTool(active_tool, event.target.value)
              }
            />
          </div>
        )}
      </div>
    )
  );
};

export default Toolbox;
