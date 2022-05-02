import "./css/Pagination.css";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleLeft,
  FaAngleDoubleRight
} from 'react-icons/fa';

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
        <div className="page-move-container">
          <button
            className="page-move-button"
            onClick={() => setPage(1)}
            disabled={page === 1}
          >
            <FaAngleDoubleLeft/>
          </button>
          <button
            className="page-move-button"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <FaAngleLeft/>
          </button>
        </div>
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
        <div className="page-move-container">
          <button
            className="page-move-button"
            onClick={() => setPage(page + 1)}
            disabled={page === numPages}
          >
            <FaAngleRight/>
          </button>
          <button
            className="page-move-button"
            onClick={() => setPage(numPages)}
            disabled={page === numPages}
          >
            <FaAngleDoubleRight/>
          </button>
        </div>
      </div>
    )
  };
  return (
    <div>
      {Page()}
    </div>
  )
};
