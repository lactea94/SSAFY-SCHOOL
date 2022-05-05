import { useState } from "react";
import { useParams } from "react-router-dom";
import useGetList from "../../Hooks/useGetList"
import Pagination from "../Pagination/Pagination";

export default function CheckOut() {
  const { userId } = useParams();
  const [ limit, setLimit ] = useState(5);
  const [ page, setPage ] = useState(1);
  const offset = (page - 1) * limit;

  // 퇴실 기록 호출
  const checkOutList = useGetList(`/check/out/${userId}`)
  
  function CheckOut() {
    return (
      checkOutList.slice(offset, offset + limit).map((CheckOut) => (
        <div className="check-row" key={CheckOut.id}>
          <div>{CheckOut.createdDate}</div>
          <div>{CheckOut.createdTime}</div>
        </div>
      ))
    )
  }

  return (
    <div className="check-list">
      <div className="check-title">퇴실 기록</div>
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
