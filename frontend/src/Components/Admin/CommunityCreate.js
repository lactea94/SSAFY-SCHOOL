import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { CreateCommunity } from "../../api/ArticleAPI";
import "./css/Create.css"

export default function CommunityCreate({ setCreateOpen }) {
  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ isNotice, setIsNotice ] = useState(false);
  const navigate = useNavigate();

  // 게시글 생성
  function handleSubmit(e) {
    e.preventDefault();
    CreateCommunity(title, content, isNotice);
    setTimeout(() => {
      navigate(0);
    }, 100);
  };

  // 모달 닫기
  function handleCancel() {
    setCreateOpen(false)
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
    <div className="admin-create-modal" onClick={handleCancel}>
      <form
        className="admin-create-form"
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="admin-create-label">제목</div>
        <input
          className="admin-create-title"
          onChange={e => setTitle(e.target.value)}
          required
        />
        <div className="admin-create-label">
          <label>공지</label>
          <input
            className="admin-toggle"
            type="checkbox"
            id="isAdmin"
            checked={isNotice}
            onChange={e => setIsNotice(e.target.checked)}
          />
        </div>
        <div className="admin-create-label">내용</div>
        <textarea
          className="admin-create-content"
          rows={20}
          onChange={e => setContent(e.target.value)}
          required
        />
        <div className="admin-create-buttons">
          <button className="admin-create-button">작성</button>
          <button className="admin-create-cancel" onClick={handleCancel}>취소</button>
        </div>
      </form>
    </div>
  )
};
