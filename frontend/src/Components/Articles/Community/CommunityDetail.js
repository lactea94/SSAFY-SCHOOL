import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DateFormat from "../../../Utils/DateFormat";
import CommunityUpdate from "./CommunityUpdate";
import useAuthGetObject from "../../../Hooks/useAuthGetObject";
import useGetList from "../../../Hooks/useGetList";
import { CreateComment, DeleteComment, DeleteCommunity } from "../../../api/ArticleAPI";
import { FaCommentMedical } from "react-icons/fa";
import "./css/CommunityDetail.css"

export default function CommunityDetail() {
  const [ isAuthenticated, setIsAuthenticated] = useState(false);
  const { communityId } = useParams();
  const [ updateOpen, setUpdateOpen ] = useState(false);
  const [ userId, setUserId ] = useState();
  const [ community, setCommunity ] = useState({
    id: "",
    userId: "",
    title: "",
    content: "",
    createdDate: "",
    updatedDate: "",
    isNotice: false,
  });
  const [ comment, setComment ] = useState("");
  const navigate = useNavigate();

  // 로그인 사용자 확인
  useEffect(() => {
    if (localStorage.getItem('accesstoken'))
      setIsAuthenticated(true)
  }, []);

  // 유저 정보 호출
  const user = useAuthGetObject('/users/me');
  
  // 게시글 정보 호출
  const communityInfo = useAuthGetObject(`/community/${communityId}`);
  const comments = useGetList(`/community/${communityId}/comment`);

  // 유저Id, 게시글, 댓글정보 저장
  useEffect(() => {
    if (user.id) { setUserId(user.id) }
    if (Object.keys(communityInfo).length) { setCommunity(communityInfo) }
  }, [user, communityInfo]);

  // 게시글 삭제
  async function handleClick(e) {
    e.preventDefault();
    DeleteCommunity(communityId);
    navigate('/articles/community');
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
  async function handleDeleteComment(e) {
    DeleteComment(communityId, e.target.value);
    setTimeout(() => {
      navigate(0);
    }, 100)
  };

  return (
    <div className="community-container">
      {updateOpen &&
        <CommunityUpdate 
          title={community.title}
          content={community.content}
          setUpdateOpen={setUpdateOpen}
      />}
      <div className="community-title">{community.title}</div>
      <div className="community-date">
        <div className="community-created">{DateFormat(community.createdDate)}</div>
        <div className="community-updated">{DateFormat(community.updatedDate)}</div>
      </div>
      <div className="community-content">{community.content}</div>
      {userId === community.userId &&
        <div className="community-update">
          <div
            className="community-update-button"
            onClick={() => setUpdateOpen(true)}
          >
            수정
          </div>
          <div
            className="community-delete-button"
            onClick={handleClick}
          >
            삭제
          </div>
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
              <div>{comment.username}</div>
              <div>{comment.content}</div>
              <div>{DateFormat(comment.createdDate)}</div>
              { userId === comment.userId ? (
                <button 
                  className="comment-button"
                  value={comment.id}
                  onClick={handleDeleteComment}
                >
                  삭제
                </button>
              ) : (<div></div>)}
            </div>
          )
        })}
      </div>
      { isAuthenticated && 
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
      }
    </div>
  )
};
