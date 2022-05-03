import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import DateFormat from "../../Utils/DateFormat";
import Pagination from "../Pagination/Pagination";
import CommunityCreate from "./CommunityCreate";
import Search from "../Search/Search";
import "./css/Articles.css";

export default function Community() {
  const [ isAuthenticated, setIsAuthenticated] = useState(false);
  const [ searchCategory, setSearchCategory ] = useState('title');
  const [ searchText, setSearchText ] = useState('');
  const [ noticeList, setNoticeList ] = useState([]);
  const [ communityList, setCommunityList ] = useState([]);
  const [ filteredCommunityList, setFilteredCommunityList ] = useState([]);
  const [ createOpen, setCreateOpen ] = useState(false);
  const [ limit, setLimit ] = useState(10);
  const [ page, setPage ] = useState(1);
  const offset = (page - 1) * limit;
  const categories = [
    { value: 'title', name: '제목'},
    { value: 'content', name: '내용'},
  ];
  
  // 로그인 사용자 확인
  useEffect(() => {
    if (localStorage.getItem('accesstoken'))
      setIsAuthenticated(true)
  }, []);

  // 공지사항 및 게시글 정보 호출
  useEffect(() => {
    setNoticeList([
      { id: 0, title: "공지게시글1", content: "내용1", createdDate: "2022-04-19 16:10:00", updatedDate: "2022-04-20 15:30:30" },
      { id: 1, title: "공지게시글2", content: "내용2", createdDate: "2022-04-18 15:31:00", updatedDate: "2022-04-20 11:30:00" },
      { id: 2, title: "공지게시글3", content: "내용3", createdDate: "2022-04-17 15:30:00", updatedDate: "2022-04-18 15:30:30" },
    ]);
    setCommunityList([
      { id: 0, userId: 0, title: "게시글1", content: "내용1", createdDate: "2022-04-19 16:10:00", updatedDate: "2022-04-20 15:30:30" },
      { id: 1, userId: 1, title: "게시글2", content: "내용2", createdDate: "2022-04-18 15:31:00", updatedDate: "2022-04-20 11:30:00" },
      { id: 2, userId: 3, title: "게시글3", content: "내용3", createdDate: "2022-04-17 15:30:00", updatedDate: "2022-04-18 15:30:30" },
      { id: 3, userId: 2, title: "게시글4", content: "내용4", createdDate: "2022-04-16 15:30:00", updatedDate: "2022-04-17 15:30:30" },
      { id: 4, userId: 0, title: "게시글5", content: "내용5", createdDate: "2022-04-15 15:30:00", updatedDate: "2022-04-16 15:30:30" },
      { id: 5, userId: 1, title: "게시글6", content: "내용6", createdDate: "2022-04-14 15:30:00", updatedDate: "2022-04-15 15:30:30" },
      { id: 6, userId: 4, title: "게시글7", content: "내용7", createdDate: "2022-04-13 15:30:00", updatedDate: "2022-04-14 15:30:30" },
      { id: 7, userId: 5, title: "게시글8", content: "내용8", createdDate: "2022-04-12 15:30:00", updatedDate: "2022-04-13 15:30:30" },
      { id: 8, userId: 1, title: "게시글9", content: "내용9", createdDate: "2022-04-11 15:30:00", updatedDate: "2022-04-12 15:30:30" },
      { id: 9, userId: 3, title: "게시글10", content: "내용10", createdDate: "2022-04-10 15:30:00", updatedDate: "2022-04-11 15:30:30" },
    ]);
  }, []);

  // 검색 필터링
  useEffect(() => {
    if (searchCategory === 'title') {
      setFilteredCommunityList(() => 
        communityList.filter((community) => 
          community.title.toLowerCase().includes(searchText.toLowerCase())
    ))} else if (searchCategory === 'content') {
      setFilteredCommunityList(() => 
        communityList.filter((community) => 
          community.content.toLowerCase().includes(searchText.toLowerCase())
    ))}
  }, [searchCategory, searchText, communityList]);

  // 공지사항
  function Notices() {
    return (
      noticeList.map((notice) => (
        <div className="notice-row" key={notice.id}>
          <div>공지</div>
          <div>
            <Link
              className="article-link"
              to={`${notice.id}`}
              state={{
                userId: notice.uesrId,
                title: notice.title,
                content: notice.content,
                createdDate: notice.createdDate,
                updatedDate: notice.updatedDate
              }}
            >
              {notice.title}
            </Link>
          </div>
          <div>{DateFormat(notice.createdDate)}</div>
          <div>{DateFormat(notice.updatedDate)}</div>
        </div>
    )))
  };

function Communities() {
  return (
    filteredCommunityList.slice(offset, offset + limit).map((community) => (
      <div className="article-row" key={community.id}>
        <div>{community.userId}</div>
        <div>
          <Link
            className="article-link"
            to={`${community.id}`}
          >
            {community.title}
          </Link>
        </div>
        <div>{DateFormat(community.createdDate)}</div>
        <div>{DateFormat(community.updatedDate)}</div>
      </div>
    )))
  };

  return (
    <div>
      {createOpen && <CommunityCreate setCreateOpen={setCreateOpen}/>}
      <Outlet/>
      <div className="article-container">
        <div className="index-row">
          <div>작성자</div>
          <div>제목</div>
          <div>작성일자</div>
          <div>수정일자</div>
        </div>
        {Notices()}
        {Communities()}
        { isAuthenticated && 
          <div className="community-row">
            <div
              className="community-create"
              onClick={() => {
                setCreateOpen(true);
                window.scrollTo(0, 0);
              }}
            >
              새 글 작성
            </div>
          </div>
        }
      </div>
      <Pagination
        total={filteredCommunityList.length}
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
