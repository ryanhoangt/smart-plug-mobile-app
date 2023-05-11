import { configureStore, createStore } from '@reduxjs/toolkit'
import deviceReducer from './features/deviceSlice'
import scenarioReducer from './features/scenarioSlice'
import sensorReducer from './features/sensorSlice'

const logger = (store) => (next) => (action) => {
  console.log(action.type)
  let result = next(action)
  // console.log('next state', store.getState())
  return result
}

const store = configureStore({
  reducer: {
    devices: deviceReducer,
    scenarios: scenarioReducer,
    sensors: sensorReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})

export default store
