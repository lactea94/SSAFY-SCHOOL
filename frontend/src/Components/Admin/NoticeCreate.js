import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "./css/Create.css"

export default function NoticeCreate({ setCreateOpen }) {
  const [ title, setTitle ] = useState();
  const [ content, setContent ] = useState();
  const navigate = useNavigate();

  // 게시글 생성
  function handleSubmit() {
    console.log(title);
    console.log(content);
    navigate('/admin/notice')
  }

  // 모달 닫기
  function handleCancel() {
    setCreateOpen(false)
  }

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
    <div className="create-modal" onClick={handleCancel}>
      <form
        className="create-form"
        onClick={e => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <div className="create-label">제목</div>
        <input
          className="create-title"
          onChange={(e) => {setTitle(e.target.value)}}
          type="text"
          required
        />
        <div className="create-label">내용</div>
        <textarea
          className="create-content"
          rows={20}
          onChange={(e) => {setContent(e.target.value)}}
          required
        />
        <div className="create-buttons">
          <button className="create-button">작성</button>
          <button className="create-cancel" onClick={handleCancel}>취소</button>
        </div>
      </form>
    </div>
  )
};