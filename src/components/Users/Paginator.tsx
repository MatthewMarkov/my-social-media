import React, { useState, FC } from 'react';
import cn from 'classnames';
import Loader from '../Loader/Loader';
import s from './Users.module.css';

type PropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  isFetching: boolean
}

const Paginator: FC<PropsType> = ({
  totalUsersCount, pageSize, currentPage, onPageChanged, isFetching,
}) => {
  const pageCount = Math.ceil(totalUsersCount / pageSize);
  const pages: Array<number> = [];
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
      {isFetching ? <Loader /> : null}
      <div>
        {portionNumber > 1
          && <button onClick={() => { setPortionNumber(portionNumber - 1); }}>Prev</button>}
        {pages
          .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
          .map((p) => (
            <span
              key={p}
              className={cn(currentPage === p && s.navBar)}
              onClick={() => {
                onPageChanged(p);
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
