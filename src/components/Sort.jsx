import arrowTop from '../img/arrow-top.svg';
import { useState } from 'react';

export const Sort = ({onChangeSort, sortValue}) => {


  const popUpItems = [
    {name: 'популярности (DESC)', sortProperty: 'rating'},
    {name: 'популярности (ASC)', sortProperty: '-rating'},
    {name: 'цене (DESC)', sortProperty: 'price'},
    {name: 'цене (ASC)', sortProperty: '-price'},
    {name: 'алфавиту (DESC)', sortProperty: 'title'},
    {name: 'алфавиту (ASC)', sortProperty: '-title'}
  ];


  const [popupOpen, setPopupOpen] = useState(false);

  const handlerPopupActive = (type) => {
    console.log(type);
    onChangeSort(type);
    setPopupOpen(false);
  };

  return (
    <div className='sort'>
      <div className='sort__label'>
        <img width='10' height='6' viewBox='10 40 40 6' fill='none' src={arrowTop} alt='cart' />
        <b>Сортировка по:</b>
        <span onClick={() => setPopupOpen((prev) => !prev)}>{sortValue.name}</span>
      </div>
      {popupOpen && (
        <div className='sort__popup'>
          <ul>
            {popUpItems.map((item, index) => (
              <li
                onClick={() => handlerPopupActive(item)}
                className={sortValue.name === item.name ? 'active' : ''}
                key={index}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
