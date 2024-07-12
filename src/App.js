import { useState } from "react";
import Board from "./components/Board/Index";
import Toolbar from "./components/Toolbar";
import ToolBox from "./components/ToolBox";
import BoardContextProvider from "./store/BoardContextProvider";
import ToolBoxContextProvider from "./store/ToolBoxContextProvider";

function App() {
  const [havetoDownload,sethavetoDownload]=useState(false);

  function download(){
    sethavetoDownload(true);
  }
  function stop(){
    sethavetoDownload(false);
  }
  return (
    <div className="App">
      <BoardContextProvider>
      <ToolBoxContextProvider>
            <Toolbar download={download}/>
            <Board download={havetoDownload} set={stop}/>  
            <ToolBox/>
        </ToolBoxContextProvider>
      </BoardContextProvider>
    </div>
  );
}

export default App;

