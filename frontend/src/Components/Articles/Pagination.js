import "./css/Pagination.css";

export default function Pagination ({ total, limit, page, setPage, setLimit }) {
  const numPages = Math.ceil(total / limit);
  
  function Page () {
    const array = () => {
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
    };
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
        <button
          className="page-button"
          onClick={() => setPage(1)}
          disabled={page === 1}
        >
          &lt;&lt;
        </button>
        <button
          className="page-button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          &lt;
        </button>
        {array().map(i => (
          <button
            className="page-button"
            key={i}
            onClick={() => setPage(i)}
            disabled={page === i}
          >
            {i}
          </button>
        ))}  
        <button
          className="page-button"
          onClick={() => setPage(page + 1)}
          disabled={page === numPages}
        >
          &gt;
        </button>
        <button
          className="page-button"
          onClick={() => setPage(numPages)}
          disabled={page === numPages}
        >
          &gt;&gt;
        </button>
      </div>
    )
  };
  return (
    <div>
      {Page()}
    </div>
  )
};
