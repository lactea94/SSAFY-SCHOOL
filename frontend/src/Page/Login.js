import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userInstance } from "../api";

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({id: "", password: ""});
  const api = userInstance();
  const navigate = useNavigate();

  function loginInput({target: {id, value}}) {
    const newLoginInfo = {
      ...loginInfo,
      [id]: value,
    };
    setLoginInfo(newLoginInfo);
  }

  const loginSubmit = async () => {
    try {
      const res = await api.post('/auth/login', loginInfo)
      localStorage.setItem('accesstoken', res.data.accessToken)
      navigate('/');
      navigate(0);
    } catch (error) {
      console.log(error);
    }
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
        <input type="text" id="id" placeholder="아이디" style={{width: "500px", height: "30px", fontSize: "20px"}} required 
          value={loginInfo.id}
          onChange={loginInput}
        /> <br/>
        <input type="password" id="password" placeholder="비밀번호" style={{width: "500px", height: "30px", fontSize: "20px"}} required 
          value={loginInfo.password}
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