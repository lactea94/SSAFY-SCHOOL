import { Route, Routes } from "react-router-dom";
import Nav from "../Common/Nav"
import { Home } from "../Components/Home/Home";

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </div>
  );
}

export default App;
