export default function Pagination ({ total, limit, page, setPage, setLimit }) {
  const numPages = Math.ceil(total / limit);
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
    console.log(array())
    return (
      <div
        style={{
          display: "grid",
        }}
      >
        <select
        type="number"
        value={limit}
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
          onClick={() => setPage(1)} disabled={page === 1}
        >
          first
        </button>
        <button
          onClick={() => setPage(page - 1)} disabled={page === 1}
        >
          prev
        </button>
        {array().map(i => (
          <button
          key={i}
          onClick={() => setPage(i)}
          // current={page === i ? 1 : 0}
          >
            {i}
          </button>
        ))}  
        <button
          onClick={() => setPage(page + 1)} disabled={page === numPages}
        >
          next
        </button>
        <button
          onClick={() => setPage(numPages)} disabled={page === numPages}
        >
          last
        </button>
      </div>
    )
  }
  return (
    <div>
      {Page()}
    </div>
  )
}
