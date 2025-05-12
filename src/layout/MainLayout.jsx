import React, { useState } from 'react';

import { Header } from '../components/Header';
import { Outlet } from 'react-router-dom';

export const SearchContext = React.createContext('');

export const MainLayout = () => {

  const [searchValue, setSearchValue] = useState('');

  return (
    <div className='wrapper'>
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
          <Header/>
          <div className='content'>
            <div className='container'>
                <Outlet/>
            </div>
          </div>
      </SearchContext.Provider>
    </div>
  );
};
