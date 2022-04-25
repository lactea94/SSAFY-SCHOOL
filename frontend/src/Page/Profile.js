import React from 'react'
import Maininfo from '../Components/Profile/Maininfo'
import Mileage from '../Components/Profile/Mileage'
import Attendance from '../Components/Profile/Attendance'
import './css/Profile.css'

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
