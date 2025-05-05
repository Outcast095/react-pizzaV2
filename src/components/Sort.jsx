import arrowTop from '../img/arrow-top.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../redux/store';
import {setSort} from '../redux/slices/filterSlice';

export const Sort = () => {

  const sort = useSelector(state => state.filter.sort);

  const dispatch = useAppDispatch();

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
    dispatch(setSort(type));
    setPopupOpen(false);
  };

  return (
    <div className='sort'>
      <div className='sort__label'>
        <img width='10' height='6' viewBox='10 40 40 6' fill='none' src={arrowTop} alt='cart' />
        <b>Сортировка по:</b>
        <span onClick={() => setPopupOpen((prev) => !prev)}>{sort.name}</span>
      </div>
      {popupOpen && (
        <div className='sort__popup'>
          <ul>
            {popUpItems.map((item, index) => (
              <li
                onClick={() => handlerPopupActive(item)}
                className={sort.name === item.name ? 'active' : ''}
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
