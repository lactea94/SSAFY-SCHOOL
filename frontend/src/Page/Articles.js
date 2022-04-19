import { NavLink, Outlet } from "react-router-dom";

export default function Articles() {
  return (
    <div>
      <h1>게시판</h1>
      <nav>
        <NavLink to="notice">공지사항</NavLink>
        <NavLink to="testbug">오류제보</NavLink>
      </nav>
      <Outlet />
    </div>
  )
};