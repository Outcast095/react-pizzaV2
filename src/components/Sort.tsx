import React from 'react';
import { useDispatch } from 'react-redux';
import { setSort } from '../redux/filter/slice';
import { Sort as SortType, SortPropertyEnum } from '../redux/filter/types';



type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

type PopupClick = MouseEvent & {
  composedPath(): string;
};

type SortPopupProps = {
  value: SortType;
};

export const sortList: SortItem[] = [
  { name: 'популярности (DESC)', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: 'популярности (ASC)', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'цене (DESC)', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: 'цене (ASC)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту (DESC)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту (ASC)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

// Определение функционального компонента Sort с типизацией SortPopupProps, обернутого в React.memo для оптимизации рендеринга
export const Sort: React.FC<SortPopupProps> = React.memo(({ value }) => {
  // Хук для доступа к диспетчеру Redux, используется для отправки действий в store
  const dispatch = useDispatch();
  // Ref для привязки к DOM-элементу контейнера сортировки, используется для обработки кликов вне компонента
  const sortRef = React.useRef<HTMLDivElement>(null);

  // Состояние для управления видимостью выпадающего меню сортировки
  const [open, setOpen] = React.useState(false);

  // Функция обработки клика по элементу списка сортировки
  const onClickListItem = (obj: SortItem) => {
    // Диспатч действия для установки нового типа сортировки в Redux store
    dispatch(setSort(obj));
    // Закрытие выпадающего меню после выбора
    setOpen(false);
  };

  // useEffect для обработки кликов вне компонента сортировки
  React.useEffect(() => {
    // Функция обработки клика вне выпадающего меню
    const handleClickOutside = (event: MouseEvent) => {
      // Приведение типа события к PopupClick для доступа к composedPath
      const _event = event as PopupClick;

      // Проверка, что клик произошел вне элемента sortRef
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
        // Закрытие выпадающего меню, если клик был вне компонента
        setOpen(false);
      }
    };

    // Добавление слушателя события клика на body
    document.body.addEventListener('click', handleClickOutside);

    // Очистка: удаление слушателя при размонтировании компонента
    return () => document.body.removeEventListener('click', handleClickOutside);
  }, []); // Пустой массив зависимостей, эффект срабатывает только при монтировании/размонтировании

  // JSX для рендеринга компонента
  return (
    // Контейнер сортировки с привязкой ref для отслеживания кликов
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        {/* Текущее название сортировки, клик по которому открывает/закрывает меню */}
        <span onClick={() => setOpen(!open)}>{value.name}</span>
      </div>
      {/* Условный рендеринг выпадающего меню, если open === true */}
      {open && (
        <div className="sort__popup">
          <ul>
            {/* Перебор массива sortList для рендеринга элементов сортировки */}
            {sortList.map((obj, i) => (
              <li
                key={i} // Уникальный ключ для каждого элемента списка
                onClick={() => onClickListItem(obj)} // Обработчик клика по элементу
                // Добавление класса 'active', если текущая сортировка совпадает с элементом
                className={value.sortProperty === obj.sortProperty ? 'active' : ''}>
                {obj.name} {/* Название варианта сортировки */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});