import React from 'react';

function Pagination({ currentPage, totalPages, onNext, onPrevious }) {
  return (
    <div className="pagination d-flex justify-content-center align-items-center mt-4">
      <button 
        className="btn btn-primary mx-2"
        onClick={onPrevious} 
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span className="mx-2">Page {currentPage} of {totalPages}</span>
      <button 
        className="btn btn-primary mx-2"
        onClick={onNext} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
