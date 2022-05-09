import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import DateFormat from "../../../Utils/DateFormat";
import Pagination from "../../Pagination/Pagination";
import Search from "../../Search/Search";
import { FaEdit } from 'react-icons/fa';
import CommunityCreate from "./CommunityCreate";
import useGetList from "../../../Hooks/useGetList";
import "./css/Community.css";
import Loading from "../../Loading/Loading";

export function Community() {
  const [ loading, setLoading ] = useState(true);
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
    { value: 'name', name: '작성자'},
    { value: 'nickname', name: '닉네임'},
  ];
  const navigate = useNavigate();
  
  if (!localStorage.getItem('accesstoken') || !localStorage.getItem('admin')) {
    navigate('/');
  };

  // 게시글 목록 호출
  const noticeList = useGetList('/community/notice');
  const communityList = useGetList('/community');

  // 로딩
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
    ))} else if (searchCategory === 'name') {
      setFilteredCommunityList(() => 
        communityList.filter((community) => 
          community.name.toLowerCase().includes(searchText.toLowerCase())
    ))} else if (searchCategory === 'nickname') {
      setFilteredCommunityList(() => 
        communityList.filter((community) => 
          community.nickname.toLowerCase().includes(searchText.toLowerCase())
    ))}
  }, [searchCategory, searchText, communityList]);

  // 공지사항
  function Notices() {
    return (
      noticeList.map((notice) => (
        <div className="admin-community-notice-row" key={notice.id}>
          <div>공지</div>
          <div style={{textAlign: "start"}}>{notice.title}</div>
          <div>{notice.name}</div>
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
          <div>{community.nickname}</div>
          <div style={{textAlign: "start", fontWeight: "bold"}}>{community.title}</div>
          <div>{community.name}</div>
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
      { loading ? (
        <Loading />
      ) : (
        <>
          {createOpen && <CommunityCreate setCreateOpen={setCreateOpen}/>}
          <Outlet/>
          <div className="admin-container">
            <div className="admin-index-row">
              <div>#</div>
              <div>제목</div>
              <div>작성자</div>
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
        </>
      )}
    </div>
  )
};
