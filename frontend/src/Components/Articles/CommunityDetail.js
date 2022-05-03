import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiInstance } from "../../api";
import DateFormat from "../../Utils/DateFormat";
import CommunityUpdate from "./CommunityUpdate";
import "./css/CommunityDetail.css"

export default function CommunityDetail() {
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
    isNotice: "",
  });
  const [ comments, setComments ] = useState([]);
  const navigate = useNavigate();

  // 유저Id 호출 함수
  async function saveUser() {
    try {
      const res = await apiInstance().get('/users/me');
      setUserId(res.data.id);
      if (res.data.admin !== 2) {
        localStorage.setItem('admin', true);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // 유저Id, 게시글, 댓글정보 호출
  useEffect(() => {
    async function saveCommunity() {
      const res = await apiInstance().get(`/community/${communityId}`);
      setCommunity(res.data)
    };
    saveUser();
    saveCommunity();
    setComments([
      { id: 0, userId: 0, content: "댓글1", createdDate: "2022-04-19 16:10:00", updatedDate: "2022-04-20 15:30:30" },
      { id: 1, userId: 1, content: "댓글2", createdDate: "2022-04-18 15:31:00", updatedDate: "2022-04-20 11:30:00" },
      { id: 2, userId: 3, content: "댓글3", createdDate: "2022-04-17 15:30:00", updatedDate: "2022-04-18 15:30:30" },
      { id: 3, userId: 2, content: "댓글4", createdDate: "2022-04-16 15:30:00", updatedDate: "2022-04-17 15:30:30" },
      { id: 4, userId: 1, content: "댓글5", createdDate: "2022-04-15 15:30:00", updatedDate: "2022-04-16 15:30:30" },
    ]);
  }, [communityId]);

  // 게시글 삭제
  async function handleClick() {
    await apiInstance().delete(`/community/${communityId}`);
    navigate('/articles/community');
    navigate(0);
  };

  // 댓글 삭제
  function handleClickComment() {

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
              <div>{comment.userId}</div>
              <div>{comment.content}</div>
              <div>{DateFormat(comment.createdDate)}</div>
              <div>{DateFormat(comment.updatedDate)}</div>
              { userId === comment.userId ? (
                <div 
                  className="comment-button"
                  onClick={handleClickComment}
                >
                  삭제
                </div>
              ) : (<div></div>)}
            </div>
          )
        })}
      </div>
    </div>
  )
};
