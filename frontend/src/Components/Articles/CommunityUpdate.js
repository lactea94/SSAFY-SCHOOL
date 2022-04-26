import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./css/CommunityUpdate.css"

export default function CommunityUpdate({ title, content }) {
  const [ newTitle, setNewTitle ] = useState(title);
  const [ newcontent, setNewContent ] = useState(content);
  const navigate = useNavigate();

  function handleClick() {
    console.log(newTitle);
    console.log(newcontent);
    navigate(0)
  }


  return (
    <div className="update-form">
      <div className="update-label">제목</div>
      <input
        className="update-title"
        name="title"
        value={newTitle}
        onChange={(e) => {setNewTitle(e.target.value)}}
      />
      <div className="update-label">내용</div>
      <textarea
        className="update-content"
        name="content"
        rows={20}
        value={newcontent}
        onChange={(e) => {setNewContent(e.target.value)}}
      />
      <div className="update-button" onClick={handleClick}>수정</div>
    </div>
  )
}
