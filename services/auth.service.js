const { default: axios } = require('axios');
import { BACKEND_HOST } from '@env';

// Use for simply testing purpose
if (!BACKEND_HOST) BACKEND_HOST = 'http://dat2409.online/api'

async function login(email, password) {
  const endpoint = '/auth/login';
  const url = BACKEND_HOST + endpoint;
  const {data} = await axios.post(url, { email, password });
  return data.metadata.token
}

async function register(name, email, password) {
  const endpoint = '/auth/register';
  const url = BACKEND_HOST + endpoint
  const {data} = await axios.post(url, {name, email, password})
  return data.metadata.token
}

export { login, register };
