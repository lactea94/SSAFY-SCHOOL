import { useState, useEffect } from 'react';
import './css/Maininfo.css';
import EachMonthAttendance from './EachMonthAttendance';

export default function Maininfo({ user, checkInList, checkOutList }) {
  const [data, setData] = useState({
    name: null, // 이름
    schoolId: null, // 학번
    id: null, // 아이디
    region: null, // 지역
    class: null, // 반
    picture: null, // 캐릭터사진
    totalMileage: null, // 누적 마일리지
    remainMileage: null, // 사용 가능 마일리지
  });

  function localize(region) {
    if (region === "Seoul") {
      return "서울"
    } else if (region === "Daejeon") {
      return "대전"
    } else if (region === "Gwangju") {
      return "광주"
    } else if (region === "Gumi") {
      return "구미"
    } else {
      return "부울경"
    }
  }

  useEffect(() => {
    // 유저 정보 불러오기
    let newData = {
      ...data,
      name: user.name,
      schoolId: user.studentId,
      id: user.userId,
      region: localize(user.local),
      class: user.classNumber,
      totalMileage: user.totalMileage,
      remainMileage: user.remainMileage
    }
    setData(newData)
  }, [data, user]);


  return (
    <div className='main-info'>
      <div className='mileage-info'>
        <div className='profile-info'>
          <div>{data.region} {data.class}반 {data.name}</div>
          <div>{data.schoolId}</div>
        </div>
        <div className='mileage-title'>
          나의 마일리지
        </div>
        <hr/>
        <div className='available-mileage'>
          <h5>사용 가능한 마일리지</h5>
          <div className='mileage-number'>{user.remainMileage.toLocaleString("ko-KR")}M</div>
        </div>
        <div className='accumulated-mileage'>
          <h5>누적 마일리지</h5>
          <div className='mileage-number'>{user.totalMileage.toLocaleString("ko-KR")}M</div>
        </div>
        <div className='used-mileage'>
          <h5>사용한 마일리지</h5>
          <div className='mileage-number'>{(user.totalMileage - user.remainMileage).toLocaleString("ko-KR")}M</div>
        </div>
      </div>
      <EachMonthAttendance
        checkInList={checkInList}
        checkOutList={checkOutList}
      />
    </div>
  )
};
