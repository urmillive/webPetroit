import React from "react";
import { Pagination } from "react-bootstrap";

function AppPagination({ currentPage, totalPages, setCurrentPage }) {
  return (
    <Pagination>
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => setCurrentPage(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        );
      })}
    </Pagination>
  );
}

export default AppPagination;
