import { useLocation } from "react-router-dom";
import DateFormat from "../../Utils/DateFormat";

export default function CommunityDetail() {
  const { state } = useLocation();
  const comments = [
    { id: 0, content: "댓글1", createdDate: "2022-04-19 16:10:00", updatedDate: "2022-04-20 15:30:30" },
    { id: 1, content: "댓글2", createdDate: "2022-04-18 15:31:00", updatedDate: "2022-04-20 11:30:00" },
    { id: 2, content: "댓글3", createdDate: "2022-04-17 15:30:00", updatedDate: "2022-04-18 15:30:30" },
    { id: 3, content: "댓글4", createdDate: "2022-04-16 15:30:00", updatedDate: "2022-04-17 15:30:30" },
    { id: 4, content: "댓글5", createdDate: "2022-04-15 15:30:00", updatedDate: "2022-04-16 15:30:30" },
  ]

  function Comments() {
    return (
      comments.map((comment) => {
        return(
          <div
            key={comment.id}
          >
            {comment.content}
          </div>
        )
      })
    )
  }

  return (
    <div className="notice-container">
      <div className="notice-title">{state.title}</div>
      <div className="notice-date">
        <div className="notice-created">{DateFormat(state.createdDate)}</div>
        <div className="notice-updated">{DateFormat(state.updatedDate)}</div>
      </div>
      <div className="notice-content">{state.content}</div>
      <div className="comments-container">
        {Comments()}
      </div>
    </div>
  )
};
