import "./css/Pagination.css"

export default function Pagination ({ total, limit, page, setPage, setLimit }) {
  const numPages = Math.ceil(total / limit);

  const buttonStyle = {
    display: "grid",
    cursor: "pointer",
    width: "100%",
    fontSize: "0.8rem",
    margin: "auto",
    padding: 0,
    borderRadius: "0.3rem",
  }
  
  function Page () {
    const array = () => {
      console.log(numPages)
      if (numPages < 5) {
        let tmp = []
        for (let p = 1; p < numPages + 1; p ++) {
          tmp.push(p);
        }
        return tmp
      } else if (page < 4) {
        return [1, 2, 3, 4, 5]
      } else if (page > numPages - 3) {
        return [numPages - 4, numPages - 3, numPages - 2, numPages - 1, numPages]
      } else {
        return [page - 2, page - 1, page , page + 1]
      }
    }
    return (
      <div
        className="page-container"
      >
        <select
          type="number"
          className="page-select"
          value={limit}
          style={{
            display: "grid",
        }}
        onChange={({ target: { value } }) => {
          setLimit(Number(value))
          setPage(1)
        }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
        <div
          style={buttonStyle}
          onClick={() => setPage(1)} disabled={page === 1}
        >
          &lt;&lt;
        </div>
        <div
          style={buttonStyle}
          onClick={() => setPage(page - 1)} disabled={page === 1}
        >
          &lt;
        </div>
        {array().map(i => (
          <div
            style={buttonStyle}
            key={i}
            onClick={() => setPage(i)}
          // current={page === i ? 1 : 0}
          >
            {i}
          </div>
        ))}  
        <div
          style={buttonStyle}
          onClick={() => setPage(page + 1)} disabled={page === numPages}
        >
          &gt;
        </div>
        <div
          style={buttonStyle}
          onClick={() => setPage(numPages)} disabled={page === numPages}
        >
          &gt;&gt;
        </div>
      </div>
    )
  }
  return (
    <div>
      {Page()}
    </div>
  )
}
