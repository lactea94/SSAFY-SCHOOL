import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/Articles.css";
import DateFormat from "../../Utils/DateFormat";
import Pagination from "./Pagination";

export default function Notice() {
  const notices = [
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
  ];

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  function Notice() {
    return (
      notices.slice(offset, offset + limit).map((notice) => 
        (
          <div className="article-row" key={notice.id}>
            <div>{notice.id}</div>
            <div>
              <Link
                className="notice-link"
                to={`${notice.id}`}
                state={{
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
        )
      )
    )
  };

  return (
    <div>
      <div className="article-container">
        <div className="index-row">
          <div>#</div>
          <div>제목</div>
          <div>작성일자</div>
          <div>수정일자</div>
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
    </div>
  )
};
