import { useLocation } from "react-router-dom";
import DateFormat from "../Utils/DateFormat";
import "./NoticeDetail.css";

export default function NoticeDetail () {
  const { state } = useLocation();
  return (
    <div className="notice-container">
      <div className="notice-title">{state.title}</div>
      <div className="notice-date">
        <div className="notice-created">{DateFormat(state.createdDate)}</div>
        <div className="notice-updated">{DateFormat(state.updatedDate)}</div>
      </div>
      <div className="notice-content">{state.content}</div>
    </div>
  )
};
