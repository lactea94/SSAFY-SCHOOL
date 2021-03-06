import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Pagination from "../../Pagination/Pagination";
import Search from "../../Search/Search";
import { FaUserEdit } from "react-icons/fa";
import useAuthGetList from "../../../Hooks/useAuthGetList";
import "./css/Users.css";
import Loading from "../../Loading/Loading";

export function Users() {
  const [ loading, setLoading ] = useState(true);
  const [ searchCategory, setSearchCategory ] = useState('userId');
  const [ searchText, setSearchText ] = useState('');
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
  const navigate = useNavigate();
  
  if (!localStorage.getItem('accesstoken') || !localStorage.getItem('admin')) {
    navigate('/');
  };

  // 유저 정보 호출
  const userList = useAuthGetList('/users');
  
  // 로딩
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  
  // 유저 검색 필터링
  useEffect(() => {
    if (searchCategory === 'userId') {
      setFilteredUserList(() => 
        userList.filter((user) => 
          user.userId.toLowerCase().includes(searchText.toLowerCase())
    ))} else if (searchCategory === 'email') {
      setFilteredUserList(() => 
        userList.filter((user) => 
          user.email.toLowerCase().includes(searchText.toLowerCase())
    ))} else if (searchCategory === 'name') {
      setFilteredUserList(() => 
        userList.filter((user) => 
          user.name.toLowerCase().includes(searchText.toLowerCase())
    ))} else if (searchCategory === 'nickname') {
      setFilteredUserList(() => 
        userList.filter((user) => 
          user.nickname.toLowerCase().includes(searchText.toLowerCase())
    ))}
  }, [searchCategory, searchText, userList])

  // 유저 리스트 
  function UserList() {
    return (
      filteredUserList.slice(offset, offset + limit).map((user) => (
          <div className="user-row" key={user.id}>
            <div>{user.userId}</div>
            <div>{user.email}</div>
            <div>{user.name}</div>
            <div>{user.nickname}</div>
            <Link
              to={`${user.id}`}
              className="user-update-button"
            >
              <FaUserEdit/>
            </Link>
          </div>
        )
      )
    )
  };

  return (
    <div>
      { loading ? (
        <Loading />
      ) : (
        <>
          <Outlet/>
          <div className="user-container">
            <div className="user-index-row">
              <div>아이디</div>
              <div>이메일</div>
              <div>이름</div>
              <div>닉네임</div>
              <div>수정</div>
            </div>
            {UserList()}
          </div>
          <Pagination
            total={userList.length}
            limit={limit}
            page={page}
            setPage={setPage}
            setLimit={setLimit}
          />
          <Search
            setSearchText={setSearchText}
            setSearchCategory={setSearchCategory}
            setPage={setPage}
            categories={categories}
          />
        </>
      )}
    </div>
  )
}
