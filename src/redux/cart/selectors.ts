// Импорт типа RootState для типизации состояния Redux store
import { RootState } from '../store';

// Селектор для получения всего состояния корзины из Redux store
export const selectCart = (state: RootState) => state.cart;

// Селектор для получения конкретного элемента корзины по ID
// Принимает ID в качестве параметра и возвращает функцию, которая ищет элемент в массиве items
export const selectCartItemById = (id: string) => (state: RootState) =>
  state.cart.items.find((obj) => obj.id === id);