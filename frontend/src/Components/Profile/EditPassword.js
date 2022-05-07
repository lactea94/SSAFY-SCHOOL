import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { authInstance } from "../../api";
import Toast from "../../Utils/Toast";
import './css/EditProfile.css';

export default function EditPassword() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [ password, setPassword ] = useState("");
  const [ confirmPassword, setConfirmPassword ] = useState("");
  const MySwal = withReactContent(Swal);
  const API = authInstance();

  async function handleSubmit() {
    if (!password) {
      Toast.fire({
        icon: "question",
        title:"비밀번호를 입력하세요."
      });
      return
    } else if (password !== confirmPassword) {
      Toast.fire({
        icon: "error",
        title:"비밀번호를 확인하세요."
      });
      return
    };
    try {
      await API.put('/users/password', { password: password});
      await MySwal.fire({
        icon: "success",
        title: "비밀번호 수정 성공!"
      })
      await new Promise(() => { navigate(0) })
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <form className="profile-edit">
      <div className="profile-edit-row">
        <div className="profile-edit-title">비밀번호</div>
        <input
          className="profile-edit-input"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className="profile-edit-row">
        <div className="profile-edit-title">비밀번호 확인</div>
        <input
          className="profile-edit-input"
          type="password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="profile-edit-buttons">
        <Link
          className="profile-link-back"
          to="/profile/edit"
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
    </form>
  )
}
