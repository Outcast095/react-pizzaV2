import './scss/app.scss';
import { useState } from 'react';
import { Header } from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Card } from './pages/Card';
import { NotFound } from './pages/NotFound';



export const App = () => {
  const [searchValue, setSearchValue] = useState('');

  console.log('searchValueApp', searchValue);
  return (
    <div className='wrapper'>
      <Header setSearchValue={setSearchValue}/>
      <div className='content'>
        <div className='container'>
            <Routes>
              <Route path={'/'} element={<Home searchValue={searchValue}/>} />
              <Route path={'/card'} element={<Card/>} />
              <Route path={'*'} element={<NotFound />} />
            </Routes>
        </div>
      </div>
    </div>
  );
};
