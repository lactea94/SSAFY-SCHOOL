import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    signupId: "", 
    signupPassword: "",
    signupPassword2: "",
    signupNickname: "",
    signupName: "",
    signupGender: true,
    signupEmail: "",
  });

  function signupInput({target: {id, value}}) {
    if(id === "signupGender") {
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
  }

  function signupSubmit(e) {
    e.preventDefault();
    console.log(signupInfo)
    // 회원가입 로직 추가 예정
  }

  return (
    <div style={{display: "flex", flexDirection: "column", alignItems: 'center', minHeight: "calc(100vh - 50px - 100px)"}}>
      <h1>
        Sign Up
      </h1>
      <form style={{display: "flex", flexDirection: "column", alignItems: "center", margin: "1rem"}}
        method="post"
        onSubmit={signupSubmit}
      >
        <label htmlFor="signupId" style={{marginRight: "auto"}}>아이디</label>
        <input type="text" id="signupId" style={{width: "500px", height: "30px", fontSize: "20px"}} required 
          value={signupInfo.signupId}
          onChange={signupInput}
        /> <br/>
        <label htmlFor="signupPassword" style={{marginRight: "auto"}}>비밀번호</label>
        <input type="password" id="signupPassword" style={{width: "500px", height: "30px", fontSize: "20px"}} required 
          value={signupInfo.signupPassword}
          onChange={signupInput}
        /> <br/>
        <label htmlFor="signupPassword2" style={{marginRight: "auto"}}>비밀번호확인</label>
        <input type="password" id="signupPassword2" style={{width: "500px", height: "30px", fontSize: "20px"}} required 
          value={signupInfo.signupPassword2}
          onChange={signupInput}
        /> <br/>
        <label htmlFor="signupNickname" style={{marginRight: "auto"}}>닉네임</label>
        <input type="text" id="signupNickname" style={{width: "500px", height: "30px", fontSize: "20px"}} required 
          value={signupInfo.signupNickname}
          onChange={signupInput}
        /> <br/>
        <label htmlFor="signupName" style={{marginRight: "auto"}}>이름</label>
        <input type="text" id="signupName" style={{width: "500px", height: "30px", fontSize: "20px"}} required 
          value={signupInfo.signupName}
          onChange={signupInput}
        /> <br/>
        <p style={{margin: "auto auto 0 0"}}>성별</p>
        <div style={{display: "flex", alignItems: "center", margin: "auto auto auto auto"}}>
          <label htmlFor="male">남</label>
          <input type="radio" id="signupGender" style={{width: "50px", height: "30px", fontSize: "20px"}} required 
            value={true}
            onChange={signupInput}
            checked={signupInfo.signupGender}
          />
          <label htmlFor="female">여</label>
          <input type="radio" id="signupGender" style={{width: "50px", height: "30px", fontSize: "20px"}} required 
            value={false}
            onChange={signupInput}
            checked={!signupInfo.signupGender}
          />
        </div>
        <label htmlFor="signupEmail" style={{marginRight: "auto"}}>이메일</label>
        <input type="email" id="signupEmail" style={{width: "500px", height: "30px", fontSize: "20px"}} required 
          value={signupInfo.signupEmail}
          onChange={signupInput}
        /> <br/>
        <button style={{width: "500px", height: "40px", fontSize: "20px", borderRadius: "10px", border: "0px", fontWeight: "bolder", backgroundColor: "dodgerblue", cursor: "pointer"}}>회원가입</button>
      </form>
    </div>
  )
}