import './scss/app.scss';

import { Header } from './components/Header';
import { Categories } from './components/Categories';
import { Sort } from './components/Sort';
import { PizzaBlock } from './components/PizzaBlock';

import { pizzaCardMock } from './mocs/pizzaCart.js';

console.log(pizzaCardMock);

export const App = () => {
  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            {/*<Categories/>*/}
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {pizzaCardMock.map((obj) => (
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
        </div>
      </div>
    </div>
  );
};
