import { FaSlash, FaRegCircle, FaLongArrowAltRight, FaPaintBrush, FaEraser } from 'react-icons/fa';
import { LuRectangleHorizontal } from 'react-icons/lu';
import { MdOutlineFormatColorText } from "react-icons/md";

const toolItems = [
    { item: 'Pencil', element: FaPaintBrush },
    { item: 'Line', element: FaSlash },
    { item: 'Rectangle', element: LuRectangleHorizontal },
    { item: 'Circle', element: FaRegCircle },
    { item: 'Arrow', element: FaLongArrowAltRight },
    { item: 'Eraser', element: FaEraser },
    { item: 'Text', element: MdOutlineFormatColorText }
];

export default toolItems;

export const STROKE_ACTIONS = ["Line", "Rectangle", "Circle", "Arrow", "Pencil", "Text"];

export const FILL_COLOR = ["Rectangle", "Circle"];

export const boardActions = {
    MOUSE_DOWN: "MOUSE_DOWN",
    MOUSE_UP: "MOUSE_UP",
    CHANGE_TOOL: "CHANGE_TOOL"
};

export const COLORS = {
    BLACK: "#000000",
    RED: "#ff0000",
    GREEN: "#00ff00",
    BLUE: "#0000ff",
    ORANGE: "#ffa500",
    YELLOW: "#ffff00"
};

export const SIZE_TOOL = ["Line", "Rectangle", "Circle", "Arrow", "Text", "Pencil", "Eraser"];

export const TOOL_BOX = ["Line", "Rectangle", "Circle", "Arrow", "Pencil", "Text", "Eraser"];

