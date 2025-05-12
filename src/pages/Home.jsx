import React, { useEffect, useRef, useState } from 'react';
import qs from 'qs';
import { Categories } from '../components/Categories';
import { popUpItems, Sort } from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Pagination } from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter, setCategoryId, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
import { useNavigate } from 'react-router-dom';






export const Home = () => {


  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const {searchValue} = React.useContext(SearchContext)


  const {items, status} = useSelector(state => state.pizza);
  const { categoryId, sort, currentPage } = useSelector(selectFilter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
  const sortBy = sort.sortProperty.replace('-', '');
  const category = categoryId !== 0 ? `category=${categoryId}` : '';
  const search = searchValue ? `&search=${searchValue}` : '';
  const paginationPage = currentPage;




  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortParams = popUpItems.find((obj) => obj.sortProperty === params.sortProperty)
      dispatch(setFilters({
        ...params,
        sort: sortParams, // Уточняем, что передаем объект sort
      }));
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      dispatch(fetchPizzas({ order, sortBy, category, search, paginationPage }));
    }

    isSearch.current = false;

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`)
    }

    isMounted.current = true;

  }, [categoryId, sort.sortProperty, currentPage])


  if (status === "error") {
    return <div>Ошибка</div>;
  }

  return (
    <>
      <div className="content__top">
        <Categories onChangeCategory={onChangeCategory} categoryValue={categoryId} />
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading"
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((obj) => (
            <PizzaBlock
              key={obj.id} {...obj}
            />
          ))}
      </div>
      <Pagination/>
    </>
  );
};