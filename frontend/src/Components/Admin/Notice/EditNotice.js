import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetObject from "../../../Hooks/useGetObject";
import DateFormat from "../../../Utils/DateFormat";
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

  // 공시사항 호출
  // const noticeInfo = useGetObject(`/notice/${noticeId}`)

  useEffect(() => {
    // setNotice(noticeInfo)
    setNotice({
      id: noticeId,
      userId: 0,
      title: `제목${noticeId}`,
      content: `내용${noticeId}`,
      createdDate: "2022-04-19 16:10:00",
      updatedDate: "2022-04-20 15:30:30",
    });
  }, [noticeId]);

  // 내용 변경
  function handleChange({target: {id, value}}) {
    const newNotice = {
      ...notice,
      [id]: value,
    };
    setNotice(newNotice);
  };

  // 공지사항 수정
  function handleSubmit() {
    console.log(notice)
  }

  // 공지사항 삭제
  function handleClick() {

  }

  return (
    <div className="admin-notice-container">
      <input
        className="admin-notice-title"
        id="title"
        value={notice.title}
        onChange={handleChange}
      />
      <div className="admin-notice-date">
        <div className="admin-notice-created">{DateFormat(notice.createdDate)}</div>
        <div className="admin-notice-updated">{DateFormat(notice.updatedDate)}</div>
      </div>
      <textarea
        className="admin-notice-content"
        id="content"
        value={notice.content}
        onChange={handleChange}
        rows={20}
      />
      <div className="admin-notice-update">
        <div
          className="admin-notice-update-button"
          onClick={handleSubmit}
        >
          수정
        </div>
        <div 
          className="admin-notice-delete-button"
          onClick={handleClick}
        >
          삭제
        </div>
      </div>
    </div>
  )
};
