import { useState } from "react";
import { useLocation } from "react-router-dom";
import DateFormat from "../../Utils/DateFormat";
import CommunityUpdate from "./CommunityUpdate";
import "./css/CommunityDetail.css"

export default function CommunityDetail() {
  const { state } = useLocation();
  const [ updateOpen, setUpdateOpen ] = useState(false);
  const user = {
    id: 0,
  }

  const comments = [
    { id: 0, userId: 0, content: "댓글1", createdDate: "2022-04-19 16:10:00", updatedDate: "2022-04-20 15:30:30" },
    { id: 1, userId: 1, content: "댓글2", createdDate: "2022-04-18 15:31:00", updatedDate: "2022-04-20 11:30:00" },
    { id: 2, userId: 3, content: "댓글3", createdDate: "2022-04-17 15:30:00", updatedDate: "2022-04-18 15:30:30" },
    { id: 3, userId: 2, content: "댓글4", createdDate: "2022-04-16 15:30:00", updatedDate: "2022-04-17 15:30:30" },
    { id: 4, userId: 1, content: "댓글5", createdDate: "2022-04-15 15:30:00", updatedDate: "2022-04-16 15:30:30" },
  ]

  return (
    <div className="community-container">
      {updateOpen &&
        <CommunityUpdate 
          title={state.title}
          content={state.content}
          setUpdateOpen={setUpdateOpen}
      />}
      <div className="community-title">{state.title}</div>
      <div className="community-date">
        <div className="community-created">{DateFormat(state.createdDate)}</div>
        <div className="community-updated">{DateFormat(state.updatedDate)}</div>
      </div>
      <div className="community-content">{state.content}</div>
      {user.id === state.userId &&
        <div className="community-update">
          <div
            className="community-update-button"
            onClick={() => setUpdateOpen(true)}
          >수정</div>
          <div className="community-delete-button">삭제</div>
        </div>
      }
      <div className="comments-container">
        <div className="comments-header">
          댓글 {comments.length}
        </div>
        {comments.map((comment) => {
          return (
            <div
              className="comment"
              key={comment.id}
            >
              <div>{comment.userId}</div>
              <div>{comment.content}</div>
              <div>{DateFormat(comment.createdDate)}</div>
              <div>{DateFormat(comment.updatedDate)}</div>
              { user.id === comment.userId ? (
                <div className="comment-button">삭제</div>
              ) : (<div></div>)}
            </div>
          )
        })}
      </div>
    </div>
  )
};
