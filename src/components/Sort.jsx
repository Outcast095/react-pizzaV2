import arrowTop from '../img/arrow-top.svg';

export const Sort = () => {
  return (
    <div className='sort'>
      <div className='sort__label'>
        <img width='10' height='6' viewBox='10 40 40 6' fill='none' src={arrowTop} alt='cart' />
        <b>Сортировка по:</b>
        <span>популярности</span>
      </div>
      <div className='sort__popup'>
        <ul>
          <li className='active'>популярности</li>
          <li>цене</li>
          <li>алфавиту</li>
        </ul>
      </div>
    </div>
  );
};
