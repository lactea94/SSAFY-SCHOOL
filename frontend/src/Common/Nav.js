import { Link } from "react-router-dom";

function Nav() {
  return (
    <div>
      <div style={{position: "fixed", height:"50px", width: "100%", minWidth: "740px", backgroundColor: "white", display: "flex", justifyContent: "space-between", borderTop: "0px", borderLeft: "0px", borderRight: "0px", borderBottom: "1px", borderStyle: "solid"}}>
        <div style={{display: "inline-block",height:"100%"}}>
          <Link to="/">
            <img src="/image/logo.png" style={{height:"100%"}} alt="logo"></img>
          </Link>
        </div>
        <div style={{display: "flex", height:"100%", fontSize: "20px", alignItems: "center"}}>
          <Link to="articles/notice" style={{textDecoration: "none", color: "black", fontWeight: "bold", margin: "0 1rem"}}>
            게시판
          </Link>
          <Link to="profile" style={{textDecoration: "none", color: "black", fontWeight: "bold", margin: "0 1rem"}}>
            마이페이지
          </Link>
          <Link to="logout" style={{textDecoration: "none", color: "black", fontWeight: "bold", margin: "0 1rem"}}>
            로그아웃
          </Link>
          <Link to="login" style={{textDecoration: "none", color: "black", fontWeight: "bold", margin: "0 1rem"}}>
            로그인
          </Link>
        </div>
      </div>
      <div style={{height: "50px"}}></div>
    </div>
  )
}

export default Nav;
