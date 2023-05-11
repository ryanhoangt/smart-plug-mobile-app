const { default: axios } = require('axios')
import appConfig from '../configs/app.config'

const BACKEND_HOST = appConfig.BACKEND_HOST

async function login(email, password) {
  const endpoint = '/auth/login'
  const url = BACKEND_HOST + endpoint
  const { data } = await axios.post(url, { email, password })
  return {
    id: data.metadata.id,
    token: data.metadata.token,
    name: data.metadata.name,
  }
}

async function register(name, email, password) {
  const endpoint = '/auth/register'
  const url = BACKEND_HOST + endpoint
  const { data } = await axios.post(url, { name, email, password })
  return {
    id: data.metadata.id,
    token: data.metadata.token,
    name: data.metadata.name,
  }
}

function logout() {}

export { login, register }
