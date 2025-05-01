import { useEffect, useState } from 'react';
import './scss/app.scss';

import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { PizzaBlock } from './components/PizzaBlock/PizzaBlock';
import { Skeleton } from './components/PizzaBlock/Skeleton';

export const App = () => {
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

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className="content__items">
            {pizzasData.map((obj) =>
              loading ? <Skeleton />
                : <PizzaBlock
                key={obj.id}
                image={obj.imageUrl}
                rating={obj.rating}
                category={obj.category}
                title={obj.title}
                price={obj.price}
                sizes={obj.sizes}
                types={obj.types}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
