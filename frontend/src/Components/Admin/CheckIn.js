import { useState } from "react";
import { useParams } from "react-router-dom";
import useGetList from "../../Hooks/useGetList"
import Pagination from "../Pagination/Pagination";
import "./css/CheckInOut.css"

export default function CheckIn() {
  const { userId } = useParams();
  const [ limit, setLimit ] = useState(5);
  const [ page, setPage ] = useState(1);
  const offset = (page - 1) * limit;
  
  // 입실 기록 호출
  const checkInList = useGetList(`/check/in/${userId}`)
  
  function CheckIn() {
    return (
      checkInList.slice(offset, offset + limit).map((CheckIn) => (
        <div className="check-row" key={CheckIn.id}>
          <div>{CheckIn.createdDate}</div>
          <div>{CheckIn.createdTime}</div>
        </div>
      ))
      )
    }
  
  return (
    <div className="check-list">
      <div className="check-title">입실 기록</div>
      <div className="check-index-row">
        <div>날짜</div>
        <div>시간</div>
      </div>
      {CheckIn()}
      <Pagination 
        total={checkInList.length}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}      
      />
    </div>
  )
}
