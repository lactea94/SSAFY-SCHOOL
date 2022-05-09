import "./css/Articles.css";
import { NavLink, Outlet } from "react-router-dom";

export default function Articles() {
  const NavLinkStyle = ({ isActive }) => ({
    borderTop: isActive ? "1px solid gray" : "none",
    borderLeft: isActive ? "1px solid gray" : "none",
    borderRight: isActive ? "1px solid gray" : "none",
    borderBottom: isActive ? "none" : "1px solid gray",
    color: isActive && "black",
  });

  return (
    <div className="article">
      <nav className="article-nav">
        <div className="nav-title">게시판</div>
        <NavLink
          className="article-nav-link"
          style={NavLinkStyle}
          to="notice"
        >
          공지 사항
        </NavLink>
        <NavLink
          className="article-nav-link"
          style={NavLinkStyle}
          to="community"
        >
          자유 게시판
        </NavLink>
        <NavLink
          className="article-nav-link"
          style={NavLinkStyle}
          to="testbug"
        >
          오류 제보
        </NavLink>
      </nav>
      <Outlet />
    </div>
  )
};