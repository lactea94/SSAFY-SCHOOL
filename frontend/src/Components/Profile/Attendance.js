import React,{useState, useEffect} from 'react'
import './css/Attendance.css'
import {PieChart} from 'react-minimal-pie-chart'

export default function Attendance() {
  const [attendance, setAttendance] = useState({
    present:null,//출석
    absent:null,//결석
    tardy:null,//지각
    leave:null,//조퇴
    outing:null,//외출
  })
  
  const [now, setNow] = useState("")

  const [fullday, setFullday] = useState(null)

  const [chartdata,setChartdata] = useState(null)

  useEffect(()=>{
    //출결현황 불러오기
    let newAttendance = {...attendance}
    newAttendance.present=5
    newAttendance.absent=14
    newAttendance.tardy=1
    newAttendance.leave=1
    newAttendance.outing=0
    setAttendance(newAttendance)

    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    setNow(`${year}.${month}`)

    setFullday(new Date(year,month,0).getDate())
  },[])

  useEffect(()=>{
    if(attendance.present !== null){
      let newChartdata = [
        {title:'',value:attendance.present,color:'#F6CB44'},
      ]
      setChartdata(newChartdata)
    }
  },[attendance])
  return (
    <div className='attendance-main'>

      <div className='attendance-maininfo'>
        <div className='attendance-title'>
          출결 현황 {now}
        </div>

        <div className='attendance-info'>
          ▪ 출석일 {attendance.present}
        </div>
      </div>

      <div className='attendance-detail'>
        <div className='attendance-graph'>
          {chartdata&&
          <PieChart
            data={chartdata}
            reveal={parseInt((attendance.present*100)/fullday)}
            lineWidth={10}
            label={() => `${parseInt((attendance.present*100)/fullday)}%`}
            background='#f3f3f3'
            rounded
            animate
            labelPosition={0}
          />
          }
        </div>
        <div className='attendance-present'>
          출석일
        </div>
        <div className='attendance-absent'>
          결석일
        </div>
      </div>
    </div>
  )
}
