import { NavLink, Outlet } from "react-router-dom";

export default function Articles() {
  const NavStyle = {

  }

  const NavLinkStyle = {
    margin: "1rem",
    backgroundColor: "black",
    fontSize: "1rem",
  }

  return (
    <div style={{textAlign: "center"}}>
      <h1>게시판</h1>
      <nav style={NavStyle}>
        <NavLink style={NavLinkStyle} to="notice">공지 사항</NavLink>
        <NavLink style={NavLinkStyle} to="testbug">오류 제보</NavLink>
      </nav>
      <Outlet />
    </div>
  )
};