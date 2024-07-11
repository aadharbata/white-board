import Board from "./components/Board/Index";
import Toolbar from "./components/Toolbar";
import ToolBox from "./components/ToolBox";
import BoardContextProvider from "./store/BoardContextProvider";
import ToolBoxContextProvider from "./store/ToolBoxContextProvider";

function App() {

  return (
    <div className="App">
       
      <BoardContextProvider>
      <ToolBoxContextProvider>
            <Toolbar/>
            <Board/>  
            <ToolBox/>
        </ToolBoxContextProvider>
      </BoardContextProvider>
    </div>
  );
}

export default App;

