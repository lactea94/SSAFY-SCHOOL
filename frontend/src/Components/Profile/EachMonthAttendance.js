import { useMemo, useState } from "react";
import { PieChart } from "react-minimal-pie-chart"
import holidays from "./holidays";
import "./css/EachMonthAttendance.css";

export default function EachMonthAttendance({ checkInList, checkOutList }) {
  const [ today, setToday ] = useState({year: 0, month:0, date: 0})
  const [ weekdays, setWeekdays ] = useState(30);
  const [ nowWeekdays, setNowWeekdays ] = useState(0);
  const [ chartdata, setChartdata ] = useState(null);
  const [ attendance, setAttendance ] = useState(0);
  const [ realAttendance, setRealAttendance ] = useState(0);
  const [ tardy, setTardy ] = useState(0);
  const [ early, setEarly ] = useState(0);

  // 이번달 일 수 계산
  useMemo(() => {
    const todayInfo = new Date();
    const newToday = {
      year: todayInfo.getFullYear(), 
      month: todayInfo.getMonth() + 1, 
      date: todayInfo.getDate()
    }
    setToday(newToday)

    // 이번달의 평일
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

    // 전날까지의 평일
    let cnt = 0;
    for (let date = 1; date <= newToday.date; date++) {
      const temp = new Date(newToday.year, newToday.month - 1, date);
      const tempDay = temp.getDay();
      const tempDate = temp.getDate();
      if (tempDay !== 0 && tempDay !== 6) {
        if (!(holidays[newToday.year][newToday.month].includes(tempDate))) {
          cnt += 1
        }
      }
    }
    setNowWeekdays(cnt)
  }, [])

  // 출석수 계산
  useMemo(() => {
    let presents = 0
    let tardy = 0
    let early = 0
    const checkInSet = new Set(checkInList);
    const checkOutSet = new Set(checkOutList);
    const union = new Set([...checkInSet, ...checkOutSet])

    // 출석
    presents = union.size;

    // 지각
    for (let value of checkOutSet) {
      if (!checkInSet.has(value)) {
        tardy += 1
      }
    }

    // 조퇴
    for (let value of checkInSet) {
      if (!checkOutSet.has(value)) {
        early += 1
      }
    }

    setAttendance(presents);
    setTardy(tardy);
    setEarly(early);

    // 실제 출석
    if (presents - parseInt((tardy + early) / 3) > 0) {
      setRealAttendance(presents - parseInt((tardy + early) / 3));
    };
    setChartdata([{title:'',value: presents,color:'#F6CB44'}])
  }, [checkInList, checkOutList]);

  return (
    <div className="attendance-container">
      <div className="attendance-title">
        <div>{today.month}월 {today.date}일 출석현황</div>
        <div className="attendance-sub-title">수업일수 : {nowWeekdays}</div>
      </div>
      <div className="pie-chart-container">
        {chartdata && <PieChart
          data={chartdata}
          reveal={parseInt(realAttendance / nowWeekdays * 100)}
          lineWidth={10}
          label={() => `${Math.round(realAttendance / nowWeekdays * 100)}%`}
          background='#f3f3f3'
          rounded
          animate
          labelPosition={0}
        />}
      </div>
      <div className="attendance-money">
        누적 금액 {parseInt(1000000 * realAttendance / weekdays).toLocaleString("ko-KR")}원
      </div>
      <div className="attendance-content">
        <div className="attendance-count">출석 : {attendance}</div>
        <div className="attendance-content-text">정상출석 : {attendance - tardy - early}</div>
        <div className="attendance-content-text">지각 : {tardy}</div>
        <div className="attendance-content-text">조퇴 : {early}</div>
        <div className="absence-count">결석 : {nowWeekdays - attendance}</div>
      </div>
    </div>
  );
}