import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DateFormat from "../../../Utils/DateFormat";
import { DeleteComment, DeleteCommunity, UpdateCommunity } from "../../../api/AdminAPI";
import useGetObject from "../../../Hooks/useGetObject";
import useGetList from "../../../Hooks/useGetList";
import { CreateComment } from "../../../api/ArticleAPI";
import { FaCommentMedical } from "react-icons/fa";
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
    isNotice: true,
  });
  const [ comment, setComment ] = useState("");
  const navigate = useNavigate();

  // 게시글 및 댓글 호출
  const communityInfo = useGetObject(`/community/${communityId}`);
  const comments = useGetList(`/community/${communityId}/comment`);
  useEffect(() => {
    if (Object.keys(communityInfo).length) { setCommunity(communityInfo) }
  }, [communityInfo]);

  // 내용 변경
  function handleChange({target: {id, value}}) {
    const newCommunity = {
      ...community,
      [id]: value,
    };
    setCommunity(newCommunity);
  };

  // 공지사항 변경
  function handleChangeNotice({target: {id, checked}}) {
    const newCommunity = {
      ...community,
      [id]: checked,
    };
    setCommunity(newCommunity);
  };

  // 게시글 수정
  function handleSubmit(e) {
    e.preventDefault();
    UpdateCommunity(communityId, community.title, community.content, community.isNotice);
    navigate('/admin/community');
    setTimeout(() => {
      navigate(0);
    }, 100);
  };

  // 게시글 삭제
  async function handleClick(e) {
    e.preventDefault();
    DeleteCommunity(communityId);
    navigate('/admin/community');
    setTimeout(() => {
      navigate(0);
    }, 100);
  };

  // 댓글 작성
  function handleSubmitComment() {
    CreateComment(communityId, comment);
    setTimeout(() => {
      navigate(0);
    }, 100);
  };

  // Enter시 댓글 작성
  function handelEnterPress(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleSubmitComment();
    }
  };

  // 댓글 삭제
  function handleDeleteComment(e) {
    DeleteComment(communityId, e.target.value);
    setTimeout(() => {
      navigate(0);
    }, 100)
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
          id="isNotice"
          checked={community.isNotice}
          onChange={handleChangeNotice}
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
          console.log(comment)
          return (
            <div
              className="admin-comment"
              key={comment.id}
            >
              <div>{comment.username}</div>
              <div>{comment.content}</div>
              <div>{DateFormat(comment.createdDate)}</div>
              <button
                className="admin-comment-button"
                value={comment.id}
                onClick={handleDeleteComment}
              >
                삭제
              </button>
            </div>
          )
        })}
      </div>
      <div className="comment-input-container">
        <textarea
          className="comment-submit-textarea"
          rows={1}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyDown={handelEnterPress}
        />
        <div
          className="comment-submit-button"
          onClick={handleSubmitComment}
        >
          <FaCommentMedical />
        </div>
      </div>
    </div>
  )
};
