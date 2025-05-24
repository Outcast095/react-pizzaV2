// Импорт React и хука useState для управления состоянием
import React, { useState } from 'react';

// Импорт компонента Header
import { Header } from '../components/Header';
// Импорт компонента Outlet из react-router-dom для рендеринга вложенных маршрутов
import { Outlet } from 'react-router-dom';

// Создание контекста для хранения значения поиска и функции его обновления
export const SearchContext = React.createContext('');

// Определение функционального компонента MainLayout
export const MainLayout = () => {
  // Состояние для хранения значения строки поиска, изначально пустая строка
  const [searchValue, setSearchValue] = useState('');

  // JSX для рендеринга компонента
  return (
    // Основной контейнер приложения
    <div className='wrapper'>
      {/* Обертка контекста, предоставляющая searchValue и setSearchValue дочерним компонентам */}
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        {/* Рендеринг компонента Header */}
        <Header />
        {/* Контейнер для основного контента */}
        <div className='content'>
          {/* Внутренний контейнер для центрирования содержимого */}
          <div className='container'>
            {/* Outlet рендерит дочерние маршруты, определенные в маршрутизаторе */}
            <Outlet />
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
};