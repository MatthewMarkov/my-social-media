import React, { useState } from 'react';
import Loader from '../Loader/Loader';
import s from './Users.module.css';

const Paginator = (props) => {
  const pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }
  const portionSize = 10;
  const portionCount = Math.ceil(pageCount / portionSize);
  const [portionNumber, setPortionNumber] = useState(1);
  const leftPortionNumber = (portionNumber - 1) * portionSize + 1;
  const rightPortionNumber = portionNumber * portionSize;
  return (
    <div>
      {props.isFetching ? <Loader /> : null}
      <div>
        {portionNumber > 1
          && <button onClick={() => { setPortionNumber(portionNumber - 1); }}>Prev</button>}
        {pages
          .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
          .map((p) => (
            <span
              className={props.currentPage === p && s.navBar}
              onClick={() => {
                props.onPageChanged(p);
              }}
            >
              {p}
            </span>
          ))}
          {portionCount > portionNumber
          && <button onClick={() => { setPortionNumber(portionNumber + 1); }}>Next</button>}
      </div>
    </div>
  );
};

export default Paginator;
