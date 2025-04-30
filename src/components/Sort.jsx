import arrowTop from '../img/arrow-top.svg';
import { useState } from 'react';

export const Sort = () => {
  const popUpItems = ['популярности', 'цене', 'алфавиту'];
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupActive, setPopupActive] = useState(0);

  const handlerPopupActive = (type) => {
    setPopupActive(type);
    setPopupOpen(false);
  };

  return (
    <div className='sort'>
      <div className='sort__label'>
        <img width='10' height='6' viewBox='10 40 40 6' fill='none' src={arrowTop} alt='cart' />
        <b>Сортировка по:</b>
        <span onClick={() => setPopupOpen((prev) => !prev)}>{popUpItems[popupActive]}</span>
      </div>
      {popupOpen && (
        <div className='sort__popup'>
          <ul>
            {popUpItems.map((item, index) => (
              <li
                onClick={() => handlerPopupActive(index)}
                className={popupActive === index ? 'active' : ''}
                key={index}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
