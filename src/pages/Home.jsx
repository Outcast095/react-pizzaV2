import React, { useEffect, useState } from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';


export const Home = (props) => {

  const [pizzasData, setPizzasData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://681270ec129f6313e20e98c0.mockapi.io/pizzas');

        if (!response.ok) {
          throw new Error('Failed to fetch pizzas');
        }

        const pizzaResponse = await response.json();
        setPizzasData(pizzaResponse);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);



  if (error) {
    return <div>...error</div>;
  }

 return  <>
    <div className='content__top'>
      <Categories />
      <Sort />
    </div>
    <h2 className='content__title'>Все пиццы</h2>
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
        ))} {/* ← правильно: закрываем map() */}
    </div>
  </>
};