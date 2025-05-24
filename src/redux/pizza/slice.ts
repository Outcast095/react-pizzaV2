// Импорт функций и типов из Redux Toolkit для создания асинхронных действий и среза состояния
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// Импорт библиотеки axios для выполнения HTTP-запросов
import axios from 'axios';
// Импорт типа RootState для типизации состояния Redux store
import { RootState } from '../store';

// Определение типа для параметров запроса пицц
export type SearchPizzaParams = {
  order: string; // Порядок сортировки (asc или desc)
  sortBy: string; // Поле для сортировки (например, rating, price)
  category: string; // Категория пицц (например, ID категории)
  search: string; // Строка поиска
  paginationPage: string; // Номер страницы для пагинации
};

// Определение типа для объекта пиццы
export type PizzaItem = {
  category: number; // ID категории пиццы
  id: number; // Уникальный идентификатор пиццы
  imageUrl: string; // URL изображения пиццы
  price: number; // Цена пиццы
  rating?: number; // Рейтинг пиццы (опционально)
  sizes: number[]; // Доступные размеры пиццы (в сантиметрах)
  types: number[]; // Доступные типы теста пиццы
  title: string; // Название пиццы
};

// Тип для аргументов асинхронного запроса (объект с ключами-строками)
type FetchPizzasArgs = Record<string, string>;

// Создание асинхронного действия для получения пицц с помощью createAsyncThunk
export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus', // Название действия для идентификации в Redux
  async (params) => {
    // Деструктуризация параметров запроса
    const { order, sortBy, category, search, paginationPage } = params;

    // Выполнение GET-запроса к API с использованием axios
    const { data } = await axios.get<PizzaItem[]>(
      `https://681270ec129f6313e2ы0e98c0.mockapi.io/pizzas?page=${paginationPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=${order}`,
    );
    // Возврат полученных данных (массива пицц)
    return data;
  },
);

// Определение перечисления для статусов загрузки
enum Status {
  LOADING = 'loading', // Статус загрузки данных
  SUCCESS = 'success', // Статус успешного получения данных
  ERROR = 'error', // Статус ошибки при загрузке
}

// Интерфейс для состояния среза пицц
interface PizzasState {
  items: PizzaItem[]; // Массив пицц
  status: Status; // Текущий статус загрузки
}

// Начальное состояние среза
const initialState: PizzasState = {
  items: [], // Изначально массив пицц пуст
  status: Status.LOADING, // Начальный статус - загрузка
};

// Создание среза (slice) для управления состоянием пицц
const slice = createSlice({
  name: 'pizza', // Название среза для идентификации в Redux store
  initialState, // Начальное состояние
  reducers: {
    // Редюсер для установки массива пицц вручную
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload; // Обновление массива пицц значением из action
    },
  },
  // Обработка асинхронных действий с помощью extraReducers
  extraReducers: (builder) => {
    // Обработка состояния "pending" (ожидание) для fetchPizzas
    builder.addCase(fetchPizzas.pending, (state, action) => {
      state.status = Status.LOADING; // Установка статуса загрузки
      state.items = []; // Очистка массива пицц
    });

    // Обработка состояния "fulfilled" (успешное выполнение) для fetchPizzas
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload; // Установка полученных пицц в состояние
      state.status = Status.SUCCESS; // Установка статуса успешного завершения
    });

    // Обработка состояния "rejected" (ошибка) для fetchPizzas
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR; // Установка статуса ошибки
      state.items = []; // Очистка массива пицц
    });
  },
});

// Экспорт селектора для получения данных пицц из Redux store
export const selectPizzaData = (state: RootState) => state.pizza;

// Экспорт действия setItems для использования в компонентах
export const { setItems } = slice.actions;

// Экспорт редюсера среза для использования в Redux store
export default slice.reducer;