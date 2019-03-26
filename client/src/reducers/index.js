import { combineReducers } from 'redux';
import user from './user_reducer';
import products from './productsReducer';
import site from './siteReducer';

const rootReducer = combineReducers({
  user,
  products,
  site
})

export default rootReducer;
