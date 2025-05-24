// Импорт функции createAsyncThunk из Redux Toolkit для создания асинхронных действий
import { createAsyncThunk } from '@reduxjs/toolkit';
// Импорт библиотеки axios для выполнения HTTP-запросов
import axios from 'axios';
// Импорт типов Pizza и SearchPizzaParams для типизации данных и параметров
import { Pizza, SearchPizzaParams } from './types';
// Импорт функции pickBy из lodash для фильтрации объекта параметров
import pickBy from 'lodash/pickBy';
// Импорт функции identity из lodash, используемой как функция-предикат для pickBy
import identity from 'lodash/identity';

// Создание асинхронного действия для получения пицц с помощью createAsyncThunk
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus', // Название действия для идентификации в Redux
  async (params) => {
    // Деструктуризация параметров запроса
    const { sortBy, order, category, search, currentPage } = params;
    // Выполнение GET-запроса к API с использованием axios
    const { data } = await axios.get<Pizza[]>(
      `https://681270ec129f6313e20e98c0.mockapi.io/pizzas`, // Базовый URL API
      {
        // Параметры запроса, отфильтрованные с помощью pickBy
        params: pickBy(
          {
            page: currentPage, // Номер текущей страницы для пагинации
            limit: 4, // Ограничение на количество элементов на странице
            category, // Категория пицц
            sortBy, // Поле для сортировки
            order, // Порядок сортировки (asc или desc)
            search, // Строка поиска
          },
          identity, // Функция identity исключает параметры с falsy значениями (null, undefined, пустая строка)
        ),
      },
    );

    // Возврат полученных данных (массива пицц)
    return data;
  },
);