import axios from 'axios';
import { USER_SERVER } from '../components/utils/misc';
import { 
  LOGIN_USER,
  REGISTER_USER
 } from './types';

export function loginUser(dataToSumit) {
  const request = axios.post(`${USER_SERVER}/login`, dataToSumit)
  .then((response => response.data));

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export const registerUser = (dataToSubmit) => {
  const request = axios.post(`${USER_SERVER}/register`, dataToSubmit).then(response => response.data);

  return {
    type: REGISTER_USER,
    payload: request
  }
}