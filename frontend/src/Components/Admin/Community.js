import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import DateFormat from "../../Utils/DateFormat";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import { FaEdit } from 'react-icons/fa';
import "./css/Admin.css";
import CommunityCreate from "./CommunityCreate";
import useGet from "../../Hooks/useGet";

export function Community() {
  const [ searchCategory, setSearchCategory ] = useState('title');
  const [ searchText, setSearchText ] = useState('');
  const [ filteredCommunityList, setFilteredCommunityList ] = useState([]);
  const [ createOpen, setCreateOpen ] = useState(false);
  const [ limit, setLimit ] = useState(10);
  const [ page, setPage ] = useState(1);
  const offset = (page - 1) * limit;
  const categories = [
    { value: 'title', name: '제목'},
    { value: 'content', name: '내용'},
  ];
  const navigate = useNavigate();
  
  if (!localStorage.getItem('accesstoken') || !localStorage.getItem('admin')) {
    navigate('/');
  };

  // 게시글 목록 호출
  const noticeList = useGet('/community/notice');
  const communityList = useGet('/community');

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
        <div className="admin-notice-row" key={notice.id}>
          <div>공지</div>
          <div>{notice.title}</div>
          <div>{DateFormat(notice.createdDate)}</div>
          <div>{DateFormat(notice.updatedDate)}</div>
          <Link
            className="admin-update-button"
            to={`${notice.id}`}
          >
            <FaEdit/>
          </Link>
        </div>
    )))
  };

  // 게시글
  function Communities() {
    return (
      filteredCommunityList.slice(offset, offset + limit).map((community) => (
        <div className="admin-row" key={community.id}>
          <div>{community.userId}</div>
          <div>{community.title}</div>
          <div>{DateFormat(community.createdDate)}</div>
          <div>{DateFormat(community.updatedDate)}</div>
          <Link
            className="admin-update-button"
            to={`${community.id}`}
          >
            <FaEdit/>
          </Link>
        </div>
    )))
  };

  return (
    <div>
      {createOpen && <CommunityCreate setCreateOpen={setCreateOpen}/>}
      <Outlet/>
      <div className="admin-container">
        <div className="admin-index-row">
          <div>작성자</div>
          <div>제목</div>
          <div>작성일자</div>
          <div>수정일자</div>
          <div>수정</div>
        </div>
        {Notices()}
        {Communities()}
        <div className="community-row">
          <div
            className="community-create"
            onClick={() => {
              setCreateOpen(true);
              window.scrollTo(0, 0);
            }}
          >
            게시글 작성
          </div>
        </div>
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
