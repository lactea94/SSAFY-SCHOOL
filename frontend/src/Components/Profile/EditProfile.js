import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { apiInstance } from "../../api";
import './css/EditProfile.css';

export default function EditProfile() {
  const { state } = useLocation();
  const [ name, setName ] = useState('');
  const [ nickname, setNickName ] = useState('');
  const [ checkNickname, setCheckNickName ] = useState(false);
  const [ user, setUser ] = useState({
    id: '',
    userId: '',
    name: '',
    nickname: '',
    email: '',
    gender: true,
    local: '',
    classNumber: '',
    studentId: '',
    teamCode: '',
    totalMileage: '',
    remainMileage: '',
    admin: 2,
  });

  useEffect(() => {
    console.log(state.user)
    setUser(state.user);
    setName(state.user.name);
    setNickName(state.user.nickname);
  }, [state]);

  async function handlecheckNickname() {
    try {
      await apiInstance().post('/users/duplicate-check-nickname', { nickname: nickname });
      alert("사용 가능한 닉네임 입니다.")
      setCheckNickName(true);
    } catch (error) {
      if (error.response.status === 409) {
        alert("존재하는 닉네임 입니다.");
        setCheckNickName(false)
      }
    }
  };

  async function handleSubmit() {
    if (!checkNickname) {
      alert('닉네임 중복확인 하세요');
      return
    }
    try {
      await apiInstance().put(`/users/${user.id}`, {
        admin : user.admin,
        classNumber : user.classNumber,
        gender : user.gender,
        local : user.local,
        name : name,
        nickname: nickname,
        remainMileage : user.remainMileage,
        studentId : user.studentId,
        teamCode : user.teamCode,
        totalMileage : user.totalMileage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="profile-edit">
      <div className="profile-edit-row">
        <div className="profile-edit-title">이름</div>
        <input
          className="profile-edit-input"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-title">닉네임</div>
        <input
          className="profile-edit-input"
          value={nickname}
          onChange={e => setNickName(e.target.value)}
        /> 
        <div
          className="profile-edit-check"
          onClick={handlecheckNickname}
        >
          중복확인
        </div>
      </div>
      <div className="profile-edit-row">비밀번호 수정</div>
      <div className="profile-edit-buttons">
        <Link
          className="profile-link-back"
          to="/profile"
          state={{
            user: user
          }}
        >
          뒤로
        </Link>
        <div
          className="profile-edit-button"
          onClick={handleSubmit}
        >
          수정
        </div>
      </div>
    </div>
  )
}
