import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetList from "../../Hooks/useGetList"
import Pagination from "../Pagination/Pagination";
import "./css/CheckInOut.css"

export default function CheckOut() {
  const { userId } = useParams();
  const [ fiteredList, setFilteredList ] = useState([]);
  const [ selectMonth , setSelectMont ] = useState(0);
  const [ limit, setLimit ] = useState(5);
  const [ page, setPage ] = useState(1);
  const offset = (page - 1) * limit;

  // 퇴실 기록 호출
  const checkOutList = useGetList(`/check/out/${userId}`)
  
    // 월 선택
    useEffect(() => {
      if (selectMonth) {
        setFilteredList(() => 
          checkOutList.filter((checkIn) => ( 
            new Date(checkIn.createdDate).getMonth() === selectMonth - 1 
            )
          )
        )
      } else {
        setFilteredList(checkOutList)
      }
    }, [checkOutList, selectMonth])

  // 출석 정보
  function CheckOut() {
    return (
      fiteredList.slice(offset, offset + limit).map((CheckOut) => (
        <div className="check-row" key={CheckOut.id}>
          <div>{CheckOut.createdDate}</div>
          <div>{CheckOut.createdTime}</div>
        </div>
      ))
    )
  }

  // 월별 선택 옵션
  function Options() {
    let array = []
    for(let i = 1; i < 13; i ++) {
      array.push(
        <option key={i} value={i}>{i}월</option>
      )
    }
    return array
  }

  return (
    <div className="check-list">
      <div className="check-title">퇴실 기록</div>
      <select
        className="month-select"
        value={selectMonth}
        onChange={({ target: { value }}) => {
          setSelectMont(value)
          setPage(1)
        }}
      >
        <option value={0}>전체</option>
        {Options()}
      </select>
      <div className="check-index-row">
        <div>날짜</div>
        <div>시간</div>
      </div>
      {CheckOut()}
      <Pagination
        total={checkOutList.length}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}      
      />
    </div>
  )
}
