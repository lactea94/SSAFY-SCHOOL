import './css/Profile.css';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { RiLockPasswordFill } from "react-icons/ri";

export default function Profile() {
  const { state } = useLocation();

  return (
    <div className='main'>
      <div className='profile-info'>
        <div className='profile-info-row'>
          <div>{state.user.local}</div>
          <div>{state.user.classNumber}반</div>
          <div>{state.user.name}</div>
        </div>
        <div className='profile-info-row'>
          <div>{state.user.studentId}</div>
          <div>
            <Link
              className='profile-edit-link'
              to="edit-password"
              state={{
                user: state.user
              }}
            >
              <RiLockPasswordFill />
            </Link>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  )
};
