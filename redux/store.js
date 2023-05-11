import { configureStore, createStore } from '@reduxjs/toolkit'
import deviceReducer from './features/deviceSlice'
import sensorReducer from './features/sensorSlice'
import scenarioReducer from './features/scenarioSlice'

const store = configureStore({
  reducer: {
    devices: deviceReducer,
    sensors: sensorReducer,
    scenarios: scenarioReducer,
  },
})

export default store
