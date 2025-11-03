import { memo } from "react";

function Pagination({ currentPage, totalTodos, limitPerPage, onNext, onPrev }) {
  const totalPages = Math.ceil(totalTodos / limitPerPage);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button onClick={onPrev} disabled={currentPage === 1}>
        Previous
      </button>
      <span style={{ margin: "0 15px" }}>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={onNext} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default memo(Pagination);
