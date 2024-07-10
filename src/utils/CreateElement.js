
import rough from "roughjs/bin/rough";

const gen = rough.generator();

export const CreateElement = (id, x1, y1, x2, y2, { type }) => {
  const element = {
    id,
    x1,
    y1,
    x2,
    y2,
  };
  let options = {
    seed: id + 1, 
  };
  switch (type) {
    case "Line":
      element.roughElement = gen.line(x1, y1-71, x2, y2-71, options);
      return element;
    case "Rectangle":
      element.roughElement = gen.rectangle(x1, y1-71, x2 - x1, y2 - y1, options);
      return element;
    case "Circle":
        element.roughElement = gen.ellipse((x1+x2)/2,(y1+y2-142)/2, x2 - x1, y2 - y1, options);
        return element;
    default:
      throw new Error("Type not recognized");
  }
};