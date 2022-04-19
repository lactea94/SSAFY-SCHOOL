import { Route, Routes } from "react-router-dom";
import { Footer } from "../Common/Footer";
import Nav from "../Common/Nav"
import Home from "../Page/Home";
import Articles from "../Page/Articles";
import Login from "../Page/Login";
import Logout from "../Page/Logout";
import Signup from "../Page/Signup";
import PageNotFound from "../Page/404";
import Notice from "../Components/Articles/Notice";
import TestBug from "../Components/Articles/TestBug";

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="articles" element={<Articles />}>
          <Route index element={<Notice />}></Route>
          <Route path="notice" element={<Notice />}></Route>
          <Route path="testbug" element={<TestBug />}></Route>
        </Route>
        <Route path="profile" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="logout" element={<Logout />}></Route>
        <Route path="signup" element={<Signup />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
