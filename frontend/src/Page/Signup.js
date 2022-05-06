import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "../api";
import { AiFillCheckCircle } from "react-icons/ai";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import './css/Signup.css'
import { duplicateId, duplicateNickname, duplicateEmail } from "../api/UserAPI";
import Toast from "../Utils/Toast";

export default function Signup() {
  const [ signupInfo, setSignupInfo ] = useState({
    admin: 2,
    email: "",
    gender: true,
    id: "",
    name: "",
    nickname: "",
    password: ""
  });
  const [ passwordConfirm, setPasswordConfirm ] = useState("");
  const [ checkId, setCheckId ] = useState(false);
  const [ checkNickname, setCheckNickname ] = useState(false);
  const [ checkEmail, setCheckEmail ] = useState(false);
  const [ checkPassword, setCheckPassword ] = useState(false);
  const userAPI = apiInstance();
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);

  // 비밀번호 확인
  useEffect(() => {
    if (signupInfo.password === passwordConfirm) {
      setCheckPassword(true)
    } else {
      setCheckPassword(false)
    }
  }, [signupInfo, passwordConfirm])

  // 유효성 검사
  function validation() {
    if ( checkId && checkPassword && checkEmail && checkNickname ) return true
    return false
  };

  // Input 변경
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

  // 회원 가입
  async function signupSubmit(e) {
    e.preventDefault();
    if (validation()) {
      try {
        await userAPI.post('/users/signup', signupInfo);
        await MySwal.fire({
          icon: "success",
          title: "회원가입 성공!",
        })
        await new Promise(() => {navigate('/')})
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "오류가 발생하였습니다.",
        });
      }
    } else {
      MySwal.fire({
        icon: "warning",
        title: "Oops...",
        text: 
          `${[
              !checkId && "아이디",
              !checkPassword && "비밀번호",
              !checkNickname && "닉네임",
              !checkEmail && "이메일"
            ].filter(text => text.length > 0).join(', ')}을(를) 확인하세요`,
      });
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
              onClick={() => {
                duplicateId(
                  signupInfo.id,
                  Toast,
                  setCheckId
              )}}
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
            onChange={(e) => {
              setPasswordConfirm(e.target.value)
            }}
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
              onClick={() => {
                duplicateNickname(
                  signupInfo.nickname,
                  Toast,
                  setCheckNickname
              )}}
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
              onClick={() => {
                duplicateEmail(
                  signupInfo.email,
                  Toast,
                  setCheckEmail
              )}}
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