import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthGetObject from "../../../Hooks/useAuthGetObject";
import logo from "../../../asset/image/logo.png"
import "./css/Nav.css";

export default function Nav() {
  const [ isAuthenticated, setIsAuthenticated ] = useState(false);
  // 슈퍼 0, 프로 1, 학생 2
  const [ isAdmin, setIsAdmin ] = useState(2);

  useEffect(() => {
    if (localStorage.getItem('accesstoken')) {
      setIsAuthenticated(true);
    }
  }, []);

  // 유저 정보 호출
  const user = useAuthGetObject('/users/me');
  useEffect(() => {
    if (isAuthenticated && Object.keys(user).length) {
      setIsAdmin(user.admin)
      if (user.admin !== 2) {
        localStorage.setItem('admin', true);
      }
    }
  }, [isAuthenticated, user])

  return (
    <nav className="navigation">
      <Link to="/">
        <img
          className="logo-image"
          src={logo}
          alt="logo"
        />
      </Link>
      <div className="nav-link-container">
        {isAuthenticated ? (
          <>
            {isAdmin !== 2 ? 
              <Link
                className="nav-link"
                to="admin/users"
                state={{
                  isAdmin: isAdmin
                }}
              >
                관리
              </Link>
              : 
              <>
              <Link
                className="nav-link"
                to="articles/notice"
              >
                게시판
              </Link>
              <Link
                className="nav-link"
                to="profile"
                state={{
                  user: user
                }}
              >
                마이페이지
              </Link>
              </>
            }
            <Link
              className="nav-link"
              to="logout"
            >
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link
              className="nav-link"
              to="articles/notice"
            >
              게시판
            </Link>
            <Link
              className="nav-link"
              to="login">
              로그인
            </Link>
          </>
        )}
      </div>
    </nav>
  )
};
