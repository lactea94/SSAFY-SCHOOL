import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiInstance } from "../api";
import Toast from "../Utils/Toast";
import './css/Login.css'

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({id: "", password: ""});
  const api = apiInstance();
  const navigate = useNavigate();

  function loginInput({target: {id, value}}) {
    const newLoginInfo = {
      ...loginInfo,
      [id]: value,
    };
    setLoginInfo(newLoginInfo);
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', loginInfo);
      localStorage.setItem('accesstoken', res.data.accessToken);
      navigate('/');
      navigate(0);
    } catch (error) {
      if (error.response.status === 401) {
        Toast.fire({
          icon: "error",
          title: "비밀번호 오류",
          text: "비밀번호가 올바르지 않습니다."
        })
      } else if (error.response.status === 500) {
        Toast.fire({
          icon: "question",
          title: "잘못된 ID",
          text: "입력한 아이디를 사용하는 계정을 찾을 수 없습니다."
        })
      }
    }
  };

  return (
    <div className="login-container">
      <h1>
        Login
      </h1>
      <form
        className="login-form"
        method="post"
        onSubmit={loginSubmit}
      >
        <input
          className="login-input"
          type="text"
          id="id"
          placeholder="아이디"
          value={loginInfo.id}
          onChange={loginInput}
          required 
        />
        <input
          className="login-input"
          type="password"
          id="password"
          placeholder="비밀번호"
          value={loginInfo.password}
          onChange={loginInput}
          required 
        /> <br/>
        <button className="login-button">로그인</button>
      </form>
      <div>
        <Link
          className="login-link"
          to="/signup"
        >
          회원가입
        </Link>
      </div>
    </div>
  )
};
