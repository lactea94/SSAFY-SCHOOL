import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiInstance, userInstance } from "../../api";
import { AiFillCheckCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import './css/EditProfile.css';

export default function EditProfile() {
  const { state } = useLocation();
  const [ user, setUser ] = useState({
    nickname: "",
    email: "",
  });
  const [ checkNickname, setCheckNickname ] = useState(false);
  const [ checkEmail, setCheckEmail ] = useState(false);
  const userAPI = userInstance();
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  });

  useEffect(() => {
    setUser({
      nickname: state.user.nickname,
      email: state.user.email,
    })
  }, [state])

  function handleChnage({target: id, value}) {
    const newUser = {
      ...user,
      [id]: value,
    };
    setUser(newUser);
  };

  // 이메일 체크 함수
  function checkEmailForm(str) {
    var email = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return email.test(str)
  };

  // 닉네임 중복 체크
  async function duplicateNickname() {
    if (!user.nickname) {
      Toast.fire({
        icon: "question",
        title: "닉네임을 입력하세요."
      });
      return
    };
    try {
      await userAPI.post('users/check/nickname', { nickname: user.nickname});
      setCheckNickname(true);
      Toast.fire({
        icon: "success",
        title: "사용 가능한 닉네임 입니다."
      });
    } catch (error) {
      if (error.response.status === 409) {
        Toast.fire({
          icon: "error",
          title: "이미 존재하는 닉네임 입니다."
        });
      }
    };
  };

  // 이메일 중복 체크
  async function duplicateEmail() {
    if (!user.email) {
      Toast.fire({
        icon: "question",
        title: "이메일을 입력하세요."
      });
      return
    };

    if (!checkEmailForm(user.email)) {
      Toast.fire({
        icon: "error",
        title: "올바른 이메일 형식을 입력하세요."
      });
      return
    };

    try {
      await userAPI.post('users/check/email', { email: user.email});
      setCheckEmail(true);
      Toast.fire({
        icon: "success",
        title: "사용 가능한 이메일 입니다."
      });
    } catch (error) {
      if (error.response.status === 409) {
        Toast.fire({
          icon: "error",
          title: "이미 존재하는 이메일 입니다."
        });
      }
    };
  };

  return (
    <div className="profile-edit">
      <div className="profile-edit-row">
        <div>닉네임</div>
        <input
          className="profile-edit-input"
          type="nickname"
          value={user.nickname}
          onChange={handleChnage}
        />
        {checkNickname ? (
          <div
            className="profile-check-confirm"
          >
            <AiFillCheckCircle/>
          </div>
        ) : (
          <div
            className="profile-check"
            onClick={duplicateNickname}
          >
            중복확인
          </div>
        )}
      </div>
      <div className="profile-edit-row">
        <div>이메일</div>
        <input
          className="profile-edit-input"
          type="email"
          value={user.email}
          onChange={handleChnage}
        />
        {checkEmail ? (
          <div
            className="profile-check-confirm"
          >
            <AiFillCheckCircle/>
          </div>
        ) : (
          <div
            className="profile-check"
            onClick={duplicateEmail}
          >
            중복확인
          </div>
        )}
      </div>
      <div className="profile-edit-row">
        <Link
          to="password"
          state={{
            user: state.user
          }}
        >
          비밀번호 수정
        </Link>
      </div>
      <div className="profile-edit-buttons">
        <Link
          className="profile-link-back"
          to="/profile"
          state={{
            user: state.user
          }}
        >
          뒤로
        </Link>
        <div
          className="profile-edit-button"
        >
          수정
        </div>
      </div>
    </div>
  )
}
