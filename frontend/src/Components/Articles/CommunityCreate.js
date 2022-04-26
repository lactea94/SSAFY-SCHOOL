import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./css/CommunityCreate.css"

export default function CommunityCreate({ setCreateOpen }) {
  const [ title, setTitle ] = useState();
  const [ content, setContent ] = useState();
  const navigate = useNavigate();

  function handleCreate() {
    console.log(title);
    console.log(content);
    navigate('/articles/community')
  }

  function handleCancel() {
    setCreateOpen(false)
  }

  return (
    <div className="create-form">
      <div className="create-label">제목</div>
      <input
        className="create-title"
        onChange={(e) => {setTitle(e.target.value)}}
      />
      <div className="create-label">내용</div>
      <textarea
        className="create-content"
        rows={20}
        onChange={(e) => {setContent(e.target.value)}}
      />
      <div className="create-buttons">
        <div className="create-button" onClick={handleCreate}>작성</div>
        <div className="create-cancel" onClick={handleCancel}>취소</div>
      </div>
    </div>
  )
};
