import React, { useEffect, useState } from 'react';
import Maininfo from '../Components/Profile/Maininfo';
import './css/Profile.css';
import { useLocation } from 'react-router-dom';
import Grass from '../Components/Profile/Grass';
import { apiInstance } from '../api';

export default function Profile() {
  const { state } = useLocation();
  const [ checkInList, setCheckInList ] = useState([]);
  const [ checkOutList, setCheckOutList ] = useState([]);

  useEffect(() => {
    async function saveCheckIn() {
      const res = await apiInstance().get(`/users/check-indate`)
      setCheckInList(res.data.map(data => data.checkIndate))
    };
  
    async function saveCheckOut() {
      const res = await apiInstance().get(`/users/check-outdate`)
      setCheckOutList(res.data.map(data => data.checkOutDate))
    };

    saveCheckIn();
    saveCheckOut();
  }, [])

  return (
    <div className='main'>
      <Maininfo
        user={state.user}
        checkInList={checkInList}
        checkOutList={checkOutList}
      />
      <Grass
        checkInList={checkInList}
        checkOutList={checkOutList}
      />
    </div>
  )
};
