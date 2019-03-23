import { combineReducers } from 'redux';
import user from './user_reducer';
import products from './productsReducer';

const rootReducer = combineReducers({
  user,
  products
})

export default rootReducer;
