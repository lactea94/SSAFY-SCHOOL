import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./css/Articles.css";
import DateFormat from "../../Utils/DateFormat";
import Pagination from "./Pagination";

export default function Community() {
  const communities = [
    { id: 0, title: "게시글1", content: "내용1", createdDate: "2022-04-19 16:10:00", updatedDate: "2022-04-20 15:30:30" },
    { id: 1, title: "게시글2", content: "내용2", createdDate: "2022-04-18 15:31:00", updatedDate: "2022-04-20 11:30:00" },
    { id: 2, title: "게시글3", content: "내용3", createdDate: "2022-04-17 15:30:00", updatedDate: "2022-04-18 15:30:30" },
    { id: 3, title: "게시글4", content: "내용4", createdDate: "2022-04-16 15:30:00", updatedDate: "2022-04-17 15:30:30" },
    { id: 4, title: "게시글5", content: "내용5", createdDate: "2022-04-15 15:30:00", updatedDate: "2022-04-16 15:30:30" },
    { id: 5, title: "게시글6", content: "내용6", createdDate: "2022-04-14 15:30:00", updatedDate: "2022-04-15 15:30:30" },
    { id: 6, title: "게시글7", content: "내용7", createdDate: "2022-04-13 15:30:00", updatedDate: "2022-04-14 15:30:30" },
    { id: 7, title: "게시글8", content: "내용8", createdDate: "2022-04-12 15:30:00", updatedDate: "2022-04-13 15:30:30" },
    { id: 8, title: "게시글9", content: "내용9", createdDate: "2022-04-11 15:30:00", updatedDate: "2022-04-12 15:30:30" },
    { id: 9, title: "게시글10", content: "내용10", createdDate: "2022-04-10 15:30:00", updatedDate: "2022-04-11 15:30:30" },
  ];
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  function community() {
    return (
      communities.slice(offset, offset + limit).map((community) => 
        (
          <div className="article-row" key={community.id}>
            <div>{community.id}</div>
            <div>
              <Link
                className="article-link"
                to={`${community.id}`}
                state={{
                  title: community.title,
                  content: community.content,
                  createdDate: community.createdDate,
                  updatedDate: community.updatedDate
                }}
              >
                {community.title}
              </Link>
            </div>
            <div>{DateFormat(community.createdDate)}</div>
            <div>{DateFormat(community.updatedDate)}</div>
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
      {community()}
    </div>
    <Pagination
      total={communities.length}
      limit={limit}
      page={page}
      setPage={setPage}
      setLimit={setLimit}
    />
  </div>
  )
};
