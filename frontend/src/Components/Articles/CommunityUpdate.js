import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./css/CommunityUpdate.css"

export default function CommunityUpdate({ title, content, setUpdateOpen }) {
  const [ newTitle, setNewTitle ] = useState(title);
  const [ newcontent, setNewContent ] = useState(content);
  const navigate = useNavigate();

  function handleUpdate() {
    console.log(newTitle);
    console.log(newcontent);
    navigate(0)
  }
  
  function handleCancel() {
    setUpdateOpen(false)
  }

  return (
    <div className="update-form">
      <div className="update-label">제목</div>
      <input
        className="update-title"
        value={newTitle}
        onChange={(e) => {setNewTitle(e.target.value)}}
      />
      <div className="update-label">내용</div>
      <textarea
        className="update-content"
        rows={20}
        value={newcontent}
        onChange={(e) => {setNewContent(e.target.value)}}
      />
      <div className="update-buttons">
        <div className="update-button" onClick={handleUpdate}>수정</div>
        <div className="update-cancel" onClick={handleCancel}>취소</div>
      </div>
    </div>
  )
}
