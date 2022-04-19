import React,{useState, useEffect} from 'react'
import './css/Maininfo.css'

export default function Maininfo() {
  const [data,setData] = useState({
    name:null,//이름
    schoolId:null,//학번
    id:null,//아이디
    region:null,//지역
    class:null,//반
    picture:null,//캐릭터사진
  })
  useEffect(()=>{
    //학생정보 불러오기
    let newData = {...data}
    data.name='김동유'
    data.schoolId='0615180'
    data.id='ehddb2250'
    data.region='장자도'
    data.class='1'
    setData(newData)
  },[])
  return (
    <>
      <div className='mainmain'>
        <div className='profile-picture'>
          사진
        </div>
        <div className='profile-info'>
          {data.region} {data.class}반 {data.name}<br/>
          {data.schoolId}
        </div>
      </div>
    </>
  )
}
