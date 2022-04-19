import React from 'react'
import Maininfo from '../Component/Profile/Maininfo'
import Mileage from '../Component/Profile/Mileage'
import Attendance from '../Component/Profile/Attendance'
import './Profile.css'

export default function Profile() {

  return (
    <>
      <div className='main'>
        <div className='mainInfo'>
          <Maininfo/>
          <Mileage/>
        </div>

        <div className='additionalInfo'>
          <Attendance/>
        </div>

      </div>
    </>
  )
}
