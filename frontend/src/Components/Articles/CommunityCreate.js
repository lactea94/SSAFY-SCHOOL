import { useState } from "react"
import { useNavigate } from "react-router-dom";
import "./css/CommunityCreate.css"

export default function CommunityCreate() {
  const [ title, setTitle ] = useState();
  const [ content, setContent ] = useState();
  const navigate = useNavigate();

  function handleClick() {
    console.log(title);
    console.log(content);
    navigate('/articles/community')
  }

  return (
    <div className="create-form">
      <div className="create-label">제목</div>
      <input
        className="create-title"
        name="title"
        onChange={(e) => {setTitle(e.target.value)}}
      />
      <div className="create-label">내용</div>
      <textarea
        className="create-content"
        name="content"
        rows={20}
        onChange={(e) => {setContent(e.target.value)}}
      />
      <div className="create-button" onClick={handleClick}>작성</div>
    </div>
  )
};
