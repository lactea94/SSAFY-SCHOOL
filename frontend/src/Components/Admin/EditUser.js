import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { apiInstance } from "../../api";
import './css/EditUser.css'

export default function EditUser() {
  const { userId } = useParams();
  const { state } = useLocation();
  const [ user, setUser ] = useState({
    id: '',
    userId: '',
    name: '',
    nickname: '',
    email: '',
    gender: true,
    local: '',
    classNumber: '',
    studentId: '',
    teamCode: '',
    totalMileage: '',
    remainMileage: '',
    admin: 2,
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

  function editUserInput({target: {id, value}}) {
    if (id === "admin") {
      value = parseInt(value)
    }
    if (id === "gender") {
      if (value === "true")
        value = true
      else {
        value = false
      }
    }
    const newUser = {
      ...user,
      [id]: value,
    };
    setUser(newUser);
  };

  return (
    <div className="edit-user">
      <div className="edit-user-id">
        <div>id</div>
        <div>{user.id}</div>
      </div>
      <div className="edit-user-id">
        <div>아이디</div>
        <div>{user.userId}</div>
      </div>
      <div className="edit-user-admin">
        <div>권한</div>
        <label>
          <input
            id="admin"
            value={0}
            type="radio"
            checked={user.admin === 0}
            onChange={editUserInput}
          />
          관리자
        </label>
        <label>
          <input
            id="admin"
            value={1}
            type="radio"
            checked={user.admin === 1}
            onChange={editUserInput}
          />
          운영프로
        </label>
        <label>
          <input
            id="admin"
            value={2}
            type="radio"
            checked={user.admin === 2}
            onChange={editUserInput}
          />
          학생
        </label>
      </div>
      <div className="edit-user-name">
        <div>이름</div>
        <input
          id="name"
          value={user.name}
          onChange={editUserInput}
        />
      </div>
      <div className="edit-user-nickname">
        <div>닉네임</div>
        <input
          id="nickname"
          value={user.nickname}
          onChange={editUserInput}
        />
      </div>
      <div className="edit-user-email">
        <div>이메일</div>
        <div>{user.email}</div>
      </div>
      <div className="edit-user-gender">
        <div>성별</div>
        <label>
          <input
            id="gender"
            value={true}
            type="radio"
            checked={user.gender === true}
            onChange={editUserInput}
          />
          남
        </label>
        <label>
          <input
            id="gender"
            value={false}
            type="radio"
            checked={user.gender === false}
            onChange={editUserInput}
          />
          여
        </label>
      </div>
      <div className="edit-user-local">
        <div>지역</div>
        <label>
          <input
            id="local"
            value="Seoul"
            type="radio"
            checked={user.local === "Seoul"}
            onChange={editUserInput}
          />서울         
        </label>
        <label>
          <input
            id="local"
            value="Daejeon"
            type="radio"
            checked={user.local === "Daejeon"}
            onChange={editUserInput}
          />대전
        </label>
        <label>
          <input
            id="local"
            value="Gwangju"
            type="radio"
            checked={user.local === "Gwangju"}
            onChange={editUserInput}
          />광주
        </label>
        <label>
          <input
            id="local"
            value="Gumi"
            type="radio"
            checked={user.local === "Gumi"}
            onChange={editUserInput}
          />구미
        </label>
        <label>
          <input
            id="local"
            value="BuUlKyung"
            type="radio"
            checked={user.local === "BuUlKyung"}
            onChange={editUserInput}
          />부울경
        </label>
      </div>
      <div className="edit-user-classNumber">
        <div>반</div>
        <input
          id="classNumber"
          value={user.classNumber}
          onChange={editUserInput}
        />
      </div>
      <div className="edit-user-studentId">
        <div>학번</div>
        <input
          id="studentId"
          value={user.studentId}
          onChange={editUserInput}/>
      </div>
      <div className="edit-user-teamCode">
        <div>팀코드</div>
        <input
          id="teamCode"
          value={user.teamCode}
          onChange={editUserInput}
        />
      </div>
      <div className="edit-user-totalMileage">
        <div>누적 마일리지</div>
        <input
          id="totalMileage"
          value={user.totalMileage}
          onChange={editUserInput}
        />
      </div>
      <div className="edit-user-remainMileage">
        <div>잔여 마일리지</div>
        <input
          id="remainMileage"
          value={user.remainMileage}
          onChange={editUserInput}
        />
      </div>

      <div className="check-in-list">
        <div>입실 기록</div>
        <div className="check-in-row">
          <div>날짜</div>
          <div>시간</div>
        </div>
        {checkInList.map((checkIn) => (
          <div className="check-in-row" key={checkIn.id}>
            <div>{checkIn.createdDate}</div>
            <div>{checkIn.createdTime}</div>
          </div>
        ))}
      </div>
      <div className="check-out-list">
        <div>퇴실 기록</div>
        <div className="check-in-row">
          <div>날짜</div>
          <div>시간</div>
        </div>
      {checkOutList.map((checkOut) => (
        <div className="check-out-row" key={checkOut.id}>
          <div>체크아웃 날짜 {checkOut.createdDate}</div>
          <div>체크아웃 시간 {checkOut.createdTime}</div>
        </div>
      ))}
      </div>
    </div>
  )
}
