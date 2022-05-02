import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DateFormat from "../../Utils/DateFormat";
import "./css/EditNotice.css";

export default function EditNotice() {
  const { noticeId } = useParams();
  const [ notice, setNotice ] = useState({
    id: "",
    userId: "",
    title: "",
    content: "",
    createdDate: "",
    updatedDate: "",
  }); 

  useEffect(() => {
    setNotice({
      id: noticeId,
      userId: 0,
      title: `제목${noticeId}`,
      content: `내용${noticeId}`,
      createdDate: "2022-04-19 16:10:00",
      updatedDate: "2022-04-20 15:30:30",
    });
  }, [noticeId]);

  return (
    <div className="admin-notice-container">
      <div className="admin-notice-title">{notice.title}</div>
      <div className="admin-notice-date">
        <div className="admin-notice-created">{DateFormat(notice.createdDate)}</div>
        <div className="admin-notice-updated">{DateFormat(notice.updatedDate)}</div>
      </div>
      <div className="admin-notice-content">{notice.content}</div>
    </div>
  )
};
