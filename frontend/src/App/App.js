import { Route, Routes } from "react-router-dom";
import Nav from "../Common/Nav"
import Home from "../Page/Home";
import PageNotFound from "../Page/404";

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articles" element={<Home />}></Route>
        <Route path="/profile" element={<Home />}></Route>
        <Route path="/login" element={<Home />}></Route>
        <Route path="/logout" element={<Home />}></Route>
        <Route path="/signup" element={<Home />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
