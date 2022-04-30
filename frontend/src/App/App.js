import { Route, Routes } from "react-router-dom";
import { Footer } from "../Common/Footer";
import "./App.css"
import Nav from "../Common/Nav";
import Home from "../Page/Home";
import Articles from "../Page/Articles";
import Notice from "../Components/Articles/Notice";
import NoticeDetail from "../Components/Articles/NoticeDetail";
import Community from "../Components/Articles/Community";
import CommunityDetail from "../Components/Articles/CommunityDetail";
import TestBug from "../Components/Articles/TestBug";
import Profile from "../Page/Profile";
import Admin from "../Page/Admin";
import Login from "../Page/Login";
import Logout from "../Page/Logout";
import Signup from "../Page/Signup";
import PageNotFound from "../Page/404";
import { Users } from "../Components/Admin/Users";
import { Notice as AdminNotice } from "../Components/Admin/Notice";
import { Community as AdminCommunity } from "../Components/Admin/Community";
import { TestBug as AdminTestBug } from "../Components/Admin/TestBug";
import EditUser from "../Components/Admin/EditUser";
import ProfileInfo from "../Components/Profile/ProfileInfo";
import EditProfile from "../Components/Profile/EditProfile";

function App() {
  return (
    <div className="App">
      <Nav/>
      <div style={{paddingBottom: "8rem"}}>
        <Routes >
          <Route path="/" element={<Home />} />
          <Route path="articles" element={<Articles />}>
            <Route path="notice" element={<Notice />}>
              <Route path=":noticeId" element={<NoticeDetail/>} />
            </Route>
            <Route path="community" element={<Community />}>
              <Route path=":communityId" element={<CommunityDetail/>} />
            </Route>
            <Route path="testbug" element={<TestBug />} />
          </Route>
          <Route path="profile" element={<Profile />}>
            <Route index element={<ProfileInfo/>} />
            <Route path="" element={<ProfileInfo/>} />
            <Route path="edit" element={<EditProfile/>} />
          </Route>
          <Route path="admin" element={<Admin />}>
            <Route path="users" element={<Users />}>
              <Route path=":userId" element={<EditUser/>} />
            </Route>
            <Route path="notice" element={<AdminNotice />} />
            <Route path="community" element={<AdminCommunity />} />
            <Route path="testbug" element={<AdminTestBug />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
