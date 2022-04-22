import { Route, Routes } from "react-router-dom";
import { Footer } from "../Common/Footer";
import "./App.css"
import Nav from "../Common/Nav";
import Home from "../Page/Home";
import Articles from "../Page/Articles";
import Login from "../Page/Login";
import Logout from "../Page/Logout";
import Signup from "../Page/Signup";
import PageNotFound from "../Page/404";
import Notice from "../Components/Articles/Notice";
import TestBug from "../Components/Articles/TestBug";
import Profile from "../Page/Profile";
import NoticeDetail from "../Page/NoticeDetail";

function App() {
  return (
    <div className="App">
      <Nav/>
      <div style={{minHeight: "calc(100vh - 186px)"}}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="articles" element={<Articles />}>
            <Route index element={<Notice />}></Route>
            <Route path="notice" element={<Notice />}>
              <Route path=":noticeId" element={<NoticeDetail/>}></Route>
            </Route>
            <Route path="testbug" element={<TestBug />}></Route>
          </Route>
          <Route path="profile" element={<Profile />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="logout" element={<Logout />}></Route>
          <Route path="signup" element={<Signup />}></Route>
          <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
