import { useEffect, useState } from 'react';
import {PieChart} from 'react-minimal-pie-chart'
import holidays from './holidays';

export default function EachMonthAttendance() {
  const [today, setToday] = useState({year: 0, month:0, date: 0})
  useEffect(() => {
    const todayInfo = new Date();
    const newToday = {
      year: todayInfo.getFullYear(), 
      month: todayInfo.getMonth() + 1, 
      date: todayInfo.getDate()
    }
    setToday(newToday)
    console.log(holidays)
  }, [])

  return (
    <div>
      <h1>{today.month}월 출석</h1>
      {/* <PieChart
        data={chartdata}
        reveal={parseInt((attendance.present*100)/fullday)}
        lineWidth={10}
        label={() => `${parseInt((attendance.present*100)/fullday)}%`}
        background='#f3f3f3'
        rounded
        animate
        labelPosition={0}
      /> */}
    </div>
  );
}