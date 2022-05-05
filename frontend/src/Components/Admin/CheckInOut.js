import { useParams } from "react-router-dom";
import useGetList from "../../Hooks/useGetList"
import "./css/CheckInOut.css"

export default function CheckInOut() {
  const { userId } = useParams();

  // 출석 정보 호출
  const checkInList = useGetList(`/check/in/${userId}`)
  const checkOutList = useGetList(`/check/out/${userId}`)
  
  return (
    <div className="check-in-out">
      <div className="check-list">
        <div className="check-title">입실 기록</div>
        <div className="check-index-row">
          <div>날짜</div>
          <div>시간</div>
        </div>
        {checkInList.map((checkIn) => (
          <div className="check-row" key={checkIn.id}>
            <div>{checkIn.createdDate}</div>
            <div>{checkIn.createdTime}</div>
          </div>
        ))}
      </div>
      <div className="check-list">
        <div className="check-title">퇴실 기록</div>
        <div className="check-index-row">
          <div>날짜</div>
          <div>시간</div>
        </div>
      {checkOutList.map((checkOut) => (
        <div className="check-row" key={checkOut.id}>
          <div>{checkOut.createdDate}</div>
          <div>{checkOut.createdTime}</div>
        </div>
      ))}
      </div>
  </div>
  )
}
