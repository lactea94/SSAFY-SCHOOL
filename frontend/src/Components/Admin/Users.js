import { useEffect, useState } from "react";
import { apiInstance } from "../../api";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";

export function Users() {
  const [ userList, setUserList ] = useState([])
  const [ searchCategory, setSearchCategory ] = useState('userId');
  const [ searchText, setSearchText ] = useState("");
  const [ filteredUserList, setFilteredUserList ] = useState([]);
  const [ limit, setLimit ] = useState(10);
  const [ page, setPage ] = useState(1);
  const offset = (page - 1) * limit;

  const categories = [
    { value: 'userId', name: '아이디'},
    { value: 'email', name: '이메일'},
    { value: 'name', name: '이름'},
    { value: 'nickname', name: '닉네임'},
  ]

  // 유저 리스트 호출
  useEffect(() => {
    setUserList([
      {
        id: 0,
        userId: 'ssafy1',
        nickname: '김싸피',
        name: '김싸피',
        email: 'ssafy1@ssafy.com',
        admin: '0',
      },
      {
        id: 1,
        userId: 'ssafy2',
        nickname: '이싸피',
        name: '이싸피',
        email: 'ssafy2@ssafy.com',
        admin: '1',
      },
      {
        id: 2,
        userId: 'ssafy3',
        nickname: '박싸피',
        name: '박싸피',
        email: 'ssafy3@ssafy.com',
        admin: '2',
      },
      {
        id: 3,
        userId: 'ssafy4',
        nickname: '정싸피',
        name: '정싸피',
        email: 'ssafy4@ssafy.com',
        admin: '2',
      },
    ])
  }, [])

  useEffect(() => {
    if (searchCategory === 'userId') {
      setFilteredUserList(() => 
        userList.filter((user) => 
          user.userId.toLowerCase().includes(searchText.toLowerCase())
    ))} else if (searchCategory === 'email') {
      setFilteredUserList(() => 
        userList.filter((user) => 
          user.email.toLowerCase().includes(searchText.toLowerCase())
    ))}
  }, [searchCategory, searchText, userList])


  // 모든 학생 입퇴실 기록 조회
  // const [ checkIn, setCheckIn ] = useState();
  // const [ checkOut, setCheckOut ] = useState();

  // const saveCheckIn = async () => {
  //   const res = await apiInstance().get('/check/in');
  //   setCheckIn(res.data)
  // };

  // const saveCheckOut = async () => {
  //   const res = await apiInstance().get('/check/in');
  //   setCheckOut(res.data)
  // };

  // useEffect(() => {
  //   saveCheckIn();
  //   saveCheckOut();
  // }, [])


  // 유저 리스트 
  function UserList() {
    return (
      filteredUserList.slice(offset, offset + limit).map((user) => (
          <div className="admin-row" key={user.id}>
            <div>{user.userId}</div>
            <div>{user.email}</div>
            <div>{user.name}</div>
            <div>{user.nickname}</div>
            <div className="admin-update-button">수정</div>
          </div>
        )
      )
    )
  };

  return (
    <div>
      <div className="admin-container">
        <div className="admin-index-row">
          <div>아이디</div>
          <div>이메일</div>
          <div>이름</div>
          <div>닉네임</div>
          <div>수정</div>
        </div>
        {UserList()}
      </div>
      <Search
        setSearchText={setSearchText}
        setSearchCategory={setSearchCategory}
        setPage={setPage}
        categories={categories}
      />
      <Pagination
        total={userList.length}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
      />
    </div>
  )
}
