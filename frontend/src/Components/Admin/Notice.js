import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import DateFormat from "../../Utils/DateFormat";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import { FaEdit } from "react-icons/fa";
import "./css/Admin.css";
import NoticeCreate from "./NoticeCreate";
import useGet from "../../Hooks/useGet";

export function Notice() {
  const [ searchCategory, setSearchCategory ] = useState('title');
  const [ searchText, setSearchText ] = useState('');
  const [ noticeList, setNoticeList ] = useState([]);
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
  // const noticeList = useGet('/notice');
  useEffect(() => {
    setNoticeList([
      { id: 0, title: "공지1", content: "공지내용1", createdDate: "2022-04-19 16:10:00", updatedDate: "2022-04-20 15:30:30" },
      { id: 1, title: "공지2", content: "공지내용2", createdDate: "2022-04-18 15:31:00", updatedDate: "2022-04-20 11:30:00" },
      { id: 2, title: "공지3", content: "공지내용3", createdDate: "2022-04-17 15:30:00", updatedDate: "2022-04-18 15:30:30" },
      { id: 3, title: "공지4", content: "공지내용4", createdDate: "2022-04-16 15:30:00", updatedDate: "2022-04-17 15:30:30" },
      { id: 4, title: "공지5", content: "공지내용5", createdDate: "2022-04-15 15:30:00", updatedDate: "2022-04-16 15:30:30" },
      { id: 5, title: "공지6", content: "공지내용6", createdDate: "2022-04-14 15:30:00", updatedDate: "2022-04-15 15:30:30" },
      { id: 6, title: "공지7", content: "공지내용7", createdDate: "2022-04-13 15:30:00", updatedDate: "2022-04-14 15:30:30" },
      { id: 7, title: "공지8", content: "공지내용8", createdDate: "2022-04-12 15:30:00", updatedDate: "2022-04-13 15:30:30" },
      { id: 8, title: "공지9", content: "공지내용9", createdDate: "2022-04-11 15:30:00", updatedDate: "2022-04-12 15:30:30" },
      { id: 9, title: "공지10", content: "공지내용10", createdDate: "2022-04-10 15:30:00", updatedDate: "2022-04-11 15:30:30" },
      { id: 10, title: "공지11", content: "공지내용11", createdDate: "2022-04-09 15:30:00", updatedDate: "2022-04-10 15:30:30" },
      { id: 11, title: "공지12", content: "공지내용12", createdDate: "2022-04-08 15:30:00", updatedDate: "2022-04-09 15:30:30" },
      { id: 12, title: "공지13", content: "공지내용13", createdDate: "2022-04-07 15:30:00", updatedDate: "2022-04-08 15:30:30" },
      { id: 13, title: "공지14", content: "공지내용14", createdDate: "2022-04-14 15:30:00", updatedDate: "2022-04-15 15:30:30" },
      { id: 14, title: "공지15", content: "공지내용15", createdDate: "2022-04-13 15:30:00", updatedDate: "2022-04-14 15:30:30" },
      { id: 15, title: "공지16", content: "공지내용16", createdDate: "2022-04-12 15:30:00", updatedDate: "2022-04-13 15:30:30" },
      { id: 16, title: "공지17", content: "공지내용17", createdDate: "2022-04-11 15:30:00", updatedDate: "2022-04-12 15:30:30" },
      { id: 17, title: "공지18", content: "공지내용18", createdDate: "2022-04-10 15:30:00", updatedDate: "2022-04-11 15:30:30" },
      { id: 18, title: "공지19", content: "공지내용19", createdDate: "2022-04-09 15:30:00", updatedDate: "2022-04-10 15:30:30" },
      { id: 19, title: "공지20", content: "공지내용20", createdDate: "2022-04-08 15:30:00", updatedDate: "2022-04-09 15:30:30" },
      { id: 20, title: "공지21", content: "공지내용21", createdDate: "2022-04-07 15:30:00", updatedDate: "2022-04-08 15:30:30" },
      { id: 21, title: "공지22", content: "공지내용22", createdDate: "2022-04-14 15:30:00", updatedDate: "2022-04-15 15:30:30" },
      { id: 22, title: "공지23", content: "공지내용23", createdDate: "2022-04-13 15:30:00", updatedDate: "2022-04-14 15:30:30" },
      { id: 23, title: "공지24", content: "공지내용24", createdDate: "2022-04-12 15:30:00", updatedDate: "2022-04-13 15:30:30" },
      { id: 24, title: "공지25", content: "공지내용25", createdDate: "2022-04-11 15:30:00", updatedDate: "2022-04-12 15:30:30" },
      { id: 25, title: "공지26", content: "공지내용26", createdDate: "2022-04-10 15:30:00", updatedDate: "2022-04-11 15:30:30" },
      { id: 26, title: "공지27", content: "공지내용27", createdDate: "2022-04-09 15:30:00", updatedDate: "2022-04-10 15:30:30" },
      { id: 27, title: "공지28", content: "공지내용28", createdDate: "2022-04-08 15:30:00", updatedDate: "2022-04-09 15:30:30" },
      { id: 28, title: "공지29", content: "공지내용29", createdDate: "2022-04-07 15:30:00", updatedDate: "2022-04-08 15:30:30" },
    ]);
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
          <div className="admin-row" key={notice.id}>
            <div>{notice.id}</div>
            <div>{notice.title}</div>
            <div>{DateFormat(notice.createdDate)}</div>
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
      {createOpen && <NoticeCreate setCreateOpen={setCreateOpen}/>}
      <Outlet/>
      <div className="admin-container">
        <div className="admin-index-row">
          <div>#</div>
          <div>제목</div>
          <div>작성일자</div>
          <div>수정일자</div>
          <div>수정</div>
        </div>
        {Notices()}
        <div className="community-row">
          <div
            className="community-create"
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
    </div>
  )
};
