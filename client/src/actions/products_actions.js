import axios from 'axios';
import { PRODUCT_SERVER } from '../components/utils/misc';
import { 
    GET_PRODUCTS_BY_SELL,
    GET_PRODUCTS_BY_ARRIVAL
 } from './types';

 export function getProductsBySell() {
  // ?sortBy=sold&order=desc&limit=100
  const request = axios.get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=1`).then((response) => response.data)

  return {
    type: GET_PRODUCTS_BY_SELL,
    payload: request
  }
 }

 export function getProductsByArrival() {

 }