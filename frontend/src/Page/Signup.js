import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInstance } from "../api";
import { AiFillCheckCircle } from "react-icons/ai";
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
  const [ checkId, setCheckId ] = useState(false);
  const [ checkNickname, setCheckNickname ] = useState(false);
  const [ checkEmail, setCheckEmail ] = useState(false);
  const userAPI = userInstance();
  const navigate = useNavigate();

  async function duplicateId() {
    if (!signupInfo.id) {
      alert("아이디를 입력하세요.");
      return
    };
    try {
      await userAPI.post('users/duplicate-check-id', { id: signupInfo.id});
      setCheckId(true);
    } catch (error) {
      if (error.response.status === 409) {
        alert("이미 존재하는 아이디 입니다.");
      }
    };
  };
  
  async function duplicateNickname() {
    if (!signupInfo.nickname) {
      alert("닉네임을 입력하세요.");
      return
    };
    try {
      await userAPI.post('users/duplicate-check-nickname', { nickname: signupInfo.nickname});
      setCheckNickname(true);
    } catch (error) {
      if (error.response.status === 409) {
        alert("이미 존재하는 닉네임 입니다.");
      }
    };
  };

  async function duplicateEmail() {
    if (!signupInfo.email) {
      alert("이메일을 입력하세요.");
      return
    };
    try {
      await userAPI.post('users/duplicate-check-email', { email: signupInfo.email});
      setCheckEmail(true);
    } catch (error) {
      if (error.response.status === 409) {
        alert("이미 존재하는 이메일 입니다.");
      }
    };
  };

  function validation() {
    if ( signupInfo.password === passwordConfirm && checkId && checkEmail && checkNickname ) return true
    return false
  };

  function signupInput({target: {id, value}}) {
    if (id === "id") {
      setCheckId(false);
    } else if (id === "nickname"){
      setCheckNickname(false);
    } else if (id === "email"){
      setCheckEmail(false);
    } else if(id === "gender") {
      if (value === "false") {
        value = false;
      } else {
        value = true;
      }
    }
    const newLoginInfo = {
      ...signupInfo,
      [id]: value,
    };
    setSignupInfo(newLoginInfo);
  };

  async function signupSubmit(e) {
    e.preventDefault();
    if (validation()) {
      try {
        await userAPI.post('/users/signup', signupInfo);
        navigate('/');
        navigate(0);
      } catch (error) {
        console.log(error);
      }
    } else {
      if (!checkId) {
        alert("아이디 중복확인 하세요.")
      }
      if (signupInfo.password !== passwordConfirm) {
        alert("비밀번호를 확인 하세요.")
      }
      if (!checkNickname) {
        alert("닉네임 중복확인 하세요.")
      }
      if (!checkEmail) {
        alert("이메일 중복확인 하세요.")
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
          {checkId ? (
            <div
              className="signup-check-confirm"
            >
              <AiFillCheckCircle/>
            </div>
          ) : (
            <div
              className="signup-check"
              onClick={duplicateId}
            >
              중복확인
            </div>
          )}
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
          {checkNickname ? (
            <div
              className="signup-check-confirm"
            >
              <AiFillCheckCircle/>
            </div>
          ) : (
            <div
              className="signup-check"
              onClick={duplicateNickname}
            >
              중복확인
            </div>
          )}
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
          {checkEmail ? (
            <div
              className="signup-check-confirm"
            >
              <AiFillCheckCircle/>
            </div>
          ) : (
            <div
              className="signup-check"
              onClick={duplicateEmail}
            >
              중복확인
            </div>
          )}
        </div>
        <button className="signup-button">
          회원가입
        </button>
      </form>
    </div>
  )
}