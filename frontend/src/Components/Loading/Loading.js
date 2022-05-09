import { ReactComponent as LoadingImg } from '../../asset/image/loading.svg';
import "./css/Loading.css";

export default function Loading() {
  return (
    <div className="loading-container">
      <LoadingImg />
      <div className="loading-title">
        SSAFY SCHOOL is Loading...
      </div>
    </div>
  )
}
