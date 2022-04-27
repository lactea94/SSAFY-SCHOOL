import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userInstance } from "../api";

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
  const api = userInstance();
  const navigate = useNavigate();

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
    if (passwordConfirm !== signupInfo.password) return
    await api.post('/users/signup', signupInfo);
    navigate('/');
    navigate(0);
  };

  const inputStyle = {
    width: "500px",
    height: "30px",
    fontSize: "20px"
  };
  
  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: 'center'}}>
      <h1>
        Sign Up
      </h1>
      <form style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "1rem"}}
        method="post"
        onSubmit={signupSubmit}
      >
        <label htmlFor="id" style={{marginRight: "auto"}}>아이디</label>
        <input type="text" id="id" style={inputStyle} required 
          value={signupInfo.id}
          onChange={signupInput}
        /> <br/>
        <label htmlFor="password" style={{marginRight: "auto"}}>비밀번호</label>
        <input type="password" id="password" style={inputStyle} required 
          value={signupInfo.password}
          onChange={signupInput}
        /> <br/>
        <label htmlFor="passwordConfirm" style={{marginRight: "auto"}}>비밀번호확인</label>
        <input type="password" id="passwordConfirm" style={inputStyle} required 
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
        /> <br/>
        <label htmlFor="nickname" style={{marginRight: "auto"}}>닉네임</label>
        <input type="text" id="nickname" style={inputStyle} required 
          value={signupInfo.nickname}
          onChange={signupInput}
        /> <br/>
        <label htmlFor="name" style={{marginRight: "auto"}}>이름</label>
        <input type="text" id="name" style={inputStyle} required 
          value={signupInfo.name}
          onChange={signupInput}
        /> <br/>
        <p style={{margin: "auto auto 0 0"}}>성별</p>
        <div style={{display: "flex", alignItems: "center", margin: "auto auto auto auto"}}>
          <label htmlFor="male">남</label>
          <input type="radio" id="gender" style={{width: "50px", height: "30px", fontSize: "20px"}} required 
            value={true}
            onChange={signupInput}
            checked={signupInfo.gender}
          />
          <label htmlFor="female">여</label>
          <input type="radio" id="gender" style={{width: "50px", height: "30px", fontSize: "20px"}} required 
            value={false}
            onChange={signupInput}
            checked={!signupInfo.gender}
          />
        </div>
        <label htmlFor="email" style={{marginRight: "auto"}}>이메일</label>
        <input type="email" id="email" style={{width: "500px", height: "30px", fontSize: "20px"}} required 
          value={signupInfo.email}
          onChange={signupInput}
        /> <br/>
        <button style={{width: "500px", height: "40px", fontSize: "20px", borderRadius: "10px", border: "0px", fontWeight: "bolder", backgroundColor: "dodgerblue", cursor: "pointer"}}>회원가입</button>
      </form>
    </div>
  )
}