import React from "react";
import "./Pagination.scss";

const Pagination = ({ reviewsPerPage, totalReviews, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalReviews / reviewsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="paginate">
      {pageNumbers.map((number) => (
        <li key={number} onClick={() => paginate(number)} className="link">
          {number}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
