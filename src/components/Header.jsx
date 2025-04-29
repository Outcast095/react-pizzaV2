import pizzaLogo from '../img/pizza-logo.svg';
import cart from '../img/cart.svg';

export const Header = () => {
  return (
    <div className='header'>
      <div className='container'>
        <div className='header__logo'>
          <img width='38' src={pizzaLogo} alt='Pizza logo' />
          <div>
            <h1>React Pizza</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </div>
        <div className='header__cart'>
          <a href='/cart.html' className='button button--cart'>
            <span>520 ₽</span>
            <div className='button__delimiter'></div>
            <img width='18' height='18' viewBox='0 0 18 18' fill='none' src={cart} alt='cart' />
            <span>3</span>
          </a>
        </div>
      </div>
    </div>
  );
};
