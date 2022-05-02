import './css/404.css'

export default function PageNotFound() {
  return (
    <div className="not-found-container ">
      <img
        className="not-found-image"
        src="/image/pigeon.gif"
        alt="notfound"
      />
      <h1>Page Not Found</h1>
    </div>
  )
}