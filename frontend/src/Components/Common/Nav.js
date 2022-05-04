import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiInstance } from "../../api";

export default function Nav() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  // 슈퍼 0, 프로 1, 학생 2
  const [ isAdmin, setIsAdmin ] = useState(2);
  const [ user, setUser ] = useState();

  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
      setIsAuthenticated(true);
    }
  }, []);

  async function saveUser() {
    const res = await apiInstance().get('/users/me');
    setUser(res.data);
    if (res.data.admin !== 2) {
      localStorage.setItem('admin', true);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      saveUser();
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (user) {
      setIsAdmin(user.admin)
    }
  }, [user])

  const linkStyle = {
    textDecoration: "none",
    color: "black",
    fontWeight: "bold",
    margin: "0 1rem"
  }

  return (
    <div>
      <div style={{position: "fixed", height:"50px", width: "100%", minWidth: "740px", backgroundColor: "white", display: "flex", justifyContent: "space-between", borderTop: "0px", borderLeft: "0px", borderRight: "0px", borderBottom: "1px", borderStyle: "solid", zIndex: "2"}}>
        <div style={{display: "inline-block",height:"100%"}}>
          <Link to="/">
            <img src="/image/logo.png" style={{height:"100%"}} alt="logo"></img>
          </Link>
        </div>
        <div style={{display: "flex", height:"100%", fontSize: "20px", alignItems: "center"}}>
          {isAuthenticated ? (
            <>
              {isAdmin !== 2 ? 
                <Link to="admin/users"
                  style={linkStyle}
                >
                  관리
                </Link>
               : 
               <>
                <Link
                  to="articles/notice"
                  style={linkStyle}
                >
                  게시판
                </Link>
                <Link
                  to="profile"
                  style={linkStyle}
                  state={{
                    user: user
                  }}
                >
                  마이페이지
                </Link>
               </>
              }
              <Link to="logout" style={linkStyle}>
                로그아웃
              </Link>
            </>
          ) : (
            <>
              <Link
                to="articles/notice"
                style={linkStyle}
              >
                게시판
              </Link>
              <Link to="login" style={linkStyle}>
                로그인
              </Link>
            </>
          )}
        </div>
      </div>
      <div style={{height: "50px"}}></div>
    </div>
  )
};
