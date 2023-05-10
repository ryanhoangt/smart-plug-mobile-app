import { configureStore, createStore } from '@reduxjs/toolkit'
import deviceReducer from './features/deviceSlice'
import scenarioReducer from './features/scenarioSlice'

const store = configureStore({
  reducer: {
    devices: deviceReducer,
    scenarios: scenarioReducer,
  },
})

export default store
