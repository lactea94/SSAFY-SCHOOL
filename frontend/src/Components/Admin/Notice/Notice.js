import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import DateFormat from "../../../Utils/DateFormat";
import Pagination from "../../Pagination/Pagination";
import Search from "../../Search/Search";
import NoticeCreate from "./NoticeCreate";
import useGetList from "../../../Hooks/useGetList";
import { FaEdit } from "react-icons/fa";
import "./css/Notice.css";
import Loading from "../../Loading/Loading";

export function Notice() {
  const [ loading, setLoading ] = useState(true);
  const [ searchCategory, setSearchCategory ] = useState('title');
  const [ searchText, setSearchText ] = useState('');
  const [ filteredNoticeList, setFilterdNoticeList ] = useState([]);
  const [ createOpen, setCreateOpen ] = useState(false);
  const [ limit, setLimit ] = useState(10);
  const [ page, setPage ] = useState(1);
  const navigate = useNavigate();
  const offset = (page - 1) * limit;
  const categories = [
    { value: 'title', name: '제목'},
    { value: 'content', name: '내용'},
  ]

  if (!localStorage.getItem('accesstoken') || !localStorage.getItem('admin')) {
    navigate('/');
  };

  // 공시사항 목록 호출
  const noticeList = useGetList('/notice');

  // 로딩
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // 검색 필터링
  useEffect(() => {
    if (searchCategory === 'title') {
      setFilterdNoticeList(() => 
        noticeList.filter((notice) => 
          notice.title.toLowerCase().includes(searchText.toLowerCase())
    ))} else if (searchCategory === 'content') {
      setFilterdNoticeList(() => 
        noticeList.filter((notice) => 
          notice.content.toLowerCase().includes(searchText.toLowerCase())
    ))}
  }, [searchCategory, searchText, noticeList]);

  // 공지사항
  function Notices() {
    return (
      filteredNoticeList.slice(offset, offset + limit).map((notice) => 
        (
          <div className="admin-notice-row" key={notice.id}>
            <div>{notice.id}</div>
            <div style={{textAlign: "start", fontWeight: "bold"}}>{notice.title}</div>
            <div>{DateFormat(notice.updatedDate)}</div>
            <Link
              to={`${notice.id}`}
              className="admin-update-button"
            >
              <FaEdit/>
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
          {createOpen && <NoticeCreate setCreateOpen={setCreateOpen}/>}
          <Outlet/>
          <div className="admin-container">
            <div className="admin-notice-index-row">
              <div>#</div>
              <div>제목</div>
              <div>수정일</div>
              <div>수정</div>
            </div>
            {Notices()}
            <div className="community-row">
              <div
                className="admin-notice-create "
                onClick={() => {
                  setCreateOpen(true);
                  window.scrollTo(0, 0);
                }}
              >
                공지사항 작성
              </div>
            </div>
          </div>
          <Pagination
            total={filteredNoticeList.length}
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
