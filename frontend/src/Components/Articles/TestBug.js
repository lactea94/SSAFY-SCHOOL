import { useState } from "react";
import "./css/Articles.css"
import DateFormat from "./DateFormat";
import Pagination from "./Pagination";

export default function TestBug() {
  const logs = [
    { id: 0, userId: 1, content: "내용1", createDate: "2022-04-19 15:30:30" },
    { id: 1, userId: 7, content: "내용2", createDate: "2022-04-18 15:30:30" },
    { id: 2, userId: 4, content: "내용3", createDate: "2022-04-17 15:30:30" },
    { id: 3, userId: 2, content: "내용4", createDate: "2022-04-16 15:30:30" },
    { id: 4, userId: 11, content: "내용5", createDate: "2022-04-15 15:30:30" },
    { id: 5, userId: 9, content: "내용6", createDate: "2022-04-14 15:30:30" },
    { id: 6, userId: 7, content: "내용7", createDate: "2022-04-13 15:30:30" },
    { id: 7, userId: 6, content: "내용8", createDate: "2022-04-12 15:30:30" },
    { id: 8, userId: 4, content: "내용9", createDate: "2022-04-11 15:30:30" },
    { id: 9, userId: 5, content: "내용10", createDate: "2022-04-10 15:30:30" },
    { id: 10, userId: 2, content: "내용11", createDate: "2022-04-09 15:30:30" },
    { id: 11, userId: 3, content: "내용12", createDate: "2022-04-08 15:30:30" },
    { id: 12, userId: 1, content: "내용13", createDate: "2022-04-07 15:30:30" },
  ];

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  function Log() {
    return (
      logs.slice(offset, offset + limit).map((log) => 
        (
          <div className="article-row" key={log.id}>
            <div>{log.id}</div>
            <div>{log.content}</div>
            <div>{log.userId}</div>
            <div>{DateFormat(log.createDate)}</div>
          </div>
        )
      )
    )
  }

  return (
    <div>
      <div className="article-container">
        <div className="index-row">
          <div>#</div>
          <div>제보</div>
          <div>작성자</div>
          <div>작성일자</div>
        </div>
        {Log()}
      </div>
      <Pagination
        total={logs.length}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
      />
    </div>
  )
}
