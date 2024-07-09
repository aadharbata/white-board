import { IoPencilSharp } from 'react-icons/io5';
import { FaSlash, FaRegCircle, FaLongArrowAltRight, FaDownload } from 'react-icons/fa';
import { LuRectangleHorizontal } from 'react-icons/lu';
import { MdOutlineFormatColorText } from 'react-icons/md';
import { FaEraser } from 'react-icons/fa6';
import { IoMdUndo, IoMdRedo } from 'react-icons/io';

const toolItems = [
    { item: 'Pencil', element: IoPencilSharp },
    { item: 'Line', element: FaSlash },
    { item: 'Rectangle', element: LuRectangleHorizontal },
    { item: 'Circle', element: FaRegCircle },
    { item: 'Arrow', element: FaLongArrowAltRight },
    { item: 'Text', element: MdOutlineFormatColorText },
    { item: 'Eraser', element: FaEraser },
    { item: 'Undo', element: IoMdUndo },
    { item: 'Redo', element: IoMdRedo },
    { item: 'Download', element: FaDownload }
  ];

export default toolItems;

export const boardActions={

     MOUSE_DOWN:"MOUSE_DOWN",
     MOUSE_UP: "MOUSE_UP",
     CHANGE_TOOL:"CHANGW_TOOL"
};