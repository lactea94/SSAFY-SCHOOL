import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({loginId: "", loginPassword: ""});

  function loginInput({target: {id, value}}) {
    const newLoginInfo = {
      ...loginInfo,
      [id]: value,
    };
    setLoginInfo(newLoginInfo);
  }

  function loginSubmit(e) {
    e.preventDefault();
    console.log(loginInfo)
    // 로그인 로직 추가 예정
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
      <h1>
        Login
      </h1>
      <form style={{display: "flex", flexDirection: "column", alignItems: "center"}}
        method="post"
        onSubmit={loginSubmit}
      >
        <input type="text" id="loginId" placeholder="아이디" style={{width: "500px", height: "30px", fontSize: "20px"}} required 
          value={loginInfo.loginId}
          onChange={loginInput}
        /> <br/>
        <input type="password" id="loginPassword" placeholder="비밀번호" style={{width: "500px", height: "30px", fontSize: "20px"}} required 
          value={loginInfo.loginPassword}
          onChange={loginInput}
        /> <br/>
        <button style={{width: "500px", height: "40px", fontSize: "20px", borderRadius: "10px", border: "0px", fontWeight: "bolder", backgroundColor: "dodgerblue", cursor: "pointer"}}>로그인</button>
      </form>
      <div>
        <h3 style={{display: "inline-block", cursor: "not-allowed"}}>ID/PW 찾기</h3>
        <h3 style={{display: "inline-block", margin: "0 10px"}}> | </h3>
        <Link to="/signup">
          <h3 style={{display: "inline-block", cursor: "pointer", color: "black"}}>회원가입</h3>
        </Link>
      </div>
    </div>
  )
}