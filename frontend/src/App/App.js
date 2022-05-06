import { Route, Routes } from "react-router-dom";
import Nav from "../Components/Common/Nav";
import Footer from "../Components/Common/Footer";
import Home from "../Page/Home";

// Articles
import Articles from "../Page/Articles";
import Notice from "../Components/Articles/Notice/Notice";
import NoticeDetail from "../Components/Articles/Notice/NoticeDetail";
import Community from "../Components/Articles/Community/Community";
import CommunityDetail from "../Components/Articles/Community/CommunityDetail";
import TestBug from "../Components/Articles/TestBug/TestBug";

// Profile
import Profile from "../Page/Profile";
import ProfileInfo from "../Components/Profile/ProfileInfo";
import EditProfile from "../Components/Profile/EditProfile";
import EditPassword from "../Components/Profile/EditPassword";

// Admin
import Admin from "../Page/Admin";
import { Users } from "../Components/Admin/Users/Users";
import EditUser from "../Components/Admin/Users/EditUser";
import { Notice as AdminNotice } from "../Components/Admin/Notice/Notice";
import EditNotice from "../Components/Admin/Notice/EditNotice";
import { Community as AdminCommunity } from "../Components/Admin/Community/Community";
import EditCommunity from "../Components/Admin/Community/EditCommunity";
import { TestBug as AdminTestBug } from "../Components/Admin/TestBug/TestBug";

import Login from "../Page/Login";
import Logout from "../Page/Logout";
import Signup from "../Page/Signup";
import SearchId from "../Page/SearchId";
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
          <Route path="searchid" element={<SearchId />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
