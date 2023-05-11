import axios from 'axios'
import appConfig from '../configs/app.config'

function createInstance(token) {
  return axios.create({
    baseURL: appConfig.BACKEND_HOST,
    timeout: 10000,
    headers: { Authorization: 'Bearer ' + token },
  })
}

export { createInstance }
