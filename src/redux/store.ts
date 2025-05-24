// Импорт функции configureStore из Redux Toolkit для создания Redux store
import { configureStore } from '@reduxjs/toolkit';
// Импорт хука useDispatch из react-redux для использования диспетчера в компонентах
import { useDispatch } from 'react-redux';

// Импорт редюсеров для различных срезов состояния
import filter from './filter/slice'; // Редюсер для управления фильтрами
import cart from './cart/slice'; // Редюсер для управления корзиной
import pizza from './pizza/slice'; // Редюсер для управления пиццами

// Создание Redux store с помощью configureStore
export const store = configureStore({
  reducer: {
    filter, // Подключение редюсера фильтров к store под ключом 'filter'
    cart, // Подключение редюсера корзины к store под ключом 'cart'
    pizza, // Подключение редюсера пицц к store под ключом 'pizza'
  },
});

// Определение типа RootState на основе возвращаемого типа метода getState store
export type RootState = ReturnType<typeof store.getState>;

// Определение типа AppDispatch на основе диспетчера store
type AppDispatch = typeof store.dispatch;

// Экспорт кастомного хука useAppDispatch для типизированного использования диспетчера
export const useAppDispatch = () => useDispatch<AppDispatch>();