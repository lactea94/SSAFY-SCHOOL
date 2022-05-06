import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DateFormat from "../../../Utils/DateFormat";
import "./css/NoticeDetail.css";

export default function NoticeDetail () {
  const { noticeId } = useParams();
  const [ notice, setNotice ] = useState({
    title: "",
    content: "",
    createdDate: "",
    updatedDate: "",
  });

  // 공지사항 정보 호출
  // const notice = useGetObject(`/notice/${noticeId}`)

  useEffect(() => {
    setNotice({
      title: `공지${noticeId}`,
      content: `공지내용${noticeId}`,
      createdDate: "2022-04-19 16:10:00",
      updatedDate: "2022-04-20 15:30:30",
    })
  }, [noticeId])

  return (
    <div className="notice-container">
      <div className="notice-title">{notice.title}</div>
      <div className="notice-date">
        <div className="notice-created">{DateFormat(notice.createdDate)}</div>
        <div className="notice-updated">{DateFormat(notice.updatedDate)}</div>
      </div>
      <div className="notice-content">{notice.content}</div>
    </div>
  )
};
