import React from "react";
import s from "./Pagination.module.css";

export default function Pagination({
  recipesPerPage,
  recipes,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(recipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className={s.pagination}>
        {pageNumbers?.map((num) => (
          <li key={num}>
            <button
              className={s.button}
              key={num}
              onClick={() => paginate(num)}
              style={
                num === currentPage
                  ? {
                      backgroundColor: "var(--main-color)",
                      color: "var(--light-color)",
                      border: "1px solid var(--light-color)",
                    }
                  : {}
              }
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
