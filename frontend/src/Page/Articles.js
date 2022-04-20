import { NavLink, Outlet } from "react-router-dom";

export default function Articles() {
  const NavStyle = {
    margin: "3rem",
  }

  const NavLinkStyle = ({ isActive }) => ({
    margin: "1rem",
    padding: "0.5rem",
    border: isActive ? "none" : "1px solid #3396F4",
    borderRadius: "0.3rem",
    backgroundColor: isActive ? "#3396F4" : "white",
    fontSize: "1rem",
    textDecoration: "none",
    color: isActive ? "white" : "#3396F4",
  })

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