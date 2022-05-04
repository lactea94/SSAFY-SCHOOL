import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2";
import { apiInstance } from "../../api";
import { AiFillCheckCircle } from "react-icons/ai";
import './css/EditUser.css'
import withReactContent from "sweetalert2-react-content";
import { duplicateEmail, duplicateNickname } from "../../api/UserAPI";
import Toast from "../../Utils/Toast";

export default function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();
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
  const [ totalMileage, setTotalMileage ] = useState(0);
  const [ remainMileage, setRemainMileage ] = useState(0);
  const [ checkInList, setCheckInList ] = useState([]);
  const [ checkOutList, setCheckOutList ] = useState([]);
  const [ addMileage, setAddMileage ] = useState(0);
  const [ checkNickname, setCheckNickname ] = useState(true);
  const [ checkEmail, setCheckEmail ] = useState(true);
  const [ originNickname, setOriginNickname ] = useState("");
  const [ originEmail, setOriginEmail ] = useState("");
  const API = apiInstance();
  const MySwal = withReactContent(Swal);
  
  // 유저 정보 호출
  useEffect(() => {
    async function saveUser() {
      const res = await apiInstance().get(`users/${userId}`);
      setUser(res.data);
      setOriginNickname(res.data.nickname);
      setOriginEmail(res.data.email);
    };
    saveUser();
  }, [userId]);

  // 마일리지 정보 저장
  useEffect(() => {
    setTotalMileage(user.totalMileage);
    setRemainMileage(user.remainMileage);
  }, [user]);

  // 출석 정보 호출
  useEffect(() => {
    async function saveCheckIn() {
      const res = await API.get(`/check/in/${userId}`)
      setCheckInList(res.data)
    };
  
    async function saveCheckOut() {
      const res = await API.get(`/check/out/${userId}`)
      setCheckOutList(res.data)
    };

    saveCheckIn();
    saveCheckOut();
  }, [API, userId]);

  // 유효성 검사
  function validation() {
    if ( checkEmail && checkNickname ) return true
    return false
  };

  // 유저 정보 변경
  function handleChange({target: {id, value}}) {
    if (id === "nickname") {
      if (originNickname === value) {
        setCheckNickname(true);
      } else {
        setCheckNickname(false);
      }
    } else if (id === "email") {
      if (originEmail === value) {
        setCheckEmail(true);
      } else {
        setCheckEmail(false);
      }
    } else if (id === "admin") {
      value = parseInt(value)
    } else if (id === "gender") {
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


  // 마일리지 추가
  function plusMileage() {
    if (addMileage) {
      setTotalMileage(totalMileage + parseInt(addMileage));
      setRemainMileage(remainMileage + parseInt(addMileage));
      setAddMileage(0);
    }
  };

  // 유저 정보 수정
  async function handleSubmit() {
    if (validation()) {
      try {
        await API.put(`/users/${userId}`, {
          nickname: user.nickname,
          name : user.name,
          gender : user.gender,
          admin : user.admin,
          totalMileage : totalMileage,
          remainMileage : remainMileage,
          studentId : user.studentId,
          classNumber : user.classNumber,
          teamCode : user.teamCode,
          local : user.local
        });
        await MySwal.fire({
          icon: "success",
          title: "정보 수정 성공!",
        }).then(function() {navigate(0)})
      } catch (error) {
        console.log(error)
      }
    } else {
      MySwal.fire({
        icon: "warning",
        title: "Oops...",
        text: `${
          [!checkNickname && "닉네임", !checkEmail && "이메일"].filter(text => text.length > 0).join(', ')
        }을(를) 확인하세요`,
      });
    }
  }

  // 라디오 컨테이너
  function radioContainer(lst) {
    return (
      lst.map((data) => (
        <label key={data.name} className="radio-label">
          <input
            className="edit-user-radio"
            id={data.id}
            value={data.value}
            type="radio"
            checked={user[data.id] === data.value}
            onChange={handleChange}
          />
          <div className="label-name">{data.name}</div>
        </label>
      ))
    )
  }

  return (
    <div className="edit-user">
      <div className="edit-user-row">
        <div className="label">아이디</div>
        <div className="edit-user-text">{user.userId}</div>
      </div>
      <div className="edit-user-row">
        <div className="label">닉네임</div>
        <input
          className="edit-user-input"
          id="nickname"
          value={user.nickname}
          onChange={handleChange}
        />
        {checkNickname ? (
          <div
            className="user-edit-check-confirm"
          >
            <AiFillCheckCircle/>
          </div>
        ) : (
          <div
            className="user-edit-check"
            onClick={() => {
              duplicateNickname(
                user.nickname,
                Toast,
                setCheckNickname
            )}}
          >
            중복확인
          </div>
        )}
      </div>
      <div className="edit-user-row">
        <div className="label">이메일</div>
        <input 
          className="edit-user-input"
          id="email"
          value={user.email}
          onChange={handleChange}
        />
        {checkEmail ? (
            <div
              className="user-edit-check-confirm"
            >
              <AiFillCheckCircle/>
            </div>
          ) : (
            <div
              className="user-edit-check"
              onClick={() => {
                duplicateEmail(
                  user.email,
                  Toast,
                  setCheckEmail
              )}}
            >
              중복확인
            </div>
        )}
      </div>
      <div className="edit-user-row">
        <div className="label">권한</div>
        <div className="radio-container">
          {radioContainer([
            {id: "admin", value: 0, name: "관리자"},
            {id: "admin", value: 1, name: "운영프로"},
            {id: "admin", value: 2, name: "학생"},
          ])}
        </div>
      </div>
      <div className="edit-user-row">
        <div className="label">이름</div>
        <input
          className="edit-user-input"
          id="name"
          value={user.name}
          onChange={handleChange}
        />
      </div>
      <div className="edit-user-row">
        <div className="label">성별</div>
        <div className="radio-container">
          {radioContainer([
            {id: "gender", value: true, name: "남"},
            {id: "gender", value: false, name: "여"},
          ])}
        </div>
      </div>
      <div className="edit-user-row">
        <div className="label">지역</div>
        <div className="radio-container">
          {radioContainer([
            {id: "local", value: "Seoul", name: "서울"},
            {id: "local", value: "Daejeon", name: "대전"},
            {id: "local", value: "Gwangju", name: "광주"},
            {id: "local", value: "Gumi", name: "구미"},
            {id: "local", value: "BuUlKyung", name: "부울경"},
          ])}
        </div>
      </div>
      <div className="edit-user-row">
        <div className="label">반</div>
        <input
          className="edit-user-input"
          id="classNumber"
          value={user.classNumber}
          onChange={handleChange}
        />
      </div>
      <div className="edit-user-row">
        <div className="label">학번</div>
        <input
          className="edit-user-input"
          id="studentId"
          value={user.studentId}
          onChange={handleChange}/>
      </div>
      <div className="edit-user-row">
        <div className="label">팀코드</div>
        <input
          className="edit-user-input"
          id="teamCode"
          value={user.teamCode}
          onChange={handleChange}
        />
      </div>
      <div className="edit-user-row">
        <div className="label">누적 마일리지</div>
        <div className="edit-user-text">{totalMileage}</div>
      </div>
      <div className="edit-user-row">
        <div className="label">잔여 마일리지</div>
        <div className="edit-user-text">{remainMileage}</div>
      </div>
      <div className="edit-user-row">
        <div className="label">마일리지 추가</div>
        <input
          className="edit-user-input"
          type="number"
          value={addMileage}
          onChange={e => setAddMileage(e.target.value)}
        />
        <button className="add-mileage-button" onClick={plusMileage}>추가</button>
      </div>
      <div className="edit-user-confirm">
        <button className="edit-user-button" onClick={handleSubmit}>수정</button>
      </div>
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
    </div>
  )
}
