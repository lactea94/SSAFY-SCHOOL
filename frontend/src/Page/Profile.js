import React from 'react'
import Maininfo from '../Components/Profile/Maininfo'
import Mileage from '../Components/Profile/Mileage'
import Attendance from '../Components/Profile/Attendance'
import './css/Profile.css'
import { useLocation } from 'react-router-dom'

export default function Profile() {
  const { state } = useLocation();
  return (
    <>
      <div className='main'>
        <div className='mainInfo'>
          <Maininfo user={state.user}/>
          <Mileage user={state.user}/>
        </div>

        <div className='additionalInfo'>
          <Attendance/>
        </div>

      </div>
    </>
  )
}
