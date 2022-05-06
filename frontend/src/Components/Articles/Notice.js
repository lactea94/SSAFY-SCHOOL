import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import DateFormat from "../../Utils/DateFormat";
import Pagination from "../Pagination/Pagination";
import Search from "../Search/Search";
import useGetList from "../../Hooks/useGetList";
import "./css/Articles.css";
import { apiInstance } from "../../api";

export default function Notice() {
  const [ searchCategory, setSearchCategory ] = useState('title');
  const [ searchText, setSearchText ] = useState('');
  const [ filteredNoticeList, setFilterdNoticeList ] = useState([]);
  const [ limit, setLimit ] = useState(10);
  const [ page, setPage ] = useState(1);
  const offset = (page - 1) * limit;
  const categories = [
    { value: 'title', name: '제목'},
    { value: 'content', name: '내용'},
  ];

  // 공지사항 정보 호출
  const noticeList = useGetList('/notice');

  useEffect(() => {
    async function test() {
      const res = await apiInstance().get('/notice');
      console.log(res.data);
    }
    test();
  }, [])

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
          <div className="article-row" key={notice.id}>
            <div>{notice.id}</div>
            <div>
              <Link
                className="article-link"
                to={`${notice.id}`}
              >
                {notice.title}
              </Link>
            </div>
            <div>{DateFormat(notice.createdDate)}</div>
            <div>{DateFormat(notice.updatedDate)}</div>
          </div>
        )
      )
    )
  };

  return (
    <div>
      <Outlet/>
      <div className="article-container">
        <div className="index-row">
          <div>#</div>
          <div>제목</div>
          <div>작성일자</div>
          <div>수정일자</div>
        </div>
        {Notices()}
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
