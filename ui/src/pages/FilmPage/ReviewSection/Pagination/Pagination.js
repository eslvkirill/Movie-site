import React from "react";
import "./Pagination.scss";

const Pagination = (props) => {
  const pageNumbers = [];

  for (let i = 1; i <= props.totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="paginate">
      {pageNumbers.length > 1
        ? pageNumbers.map((number) => (
            <li
              key={number}
              onClick={() => props.paginate(number)}
              className="link"
              style={
                props.currentPage === number
                  ? {
                      backgroundColor: "#a5101052",
                      color: "#f7d9a8",
                      transform: "scale(1.05)",
                    }
                  : {}
              }
            >
              {number}
            </li>
          ))
        : ""}
    </ul>
  );
};

export default Pagination;
