import pizzaLogo from '../img/pizza-logo.svg';
import cart from '../img/cart.svg';
import { Link, useLocation } from 'react-router-dom';
import { Search } from './Search/Search';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/cart/selectors';

export const Header = () => {

  const { items, totalPrice } = useSelector(selectCart);
  const totalCount = items.reduce((sum: number, item: any) => sum + item.count, 0);
  const location = useLocation();


  return (
    <div className='header'>
      <div className='container'>
        <div className='header__logo'>
          <Link to={'/'}>
            <img width='38' src={pizzaLogo} alt='Pizza logo' />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </Link>
        </div>
        <Search/>
        <div className='header__cart'>
          { location.pathname !== '/cart' && (
            <Link to={'/cart'} className='button button--cart'>
              <span>{totalPrice} ₽</span>
              <div className='button__delimiter'></div>
              <img className="" width='18' height='18' src={cart} alt='cart' />
              <span>{totalCount}</span>
            </Link>
          )
          }

        </div>
      </div>
    </div>
  );
};
