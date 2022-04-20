import { useState } from "react";
import "./css/Notice.css"
import Pagination from "./Pagination";

export default function Notice() {
  const notices = [
    { id: 0, title: "공지1", content: "공지내용1", createDate: "2022-04-19 15:30:30", updatedDate: "2022-04-20 15:30:30" },
    { id: 1, title: "공지2", content: "공지내용2", createDate: "2022-04-18 15:30:30", updatedDate: "2022-04-19 15:30:30" },
    { id: 2, title: "공지3", content: "공지내용3", createDate: "2022-04-17 15:30:30", updatedDate: "2022-04-18 15:30:30" },
    { id: 3, title: "공지4", content: "공지내용4", createDate: "2022-04-16 15:30:30", updatedDate: "2022-04-17 15:30:30" },
    { id: 4, title: "공지5", content: "공지내용5", createDate: "2022-04-15 15:30:30", updatedDate: "2022-04-16 15:30:30" },
    { id: 5, title: "공지6", content: "공지내용6", createDate: "2022-04-14 15:30:30", updatedDate: "2022-04-15 15:30:30" },
    { id: 6, title: "공지7", content: "공지내용7", createDate: "2022-04-13 15:30:30", updatedDate: "2022-04-14 15:30:30" },
    { id: 7, title: "공지8", content: "공지내용8", createDate: "2022-04-12 15:30:30", updatedDate: "2022-04-13 15:30:30" },
    { id: 8, title: "공지9", content: "공지내용9", createDate: "2022-04-11 15:30:30", updatedDate: "2022-04-12 15:30:30" },
    { id: 9, title: "공지10", content: "공지내용10", createDate: "2022-04-10 15:30:30", updatedDate: "2022-04-11 15:30:30" },
    { id: 10, title: "공지11", content: "공지내용11", createDate: "2022-04-09 15:30:30", updatedDate: "2022-04-10 15:30:30" },
    { id: 11, title: "공지12", content: "공지내용12", createDate: "2022-04-08 15:30:30", updatedDate: "2022-04-09 15:30:30" },
    { id: 12, title: "공지13", content: "공지내용13", createDate: "2022-04-07 15:30:30", updatedDate: "2022-04-08 15:30:30" },
  ];

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  function Notice() {
    return (
      notices.slice(offset, offset + limit).map((notice) => 
        (
          <div className="row">
            <div className="notice-id">{notice.id}</div>
            <div className="notice-title">{notice.title}</div>
            <div className="notice-created">{notice.createDate}</div>
            <div className="notice-updated">{notice.updatedDate}</div>
          </div>
        )
      )
    )
  }

  return (
    <>
      <h2>공지 사항</h2>
      <div className="container">
        <div className="row">
          <div className="notice-id">#</div>
          <div className="notice-title">제목</div>
          <div className="notice-created">작성일자</div>
          <div className="notice-updated">수정일자</div>
        </div>
        {Notice()}
      </div>
      <Pagination
        total={notices.length}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
      />
    </>
  )
}
