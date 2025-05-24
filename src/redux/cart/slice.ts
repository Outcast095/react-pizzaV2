// Импорт функций и типов из Redux Toolkit для создания среза состояния и типизации
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// Импорт утилиты для подсчета общей стоимости корзины
import { calcTotalPrice } from '../../utils/calcTotalPrice';
// Импорт утилиты для получения данных корзины из локального хранилища
import { getCartFromLS } from '../../utils/getCartFromLS';
// Импорт типов для элементов корзины и состояния среза
import { CartItem, CartSliceState } from './types';

// Инициализация начального состояния корзины с помощью данных из локального хранилища
const initialState: CartSliceState = getCartFromLS();

// Создание среза (slice) для управления состоянием корзины
const slice = createSlice({
  name: 'cart', // Название среза для идентификации в Redux store
  initialState, // Начальное состояние, полученное из локального хранилища
  reducers: {
    // Редюсер для добавления товара в корзину
    addItem(state, action: PayloadAction<CartItem>) {
      // Поиск товара в корзине по ID
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        // Если товар уже есть в корзине, увеличиваем его количество
        findItem.count++;
      } else {
        // Если товара нет, добавляем новый элемент с количеством 1
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      // Пересчет общей стоимости корзины
      state.totalPrice = calcTotalPrice(state.items);
    },
    // Редюсер для уменьшения количества товара в корзине
    minusItem(state, action: PayloadAction<string>) {
      // Поиск товара в корзине по ID
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        // Уменьшение количества товара, если он найден
        findItem.count--;
      }

      // Пересчет общей стоимости корзины
      state.totalPrice = calcTotalPrice(state.items);
    },
    // Редюсер для удаления товара из корзины
    removeItem(state, action: PayloadAction<string>) {
      // Фильтрация массива товаров, исключая элемент с указанным ID
      state.items = state.items.filter((obj) => obj.id !== action.payload);
      // Пересчет общей стоимости корзины
      state.totalPrice = calcTotalPrice(state.items);
    },
    // Редюсер для очистки корзины
    clearItems(state) {
      // Установка пустого массива товаров
      state.items = [];
      // Сброс общей стоимости корзины
      state.totalPrice = 0;
    },
  },
});

// Экспорт действий (action creators) для использования в компонентах
export const { addItem, removeItem, minusItem, clearItems } = slice.actions;

// Экспорт редюсера среза для использования в Redux store
export default slice.reducer;