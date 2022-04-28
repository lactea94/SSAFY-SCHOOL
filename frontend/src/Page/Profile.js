import React from 'react';
import Maininfo from '../Components/Profile/Maininfo';
import './css/Profile.css';
import { useLocation } from 'react-router-dom';
import Grass from '../Components/Profile/Grass';

export default function Profile() {
  const { state } = useLocation();
  return (
    <div className='main'>
      <Maininfo user={state.user}/>
      <Grass/>
    </div>
  )
};
