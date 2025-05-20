import React from 'react';
import * as ReactDOM from 'react-dom'; // Используем react-dom, а не react-dom/client
import { App } from './App';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store } from './redux/store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
