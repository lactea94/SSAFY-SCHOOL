import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"
import { apiInstance } from "../../api";
import { FaCheck } from 'react-icons/fa';
import './css/EditProfile.css'

export default function EditProfile() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [ name, setName ] = useState('');
  const [ nickname, setNickName ] = useState('');
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
    setUser(state.user);
    setName(state.user.name);
    setNickName(state.user.nickname);
  }, [state])

  async function checkNickname() {
    try {
      await apiInstance().post('/api/v1/users/duplicate-check-nickname', { nickname: nickname })
    } catch (error) {
      console.log(error)
    }
  }

  async function handleSubmit() {
    try {
      await apiInstance().put(`/users/update/${user.id}`, {
        nickname: nickname,
        name : name,
        gender : user.gender,
        admin : user.admin,
        totalMileage : user.totalMileage,
        remainMileage : user.remainMileage,
        studentId : user.studentId,
        classNumber : user.classNumber,
        teamCode : user.teamCode,
        local : user.local
      });
      navigate(0);
    } catch (error) {
      console.log(error)
    }
  }

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
          onClick={checkNickname}
        >
          <FaCheck />
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
