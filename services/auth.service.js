const { default: axios } = require('axios');
import { BACKEND_HOST } from '@env';

async function login(email, password) {
  const endpoint = '/auth/login';
  const url = BACKEND_HOST + endpoint;
  const { data } = await axios.post(url, { email, password });
  console.log(data.metadata.token);
  return {
    id: data.metadata.id,
    token: data.metadata.token,
    name: data.metadata.name,
  };
}

async function register(name, email, password) {
  const endpoint = '/auth/register';
  const url = BACKEND_HOST + endpoint;
  const { data } = await axios.post(url, { name, email, password });
  return {
    id: data.metadata.id,
    token: data.metadata.token,
    name: data.metadata.name,
  };
}

export { login, register };
