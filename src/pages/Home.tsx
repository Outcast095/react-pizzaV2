import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories, Sort, PizzaBlock, Skeleton, Pagination, sortList } from '../components';

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';




// Определение функционального компонента Home с использованием TypeScript и React.FC
export const Home: React.FC = () => {

  const navigate = useNavigate(); // Хук для навигации из react-router-dom, позволяет изменять URL
  const dispatch = useAppDispatch(); // Хук для доступа к диспетчеру Redux, используется для отправки действий в store
  const isMounted = React.useRef(false); // Ref для отслеживания, был ли компонент смонтирован, чтобы избежать лишних действий при первом рендере


  const { items, status } = useSelector(selectPizzaData);   // Получение данных о пиццах (items) и статуса загрузки (status) из Redux store с помощью селектора
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter); // Получение параметров фильтрации (категория, сортировка, текущая страница, поиск) из Redux

  // Мемоизация функции для изменения категории с помощью useCallback, чтобы избежать лишних ререндеров
  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));  // Диспатч действия для установки новой категории в Redux store
  }, [dispatch]);

  // Функция для изменения текущей страницы пагинации
  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page)); // Диспатч действия для установки новой страницы в Redux store
  };

  // Асинхронная функция для получения данных о пиццах
  const getPizzas = async () => {
    const sortBy = sort.sortProperty.replace('-', '');  // Извлечение свойства сортировки, удаление символа '-' для определения направления
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';  // Определение порядка сортировки: 'asc' (по возрастанию) или 'desc' (по убыванию)
    const category = categoryId > 0 ? String(categoryId) : '';   // Установка категории, если categoryId > 0, иначе пустая строка
    const search = searchValue;   // Получение значения поиска

    dispatch( // Диспатч асинхронного действия для получения пицц с учетом параметров фильтрации
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0); // Прокрутка страницы к началу после загрузки новых данных
  };

  // useEffect для обработки параметров URL при первом и последующих рендерах
  React.useEffect(() => {

    // Проверяем, не является ли рендер первым (isMounted.current = true после первого рендера)
    if (isMounted.current) {
      // Формируем строку запроса (query string) из параметров фильтрации
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty, // Свойство сортировки
        categoryId: categoryId > 0 ? categoryId : null, // Категория, если выбрана
        currentPage: String(currentPage), // Текущая страница
      });

      // Обновляем URL, добавляя строку запроса
      navigate(`?${queryString}`);
    }

    // Если это первый рендер и в URL есть параметры (window.location.search)
    if (!isMounted.current && window.location.search) {
      // Парсим параметры из строки запроса, убирая начальный символ '?'
      const params = qs.parse(window.location.search.substring(1));
      // Находим объект сортировки из списка sortList, соответствующий параметру sortProperty
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      // Диспатчим действие для установки фильтров в Redux store
      dispatch(
        setFilters({
          categoryId: Number(params.categoryId), // Категория из URL
          currentPage: Number(params.currentPage), // Страница из URL
          sort: sort || sortList[0], // Сортировка из URL или первая по умолчанию
        }),
      );
    }

    // Устанавливаем isMounted в true после первого рендера
    isMounted.current = true;
  }, [dispatch, navigate, sort.sortProperty, categoryId, currentPage]); // Зависимости useEffect

  // useEffect для вызова функции getPizzas при изменении параметров фильтрации
  React.useEffect(() => {
    getPizzas(); // Запрашиваем пиццы при изменении категории, сортировки, поиска или страницы
  }, [categoryId, sort.sortProperty, searchValue, currentPage]); // Зависимости useEffect

  // Преобразование массива пицц в JSX элементы для рендеринга
  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  // Создание массива из 6 заглушек (skeletons) для отображения во время загрузки
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  // JSX для рендеринга компонента
  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
