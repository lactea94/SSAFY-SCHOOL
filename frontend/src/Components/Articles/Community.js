import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import DateFormat from "../../Utils/DateFormat";
import Pagination from "../Pagination/Pagination";
import CommunityCreate from "./CommunityCreate";
import Search from "../Search/Search";
import "./css/Articles.css";
import { apiInstance } from "../../api";

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

  // 공지사항 호출 함수
  async function saveNotice() {
    const res = await apiInstance().get('/community/notice')
    setNoticeList(res.data)
  };
  
  // 게시글 호출 함수
  async function saveCommunity() {
    const res = await apiInstance().get('/community')
    setCommunityList(res.data)
  };

  // 공지사항 및 게시글 정보 호출
  useEffect(() => {
    saveNotice();
    saveCommunity();
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
            >
              {notice.title}
            </Link>
          </div>
          <div>{notice.name}</div>
          <div>{DateFormat(notice.updatedDate)}</div>
        </div>
    )))
  };

function Communities() {
  return (
    filteredCommunityList.slice(offset, offset + limit).map((community) => (
      <div className="article-row" key={community.id}>
        <div>{community.nickname}</div>
        <div>
          <Link
            className="article-link"
            to={`${community.id}`}
          >
            {community.title}
          </Link>
        </div>
        <div>{community.name}</div>
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
          <div>#</div>
          <div>제목</div>
          <div>작성자</div>
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
