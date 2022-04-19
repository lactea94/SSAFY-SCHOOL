import { Route, Routes } from "react-router-dom";
import { Footer } from "../Common/Footer";
import Nav from "../Common/Nav"
import Home from "../Page/Home";
import Login from "../Page/Login";
import Signup from "../Page/Signup";
import PageNotFound from "../Page/404";

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/articles" element={<Home />}></Route>
        <Route path="/profile" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Home />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
