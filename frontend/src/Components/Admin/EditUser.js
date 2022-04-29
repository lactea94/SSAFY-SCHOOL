import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { apiInstance } from "../../api";

export default function EditUser() {
  const { userId } = useParams();
  const { state } = useLocation();
  const [ user, setUser ] = useState({
    id: '',
    userId: '',
    name: '',
    nickname: '',
    email: '',
    gender: '',
    local: '',
    classNumber: '',
    studentId: '',
    teamCode: '',
    remainMileage: '',
    totalMileage: '',
    admin: '',
  });
  const [ checkInList, setCheckInList ] = useState([]);
  const [ checkOutList, setCheckOutList ] = useState([]);
  
  useEffect(() => {
    setUser(state.user)
  }, [state])

  useEffect(() => {
    async function saveCheckIn() {
      const res = await apiInstance().get(`/check/in/${userId}`)
      setCheckInList(res.data)
    };
  
    async function saveCheckOut() {
      const res = await apiInstance().get(`/check/out/${userId}`)
      setCheckOutList(res.data)
    };

    saveCheckIn();
    saveCheckOut();
  }, [userId])

  return (
    <div>
      <div>id {user.id}</div>
      <div>userId {user.userId}</div>
      <div>name {user.name}</div>
      <div>nickname {user.nickname}</div>
      <div>email {user.email}</div>
      <div>gender {user.gender}</div>
      <div>local {user.local}</div>
      <div>classNumber {user.classNumber}</div>
      <div>studentId {user.studentId}</div>
      <div>teamCode {user.teamCode}</div>
      <div>remainMileage {user.remainMileage}</div>
      <div>totalMileage {user.totalMileage}</div>
      <div>admin {user.admin}</div>
      {checkInList.map((checkIn) => (
        <div key={checkIn.id}>
          <div>체크인 날짜 {checkIn.createdDate}</div>
          <div>체크인 시간 {checkIn.createdTime}</div>
        </div>
      ))}
      {checkOutList.map((checkOut) => (
        <div key={checkOut.id}>
          <div>체크아웃 날짜 {checkOut.createdDate}</div>
          <div>체크아웃 시간 {checkOut.createdTime}</div>
        </div>
      ))}
    </div>
  )
}
