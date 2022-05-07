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
    ))}
  }, [searchCategory, searchText, logs]);

  // 버그 리포트
  function Log() {
    return (
      filteredLogs.slice(offset, offset + limit).map((log) => 
        (
          <div className="admin-bugs-row" key={log.id}>
            <div>{log.id}</div>
            <div style={{ textAlign: "start"}}>{log.content}</div>
            <div>{log.userId}</div>
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
       </> 
      )}
    </div>
  )
};
