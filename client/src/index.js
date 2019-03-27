import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/styles.css';

import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';

import Reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore);
// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducers)}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>, 
  document.getElementById('root')
);
