import { useEffect, useState } from "react";
import "./css/Admin.css";
import DateFormat from "../../Utils/DateFormat";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import { useNavigate } from "react-router-dom";
import useGetList from "../../Hooks/useGetList";

export function TestBug() {
  const [ searchCategory, setSearchCategory ] = useState('content');
  const [ searchText, setSearchText ] = useState('');
  const [ logs, setLogs ] = useState([]);
  const [ filteredLogs, setFilteredLogs ] = useState([]);
  const [ limit, setLimit ] = useState(10);
  const [ page, setPage ] = useState(1);
  const offset = (page - 1) * limit;
  const categories = [
    { value: 'content', name: '내용'},
  ];
  const navigate = useNavigate();

  if (!localStorage.getItem('accesstoken') || !localStorage.getItem('admin')) {
    navigate('/');
  };


  // 버그 리포트 호출
  // const logs = useGetList('/report');
  useEffect(() => {
    setLogs([
      { id: 0, userId: 1, content: "내용1", createdDate: "2022-04-19 15:30:30" },
      { id: 1, userId: 7, content: "내용2", createdDate: "2022-04-18 15:30:30" },
      { id: 2, userId: 4, content: "내용3", createdDate: "2022-04-17 15:30:30" },
      { id: 3, userId: 2, content: "내용4", createdDate: "2022-04-16 15:30:30" },
      { id: 4, userId: 11, content: "내용5", createdDate: "2022-04-15 15:30:30" },
      { id: 5, userId: 9, content: "내용6", createdDate: "2022-04-14 15:30:30" },
      { id: 6, userId: 7, content: "내용7", createdDate: "2022-04-13 15:30:30" },
      { id: 7, userId: 6, content: "내용8", createdDate: "2022-04-12 15:30:30" },
      { id: 8, userId: 4, content: "내용9", createdDate: "2022-04-11 15:30:30" },
      { id: 9, userId: 5, content: "내용10", createdDate: "2022-04-10 15:30:30" },
      { id: 10, userId: 2, content: "내용11", createdDate: "2022-04-09 15:30:30" },
      { id: 11, userId: 3, content: "내용12", createdDate: "2022-04-08 15:30:30" },
      { id: 12, userId: 1, content: "내용13", createdDate: "2022-04-07 15:30:30" },
    ])
  }, []);

  // 검색 필터링
  useEffect(() => {
    if (searchCategory === 'content') {
      setFilteredLogs(() => 
        logs.filter((log) => 
          log.content.toLowerCase().includes(searchText.toLowerCase())
    ))}
  }, [searchCategory, searchText, logs]);

  // 버그 리포트
  function Log() {
    return (
      filteredLogs.slice(offset, offset + limit).map((log) => 
        (
          <div className="admin-bugs-row" key={log.id}>
            <div>{log.id}</div>
            <div>{log.content}</div>
            <div>{log.userId}</div>
            <div>{DateFormat(log.createdDate)}</div>
          </div>
        )
      )
    )
  };

  return (
    <div>
      <div className="article-container">
        <div className="admin-bugs-index-row">
          <div>#</div>
          <div>제보</div>
          <div>작성자</div>
          <div>작성일자</div>
        </div>
        {Log()}
      </div>
      <Pagination
        total={filteredLogs.length}
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
    </div>
  )
};
