import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss';
import {setCurrentPage} from '../../redux/slices/filterSlice';
import { useSelector, useDispatch } from 'react-redux';


export const Pagination = () => {
  const { currentPage } = useSelector(state => state.filter);
  const dispatch = useDispatch();

  return <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    previousLabel="<"
    onPageChange={(event) => dispatch(setCurrentPage(event.selected + 1))}
    pageRangeDisplayed={4}
    forcePage={currentPage -1}
    pageCount={3}
  />
};