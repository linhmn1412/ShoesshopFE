import { useState } from "react";
import { Link } from "react-router-dom";

const Pagination = ({currentPage,totalPages, onPageChange}) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
          onPageChange(currentPage - 1);
        }
      };
    
      const handleNextPage = () => {
        if (currentPage < totalPages) {
          onPageChange(currentPage + 1);
        }
      };
    
  return (
    
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <Link className="page-link" to="#" aria-label="Previous" onClick={handlePrevPage}>
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {[...Array(totalPages)].map((_, index) => (
             <li className="page-item" key={index + 1}>
             <Link className="page-link" to="#"  onClick={() => onPageChange(index + 1)}>
            {index + 1}
          </Link>
           </li>
          
        ))}
       
        <li className="page-item">
          <Link className="page-link" to="#" aria-label="Next" onClick={handleNextPage} disabled={currentPage === totalPages}>
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
