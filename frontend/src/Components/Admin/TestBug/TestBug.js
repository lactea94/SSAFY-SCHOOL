import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetList from "../../../Hooks/useGetList";
import DateFormat from "../../../Utils/DateFormat";
import Loading from "../../Loading/Loading";
import Pagination from "../../Pagination/Pagination";
import Search from "../../Search/Search";
import "./css/TestBug.css";

export function TestBug() {
  const [ loading, setLoading ] = useState(true);
  const [ searchCategory, setSearchCategory ] = useState('content');
  const [ searchText, setSearchText ] = useState('');
  const [ filteredLogs, setFilteredLogs ] = useState([]);
  const [ limit, setLimit ] = useState(10);
  const [ page, setPage ] = useState(1);
  const offset = (page - 1) * limit;
  const categories = [
    { value: 'content', name: '내용'},
    { value: 'username', name: '작성자'},
    { value: 'nickname', name: '닉네임'},
  ];
  const navigate = useNavigate();

  if (!localStorage.getItem('accesstoken') || !localStorage.getItem('admin') ) {
    navigate('/');
  };


  // 버그 리포트 호출
  const logs = useGetList('/report');

  // 로딩
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // 검색 필터링
  useEffect(() => {
    if (searchCategory === 'content') {
      setFilteredLogs(() => 
        logs.filter((log) => 
          log.content.toLowerCase().includes(searchText.toLowerCase())
    ))} else if (searchCategory === 'username') {
      setFilteredLogs(() => 
        logs.filter((log) => 
          log.username.toLowerCase().includes(searchText.toLowerCase())
    ))} else if (searchCategory === 'nickname') {
      setFilteredLogs(() => 
        logs.filter((log) => 
          log.nickname.toLowerCase().includes(searchText.toLowerCase())
    ))}
  }, [searchCategory, searchText, logs]);

  // 버그 리포트
  function Log() {
    return (
      filteredLogs.slice(offset, offset + limit).map((log) => 
        (
          <div className="admin-bug-row" key={log.id}>
            <div>{log.nickname}</div>
            <div className="admin-log-content">{log.content}</div>
            <div>{log.username}</div>
            <div>{DateFormat(log.createdDate)}</div>
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
        <div className="admin-container">
          <div className="admin-bug-index-row">
            <div>닉네임</div>
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
       </> 
      )}
    </div>
  )
};
