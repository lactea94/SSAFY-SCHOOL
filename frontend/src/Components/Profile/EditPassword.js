import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { apiInstance } from "../../api";
import './css/EditPassword.css'

export default function EditPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [ password, setPassword ] = useState();
  const [ confirmPassword, setConfirmPassword ] = useState();

  async function handleSubmit() {
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return
    } else if (password !== confirmPassword) {
      alert("비밀번호를 확인하세요.");
      return
    };
    try {
      await apiInstance().put('/users/password-update', { password: password});
      navigate(-1);
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <div className="profile-edit">
      <div className="profile-edit-row">
        <div className="profile-edit-title">비밀번호</div>
        <input
          className="profile-edit-input"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-title">비밀번호 확인</div>
        <input
          className="profile-edit-input"
          type="password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
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
          onClick={handleSubmit}
        >
          수정
        </div>
      </div>
    </div>
  )
}
