import { useState } from "react";
import Pagination from "../../Utils/Pagination";

export function Users() {
  const userList = [
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
  ];

  // gender: true,
  // totalMileage: 'ssafy@ssafy.com',
  // studentId: 'ssafy@ssafy.com',
  // classNumber: 'ssafy@ssafy.com',
  // teamCode: 'ssafy@ssafy.com',
  // Local: 'ssafy@ssafy.com',
  // inCreatedDate: 'ssafy@ssafy.com',
  // outCreatedDate: 'ssafy@ssafy.com',
  
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  function UserList() {
    return (
      userList.slice(offset, offset + limit).map((user) => (
          <div className="admin-row">
            <div>{user.userId}</div>
            <div>{user.email}</div>
            <div>{user.name}</div>
            <div>{user.nickname}</div>
            <div className="admin-delete-button">삭제</div>
          </div>
        )
      )
    )
  }

  return (
    <div>
      <div className="admin-container">
        <div className="admin-index-row">
          <div>아이디</div>
          <div>이메일</div>
          <div>이름</div>
          <div>닉네임</div>
          <div>삭제</div>
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
    </div>
  )
}
