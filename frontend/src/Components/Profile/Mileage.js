import React,{useState, useEffect} from 'react'
import './css/Mileage.css'

export default function Mileage() {
  const [mileage,setMileage] = useState({
    avail:0,//사용가능
    accumulated:0,//누적마일리지
    used:0,//사용한마일리지
  })
  useEffect(()=>{
    //마일리지 불러오기
    let newMileage = {...mileage}
    newMileage.avail=300000;
    newMileage.accumulated=600000;
    newMileage.used=300000;
    setMileage(newMileage)
  },[])
  return (
    <>
      <div className='mileagemain'>
        <div className='title'>
          나의 마일리지
        </div>
        <hr/>
        <div className='available'>
          <h5>사용 가능한 마일리지</h5>
          <div className='mileagenumber'>{mileage.avail.toLocaleString("ko-KR")}M</div>
        </div>
        <div className='accumulated'>
          <h5>누적 마일리지</h5>
          <div className='mileagenumber'>{mileage.accumulated.toLocaleString("ko-KR")}M</div>
        </div>
        <div className='used'>
          <h5>사용한 마일리지</h5>
          <div className='mileagenumber'>{mileage.used.toLocaleString("ko-KR")}M</div>
        </div>
      </div>
    </>
  )
}
