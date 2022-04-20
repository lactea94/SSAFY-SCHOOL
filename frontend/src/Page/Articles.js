import { NavLink, Outlet } from "react-router-dom";

export default function Articles() {
  const NavStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    margin: "3rem auto 2rem",
    width: "50%",
  };

  const NavLinkStyle = ({ isActive }) => ({
    margin: "1rem",
    padding: "0.5rem",
    border: isActive ? "none" : "1px solid #3396F4",
    borderRadius: "0.3rem",
    backgroundColor: isActive ? "#3396F4" : "white",
    fontSize: "1rem",
    textDecoration: "none",
    color: isActive ? "white" : "#3396F4",
  });

  return (
    <div style={{textAlign: "center"}}>
      <nav style={NavStyle}>
        <div
          style={{
            display: "flex",
            fontSize: "2.5rem",
            alignItems: "center",
          }}
        >
          게시판
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <NavLink style={NavLinkStyle} to="notice">공지 사항</NavLink>
          <NavLink style={NavLinkStyle} to="testbug">오류 제보</NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  )
};