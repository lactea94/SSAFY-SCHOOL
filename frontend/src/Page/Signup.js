import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInstance } from "../api";
import { FaCheck } from 'react-icons/fa';
import './css/Signup.css'

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    id: "", 
    password: "",
    nickname: "",
    name: "",
    gender: true,
    email: "",
  });
  const [ passwordConfirm, setPasswordConfirm ] = useState("");
  const [ checkPasswordConfirm, setCheckPasswordConfirm ] = useState(false);
  const api = userInstance();
  const navigate = useNavigate();

  function validation() {
    if (signupInfo.password === passwordConfirm) setCheckPasswordConfirm(true)
    if (checkPasswordConfirm) return true
    return false
  }

  function signupInput({target: {id, value}}) {
    if(id === "gender") {
      if(value === "false") {
        value = false;
      }else {
        value = true;
      }
    }
    const newLoginInfo = {
      ...signupInfo,
      [id]: value,
    };
    setSignupInfo(newLoginInfo);
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    if (validation()) {
      try {
        await api.post('/users/signup', signupInfo);
        navigate('/');
        navigate(0);
      } catch (error) {
        console.log(error)
      }
    }
  };
  
  return (
    <div className="signup-container">
      <h1>
        Sign Up
      </h1>
      <form className="signup-form"
        method="post"
        onSubmit={signupSubmit}
      >
        <label className="signup-input-label" htmlFor="id">아이디</label>
        <div className="signup-row">
          <input className="signup-input" type="text" id="id" required 
            value={signupInfo.id}
            onChange={signupInput}
          />
          <div className="signup-check">
            <FaCheck />
          </div>
        </div>
        <label className="signup-input-label" htmlFor="password">비밀번호</label>
        <div className="signup-row">
          <input className="signup-input" type="password" id="password" required 
            value={signupInfo.password}
            onChange={signupInput}
          />
        </div>
        <label className="signup-input-label" htmlFor="passwordConfirm">비밀번호확인</label>
        <div className="signup-row">
          <input className="signup-input" type="password" id="passwordConfirm" required 
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>
        <label className="signup-input-label" htmlFor="nickname">닉네임</label>
        <div className="signup-row">
          <input className="signup-input" type="text" id="nickname" required 
            value={signupInfo.nickname}
            onChange={signupInput}
          />
          <div className="signup-check">
            <FaCheck />
          </div>
        </div>
        <label className="signup-input-label" htmlFor="name">이름</label>
        <div className="signup-row">
          <input className="signup-input" type="text" id="name" required 
            value={signupInfo.name}
            onChange={signupInput}
          />
        </div>
        <p style={{margin: "auto auto 0 0"}}>성별</p>
        <div style={{display: "flex", alignItems: "center", margin: "auto"}}>
          <label htmlFor="male">남</label>
          <input
            className="signup-radio"
            type="radio"
            id="gender"
            value={true}
            onChange={signupInput}
            checked={signupInfo.gender}
            required 
          />
          <label htmlFor="female">여</label>
          <input
            className="signup-radio"
            type="radio"
            id="gender"
            value={false}
            onChange={signupInput}
            checked={!signupInfo.gender}
            required 
          />
        </div>
        <label className="signup-input-label" htmlFor="email">이메일</label>
        <div className="signup-row">
          <input className="signup-input" type="email" id="email" required 
            value={signupInfo.email}
            onChange={signupInput}
          />
          <div className="signup-check">
            <FaCheck />
          </div>
        </div>
        <button className="signup-button">
          회원가입
        </button>
      </form>
    </div>
  )
}