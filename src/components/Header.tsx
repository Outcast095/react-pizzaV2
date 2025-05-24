
import pizzaLogo from '../img/pizza-logo.svg';
import cart from '../img/cart.svg';
import { Link, useLocation } from 'react-router-dom';
import { Search } from './Search/Search';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/cart/selectors';



// Определение функционального компонента Header
export const Header = () => {
  // Получение данных о товарах в корзине и общей стоимости из Redux store
  const { items, totalPrice } = useSelector(selectCart);
  // Вычисление общего количества товаров в корзине путем суммирования свойства count каждого элемента
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);
  // Получение текущего пути URL с помощью хука useLocation
  const location = useLocation();

  // JSX для рендеринга компонента
  return (
    // Контейнер шапки
    <div className='header'>
      {/* Внутренний контейнер для центрирования содержимого */}
      <div className='container'>
        {/* Блок с логотипом и названием */}
        <div className='header__logo'>
          {/* Ссылка на главную страницу */}
          <Link to={'/'}>
            {/* Логотип пиццы */}
            <img width='38' src={pizzaLogo} alt='Pizza logo' />
            {/* Текстовое описание */}
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </Link>
        </div>
        <Search />
        <div className='header__cart'>
          {/* Условный рендеринг: кнопка корзины отображается, только если пользователь не на странице корзины */}
          {location.pathname !== '/cart' && (
            <Link to={'/cart'} className='button button--cart'>
              <span>{totalPrice} ₽</span>
              <div className='button__delimiter'></div>
              <img className="" width='18' height='18' src={cart} alt='cart' />
              <span>{totalCount}</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};