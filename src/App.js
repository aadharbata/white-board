import Board from "./components/Board/Index";
import Toolbar from "./components/Toolbar";
import BoardContextProvider from "./store/BoardContextProvider";

function App() {

  return (
    <div className="App">
      <BoardContextProvider>
          <Toolbar/>
          <Board/>  
      </BoardContextProvider>
    </div>
  );
}

export default App;

