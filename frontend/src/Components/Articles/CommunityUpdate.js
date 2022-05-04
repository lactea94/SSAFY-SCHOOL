import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { UpdateCommunity } from "../../api/ArticleAPI";
import "./css/CommunityUpdate.css"

export default function CommunityUpdate({ title, content, setUpdateOpen }) {
  const { communityId } = useParams();
  const [ newTitle, setNewTitle ] = useState(title);
  const [ newContent, setNewContent ] = useState(content);
  const navigate = useNavigate();

  // 게시글 수정
  async function handleSubmit(e) {
    e.preventDefault();
    UpdateCommunity(communityId, newTitle, newContent);
    navigate(0);
  };
  
  // 모달 닫기
  function handleCancel() {
    setUpdateOpen(false)
  };

  // 모달 위치 제어
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <div className="update-modal" onClick={handleCancel}>
      <form
        className="update-form"
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="update-label">제목</div>
        <input
          className="update-title"
          value={newTitle}
          onChange={(e) => {setNewTitle(e.target.value)}}
          required
        />
        <div className="update-label">내용</div>
        <textarea
          className="update-content"
          rows={20}
          value={newContent}
          onChange={(e) => {setNewContent(e.target.value)}}
          required
        />
        <div className="update-buttons">
          <button className="update-button">수정</button>
          <button className="update-cancel" onClick={handleCancel}>취소</button>
        </div>
      </form>
    </div>
  )
}
