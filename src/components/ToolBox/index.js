import React, { useContext } from "react";
import cx from "classnames";
import classes from "./index.module.css";
import { COLORS } from "../../constant";
import BoardContext from "../../store/board-context";
import ToolBoxContext from "../../store/toolbox-context";

const Toolbox = () => {
  const { active_tool } = useContext(BoardContext);
  const { ToolBoxState, ColorChangeTool } = useContext(ToolBoxContext);

  const strokeColor = ToolBoxState[active_tool]?.stroke;
    console.log(strokeColor);
  return (
    <div className={classes.container}>
      <div className={classes.selectOptionContainer}>
        <div className={classes.toolBoxLabel}>Stroke</div>
        <div className={classes.colorsContainer}>
          {Object.keys(COLORS).map((k) => {
            return (
              <div
                key={k}
                className={cx(classes.colorBox, {
                  [classes.activeColorBox]: strokeColor === COLORS[k]
                })}
                style={{ backgroundColor: COLORS[k] }}
                onClick={() => ColorChangeTool(active_tool, COLORS[k])}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Toolbox;
