import './css/Profile.css';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Profile() {
  const { state } = useLocation();

  return (
    <div className='main'>
      <div className='profile-info'>
        <div>{state.user.local} {state.user.classNumber}반 {state.user.name}</div>
        <div>{state.user.studentId}</div>
        <Link to="edit" state={{user: state.user}}>편집</Link>
      </div>
      <Outlet />
    </div>
  )
};
