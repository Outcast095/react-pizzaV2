import React from 'react';
import './scss/app.scss';

import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';
import { MainLayout } from './layout/MainLayout';
import { FullPizza } from './pages/FullPizza';

export const App = () => {

  return (
    <div className='wrapper'>
            <Routes>
              <Route path={'/'} element={<MainLayout/>}>
                <Route path={''} element={<Home/>} />
                <Route path={'/cart'} element={<Cart/>}/>
                <Route path={'/pizzas/:id'} element={<FullPizza/>}/>
                <Route path={'*'} element={<NotFound />} />
              </Route>
            </Routes>
    </div>
  );
};
