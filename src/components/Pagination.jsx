import React from "react";
import s from "../styles/Pagination.module.css";

export function Pagination({
  productsPerPage,
  product,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(product / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className={s.pagination}>
        {pageNumbers &&
          pageNumbers.map((num) => (
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
