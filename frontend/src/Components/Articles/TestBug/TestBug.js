import { useEffect, useState } from "react";
import DateFormat from "../../../Utils/DateFormat";
import Pagination from "../../Pagination/Pagination";
import Search from "../../Search/Search";
import useAuthGetList from "../../../Hooks/useAuthGetList";
import useGetList from "../../../Hooks/useGetList";
import { FaCommentMedical } from "react-icons/fa";
import "./css/TestBug.css";
import { CreateTestBug } from "../../../api/TestBugAPI";

export default function TestBug() {
  const [ isAuthenticated, setIsAuthenticated] = useState(false);
  const [ text, setText ] = useState("");
  const [ searchCategory, setSearchCategory ] = useState("content");
  const [ searchText, setSearchText ] = useState("");
  const [ filteredLogs, setFilteredLogs ] = useState([]);
  const [ limit, setLimit ] = useState(10);
  const [ page, setPage ] = useState(1);
  const offset = (page - 1) * limit;
  const categories = [
    { value: 'content', name: '내용'},
  ];

  // 로그인 사용자 확인
  useEffect(() => {
    if (localStorage.getItem('accesstoken'))
      setIsAuthenticated(true)
  }, []);

  // 버그 리포트 호출
  const logs = useGetList('/report');

  // 필터링
  useEffect(() => {
    if (searchCategory === 'content') {
      setFilteredLogs(() => 
        logs.filter((log) => 
          log.content.toLowerCase().includes(searchText.toLowerCase())
    ))}
  }, [searchCategory, searchText, logs]);

  // 버그 리포트 작성
  function handleClick() {
    CreateTestBug(text);
    setText("");
  }

  function Log() {
    return (
      filteredLogs.slice(offset, offset + limit).map((log) => 
        (
          <div className="bug-row" key={log.id}>
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
        {Log()}
      </div>
      { isAuthenticated && 
        <div className="input-container">
          <textarea
            className="submit-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />
          <div
            className="submit-button"
            onClick={handleClick}
          >
            <FaCommentMedical />
          </div>
        </div>
      }
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
