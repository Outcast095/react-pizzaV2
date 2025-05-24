// Импорт необходимых функций и типов из библиотек Redux Toolkit и пользовательских типов
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSliceState, Sort, SortPropertyEnum } from './types';

// Определение начального состояния для среза (slice) фильтров
const initialState: FilterSliceState = {
  searchValue: '', // Начальное значение строки поиска - пустая строка
  categoryId: 0, // Начальное значение ID категории - 0 (без категории)
  currentPage: 1, // Начальная страница пагинации - 1
  sort: {
    name: 'популярности', // Название начального типа сортировки
    sortProperty: 'rating', // Свойство для сортировки (рейтинг)
  },
};

// Создание среза (slice) для управления состоянием фильтров с помощью createSlice
const slice = createSlice({
  name: 'filters', // Название среза, используется для идентификации в Redux store
  initialState, // Начальное состояние, определенное выше
  reducers: {
    // Редюсер для установки ID категории
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload; // Обновление categoryId значением из action
    },
    // Редюсер для установки строки поиска
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload; // Обновление searchValue значением из action
    },
    // Редюсер для установки параметров сортировки
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload; // Обновление объекта сортировки значением из action
    },
    // Редюсер для установки текущей страницы пагинации
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload; // Обновление currentPage значением из action
    },
    // Редюсер для установки всех фильтров сразу (например, при парсинге URL)
    setFilters(state, action: PayloadAction<FilterSliceState>) {// Логирование новых фильтров для отладки
      // Проверка, содержит ли payload данные
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage); // Установка страницы с приведением к числу
        state.categoryId = Number(action.payload.categoryId); // Установка категории с приведением к числу
        state.sort = action.payload.sort; // Установка параметров сортировки
      } else {
        // Если payload пустой, сбрасываем фильтры на значения по умолчанию
        state.currentPage = 1;
        state.categoryId = 0;
        state.sort = {
          name: 'популярности',
          sortProperty: 'rating',
        };
      }
    },
  },
});

// Экспорт всех действий (action creators), созданных автоматически createSlice
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
  slice.actions;

// Экспорт редюсера среза для использования в Redux store
export default slice.reducer;