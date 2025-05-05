import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Pagination } from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import {setCategoryId} from '../redux/slices/filterSlice';







export const Home = () => {
  const {searchValue} = React.useContext(SearchContext)
  const [pizzasData, setPizzasData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { categoryId, sort } = useSelector(state => state.filter);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setLoading(true);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category =  categoryId !== 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const paginationPage = currentPage


    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://681270ec129f6313e20e98c0.mockapi.io/pizzas?page=${paginationPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch pizzas');
        }

        const pizzaResponse = await response.json();
        setPizzasData(pizzaResponse);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  return (
    <>
      <div className="content__top">
        <Categories onChangeCategory={onChangeCategory} categoryValue={categoryId} />
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {loading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : pizzasData.map((obj) => (
            <PizzaBlock
              key={obj.id}
              image={obj.imageUrl}
              rating={obj.rating}
              category={obj.category}
              title={obj.title}
              price={obj.price}
              sizes={obj.sizes}
              types={obj.types}
            />
          ))}
      </div>
      <Pagination onChangePage={(number) => setCurrentPage(number)}/>
    </>
  );
};