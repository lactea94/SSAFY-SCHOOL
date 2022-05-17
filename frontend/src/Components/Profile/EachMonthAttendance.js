import { useEffect, useState } from "react";
import holidays from "./holidays";
import { PieChart } from "react-minimal-pie-chart"
import "./css/EachMonthAttendance.css";

export default function EachMonthAttendance({ checkInList, checkOutList }) {
  const [ today, setToday ] = useState({year: 0, month:0, date: 0})
  const [ weekdays, setWeekdays ] = useState(30);
  const [ chartdata, setChartdata ] = useState(null);
  const [ attendance, setAttendance ] = useState(0);
  const [ tardy, setTardy ] = useState(0);

  // 이번달 일 수 계산
  useEffect(() => {
    const todayInfo = new Date();
    const newToday = {
      year: todayInfo.getFullYear(), 
      month: todayInfo.getMonth() + 1, 
      date: todayInfo.getDate()
    }
    setToday(newToday)

    const lastDate = (new Date(newToday.year, newToday.month, 0)).getDate();
    let count = 0;
    for (let date = 1; date <= lastDate; date++) {
      const temp = new Date(newToday.year, newToday.month - 1, date);
      const tempDay = temp.getDay();
      const tempDate = temp.getDate();
      if (tempDay !== 0 && tempDay !== 6) {
        if (!(holidays[newToday.year][newToday.month].includes(tempDate))) {
          count += 1
        }
      }
    }
    setWeekdays(count)
  }, [])

  // 출석수 계산
  useEffect(() => {
    let presents = 0
    let tardys = 0
    const checkInSet = new Set(checkInList);
    const checkOutSet = new Set(checkOutList);
    const newCheckInList = [...checkInSet];
    const newCheckOutList = [...checkOutSet];

    // 지각
    for (let i = 0; i < newCheckInList.length; i ++) {
      if (parseInt(newCheckInList[i].slice(5, 7)) === today.month){
        if (newCheckOutList.includes(newCheckInList[i])) {
          presents++
        } else {
          tardys++
        }
      }
    }
    // 조퇴
    for (let i = 0; i < newCheckOutList.length; i ++) {
      if (parseInt(newCheckOutList[i].slice(5, 7)) === today.month){
        if (newCheckInList.includes(newCheckOutList[i])) {
          presents++
        } else {
          tardys++
        }
      }
    }
    presents -= Math.floor(tardys / 3)
    setAttendance(presents);
    setTardy(tardys);
    setChartdata([{title:'',value: presents,color:'#F6CB44'}])
  }, [checkInList, checkOutList, today])
  return (
    <div className="attendance-container">
      <div className="attendance-title">
        {today.month}월 출석
      </div>
      <div className="pie-chart-container">
        {chartdata && <PieChart
          data={chartdata}
          reveal={parseInt(attendance / weekdays * 100)}
          lineWidth={10}
          label={() => `${Math.round(attendance / weekdays * 100)}%`}
          background='#f3f3f3'
          rounded
          animate
          labelPosition={0}
        />}
      </div>
      <div className="attendance-money">
        누적 금액 {parseInt(1000000 * attendance / weekdays).toLocaleString("ko-KR")}원
      </div>
      <div className="attendance-content">지각/조퇴/외출 : {tardy}</div>
    </div>
  );
}