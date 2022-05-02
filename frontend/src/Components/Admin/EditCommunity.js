import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DateFormat from "../../Utils/DateFormat";
import "./css/EditCommunity.css";

export default function EditCommunity() {
  const { communityId } = useParams();
  const [ community, setCommunity ] = useState({
    id: "",
    userId: "",
    title: "",
    content: "",
    createdDate: "",
    updatedDate: "",
    isAdmin: "",
  });
  const [ comments, setComments ] = useState([]);

  // 게시글 및 댓글 호출
  useEffect(() => {
    setCommunity({
      id: communityId,
      userId: 0,
      title: `게시글${communityId}`,
      content: `내용${communityId}`,
      createdDate: "2022-04-19 16:10:00",
      updatedDate: "2022-04-20 15:30:30",
      isAdmin: true,
    });
    setComments([
      { id: 0, userId: 0, content: "댓글1", createdDate: "2022-04-19 16:10:00", updatedDate: "2022-04-20 15:30:30" },
      { id: 1, userId: 1, content: "댓글2", createdDate: "2022-04-18 15:31:00", updatedDate: "2022-04-20 11:30:00" },
      { id: 2, userId: 3, content: "댓글3", createdDate: "2022-04-17 15:30:00", updatedDate: "2022-04-18 15:30:30" },
      { id: 3, userId: 2, content: "댓글4", createdDate: "2022-04-16 15:30:00", updatedDate: "2022-04-17 15:30:30" },
      { id: 4, userId: 1, content: "댓글5", createdDate: "2022-04-15 15:30:00", updatedDate: "2022-04-16 15:30:30" },  
    ]);
  }, [communityId])

  // 내용 변경
  function handleChange({target: {id, value}}) {
    const newCommunity = {
      ...community,
      [id]: value,
    };
    setCommunity(newCommunity);
  };

  // 공지사항 변경
  function hanldeChangeAdmin({target: {id, checked}}) {
    const newCommunity = {
      ...community,
      [id]: checked,
    };
    setCommunity(newCommunity);
  };

  // 게시글 수정
  function handleSubmit() {
    console.log(community);
  };

  // 게시글 삭제
  function handleClick() {

  };

  // 댓글 삭제
  function handleClickComment() {

  };

  return (
    <div className="admin-community-container">
      <input
        className="admin-community-title"
        id="title"
        value={community.title}
        onChange={handleChange}
      />
      <div className="is-admin">
        <label
          className="is-admin-label"
        >
          공지사항
        </label>
        <input
          className="is-admin-toggle"
          type="checkbox"
          id="isAdmin"
          checked={community.isAdmin}
          onChange={hanldeChangeAdmin}
        />
      </div>
      <div className="admin-community-date">
        <div className="admin-community-created">{DateFormat(community.createdDate)}</div>
        <div className="admin-community-updated">{DateFormat(community.updatedDate)}</div>
      </div>
      <textarea
        className="admin-community-content"
        id="content"
        value={community.content}
        onChange={handleChange}
        rows={20}
      />
      <div className="community-update">
        <div
          className="admin-community-update-button"
          onClick={handleSubmit}
        >
          수정
        </div>
        <div
          className="admin-community-delete-button"
          onClick={handleClick}
        >
          삭제
        </div>
      </div>
      <div className="admin-comments-container">
        <div className="admin-comments-header">
          댓글 {comments.length}
        </div>
        {comments.map((comment) => {
          return (
            <div
              className="admin-comment"
              key={comment.id}
            >
              <div>{comment.userId}</div>
              <div>{comment.content}</div>
              <div>{DateFormat(comment.createdDate)}</div>
              <div>{DateFormat(comment.updatedDate)}</div>
              <div
                className="admin-comment-button"
                onClick={handleClickComment}
              >
                삭제
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
};
