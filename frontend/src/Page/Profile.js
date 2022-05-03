import './css/Profile.css';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaUserCog } from "react-icons/fa";

export default function Profile() {
  const { state } = useLocation();

  function localization(str) {
    if (str === "Seoul") {
      return "서울"
    } else if (str === "Daejeon") {
      return "대전"
    } else if (str === "Gwangju") {
      return "광주"
    } else if (str === "Gumi") {
      return "구미"
    } else {
      return "부울경"
    }
  };

  return (
    <div className='main'>
      <div className='profile-info'>
        <div className='profile-info-row'>
          <div>{localization(state.user.local)}</div>
          <div>{state.user.classNumber}반</div>
          <div>{state.user.name}</div>
        </div>
        <div className='profile-info-row'>
          <div>{state.user.studentId}</div>
          <div>
            <Link
              className='profile-edit-link'
              to="edit"
              state={{
                user: state.user
              }}
            >
              <FaUserCog />
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
};
