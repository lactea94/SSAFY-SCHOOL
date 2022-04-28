import "./css/Admin.css";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Admin() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!localStorage.getItem('accesstoken') | !localStorage.getItem('admin')) {
    navigate('/');
  }

  const NavLinkStyle = ({ isActive }) => ({
    borderTop: isActive ? "1px solid gray" : "none",
    borderLeft: isActive ? "1px solid gray" : "none",
    borderRight: isActive ? "1px solid gray" : "none",
    borderBottom: isActive ? "none" : "1px solid gray",
    color: isActive && "black",
  });

  return (
    <div className="admin">
      <nav className="admin-nav">
        <div className="admin-nav-title">관리</div>
        <NavLink className="admin-nav-link" style={NavLinkStyle} to="users">사용자</NavLink>
        <NavLink className="admin-nav-link" style={NavLinkStyle} to="notice">공지사항</NavLink>
        <NavLink className="admin-nav-link" style={NavLinkStyle} to="community">자유 게시판</NavLink>
        <NavLink className="admin-nav-link" style={NavLinkStyle} to="testbug">오류 제보</NavLink>
      </nav>
      <Outlet />
    </div>
  )
}
