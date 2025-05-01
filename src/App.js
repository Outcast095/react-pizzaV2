import './scss/app.scss';

import { Header } from './components/Header';
import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Card } from './pages/Card';
import { NotFound } from './pages/NotFound';


export const App = () => {

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
            <Routes>
              <Route path={'/'} element={<Home/>} />
              <Route path={'/card'} element={<Card/>} />
              <Route path={'*'} element={<NotFound />} />
            </Routes>
        </div>
      </div>
    </div>
  );
};
