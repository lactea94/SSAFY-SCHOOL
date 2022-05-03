import { Route, Routes } from "react-router-dom";
import { Footer } from "../Common/Footer";
import Nav from "../Components/Common/Nav";
import Home from "../Page/Home";
import Articles from "../Page/Articles";
import Notice from "../Components/Articles/Notice";
import NoticeDetail from "../Components/Articles/NoticeDetail";
import Community from "../Components/Articles/Community";
import CommunityDetail from "../Components/Articles/CommunityDetail";
import TestBug from "../Components/Articles/TestBug";
import Profile from "../Page/Profile";
import ProfileInfo from "../Components/Profile/ProfileInfo";
import EditProfile from "../Components/Profile/EditProfile";
import EditPassword from "../Components/Profile/EditPassword";
import Admin from "../Page/Admin";
import { Users } from "../Components/Admin/Users";
import { Notice as AdminNotice } from "../Components/Admin/Notice";
import { Community as AdminCommunity } from "../Components/Admin/Community";
import { TestBug as AdminTestBug } from "../Components/Admin/TestBug";
import EditUser from "../Components/Admin/EditUser";
import EditNotice from "../Components/Admin/EditNotice";
import EditCommunity from "../Components/Admin/EditCommunity";
import Login from "../Page/Login";
import Logout from "../Page/Logout";
import Signup from "../Page/Signup";
import PageNotFound from "../Page/404";
import "./App.css";

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
            <Route path="edit/password" element={<EditPassword/>} />
          </Route>
          <Route path="admin" element={<Admin />}>
            <Route index element={<Users />} />
            <Route path="users" element={<Users />}>
              <Route path=":userId" element={<EditUser/>} />
            </Route>
            <Route path="notice" element={<AdminNotice />}>
              <Route path=":noticeId" element={<EditNotice/>} />
            </Route>
            <Route path="community" element={<AdminCommunity />}>
              <Route path=":communityId" element={<EditCommunity/>} />
            </Route>
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
