import axios from 'axios';
import { BACKEND_HOST } from '@env';

function createInstance(token) {
  console.log(BACKEND_HOST)
  return axios.create({
    baseURL: BACKEND_HOST,
    timeout: 10000,
    headers: { Authorization: 'Bearer ' + token },
  });
}

export { createInstance };
