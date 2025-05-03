import React, { useEffect, useState } from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';

export const Home = ({searchValue}) => {
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });
  const [pizzasData, setPizzasData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category =  categoryId !== 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://681270ec129f6313e20e98c0.mockapi.io/pizzas?${category}${search}&sortBy=${sortBy}&order=${order}`
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
  }, [categoryId, sortType, searchValue]);

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  }

  const onChangeCategory = (id) => {
    setCategoryId(id);
  };

  const onChangeSort = (sortObj) => {
    setSortType(sortObj);
  };

  return (
    <>
      <div className="content__top">
        <Categories onChangeCategory={onChangeCategory} categoryValue={categoryId} />
        <Sort onChangeSort={onChangeSort} sortValue={sortType} />
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
    </>
  );
};