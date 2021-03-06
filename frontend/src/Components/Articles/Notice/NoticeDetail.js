import { useParams } from "react-router-dom";
import useGetObject from "../../../Hooks/useGetObject";
import DateFormat from "../../../Utils/DateFormat";
import "./css/NoticeDetail.css";

export default function NoticeDetail () {
  const { noticeId } = useParams();

  // 공지사항 정보 호출
  const notice = useGetObject(`/notice/${noticeId}`)

  return (
    <div className="notice-container">
      <div className="notice-title">{notice.title}</div>
      <div className="notice-date">
        <div className="notice-created">{DateFormat(notice.createdDate || "")}</div>
        <div className="notice-updated">{DateFormat(notice.updatedDate || "")}</div>
      </div>
      <div className="notice-content">{notice.content}</div>
    </div>
  )
};
