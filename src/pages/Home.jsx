import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Categories } from '../components/Categories';
import { popUpItems, Sort } from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Pagination } from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import { setCategoryId, setFilters } from '../redux/slices/filterSlice';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';




export const Home = () => {
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const {searchValue} = React.useContext(SearchContext)
  const [pizzasData, setPizzasData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  const { categoryId, sort, currentPage } = useSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };


  const fetchPizzas = () => {
    setLoading(true);

    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');
    const category = categoryId !== 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const paginationPage = currentPage;

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://681270ec129f6313e20e98c0.mockapi.io/pizzas?page=${paginationPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`
        );

        setPizzasData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }

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
      fetchPizzas()
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


  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

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
      <Pagination/>
    </>
  );
};