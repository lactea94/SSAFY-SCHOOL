import { useLocation, useParams } from "react-router-dom";

export default function NoticeDetail () {
  const { noticeId } = useParams();
  const { state } = useLocation();
  console.log(noticeId)
  console.log(state)
  return (
    <div>
      <h1>{state.title}</h1>
      <h4>{state.createdDate}</h4>
      <h4>{state.updatedDate}</h4>
      <h4>{state.content}</h4>
    </div>
  )
};
