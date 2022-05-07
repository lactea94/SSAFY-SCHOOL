import { useEffect, useState } from "react";
import DateFormat from "../../../Utils/DateFormat";
import Pagination from "../../Pagination/Pagination";
import Search from "../../Search/Search";
import useGetList from "../../../Hooks/useGetList";
import { FaCommentMedical } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../../Loading/Loading";
import { CreateTestBug } from "../../../api/TestBugAPI";
import "./css/TestBug.css";

export default function TestBug() {
  const [ loading, setLoading ] = useState(true);
  const [ isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const [ text, setText ] = useState("");
  const [ searchCategory, setSearchCategory ] = useState("content");
  const [ searchText, setSearchText ] = useState("");
  const [ filteredLogs, setFilteredLogs ] = useState([]);
  const [ limit, setLimit ] = useState(10);
  const [ page, setPage ] = useState(1);
  const offset = (page - 1) * limit;
  const categories = [
    { value: 'content', name: '내용'},
    { value: 'username', name: '작성자'},
    { value: 'nickname', name: '닉네임'},
  ];

  // 로그인 사용자 확인
  useEffect(() => {
    if (localStorage.getItem('accesstoken'))
      setIsAuthenticated(true)
  }, []);

  // 버그 리포트 호출
  const logs = useGetList('/report');

  // 로딩
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // 필터링
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

  // 버그 리포트 작성
  function handleClick() {
    CreateTestBug(text);
    navigate(0);
    setText("");
  };
  console.log(logs)

  function Log() {
    return (
      filteredLogs.slice(offset, offset + limit).map((log) => 
        (
          <div className="bug-row" key={log.id}>
            <div>{log.nickname}</div>
            <div className="log-content">{log.content}</div>
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
          <div className="article-container">
            <div className="bug-index-row">
              <div>닉네임</div>
              <div>제보</div>
              <div>작성자</div>
              <div>작성일자</div>
            </div>
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
        </>
      )}
    </div>
  )
};
