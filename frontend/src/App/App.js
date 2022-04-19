import { Route, Routes } from "react-router-dom";
import { Footer } from "../Common/Footer";
import Nav from "../Common/Nav"
import { Home } from "../Page/Home";

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
