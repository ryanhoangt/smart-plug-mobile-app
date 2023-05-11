import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createInstance } from '../../services/axios.service'
import { getAdafruitKey } from '../../services/mqtt.service'
import MQTTCLient from '../../model/MQTTClient'
// import { isActionPending, isActionRejected } from '../utils'

const isActionPending = (action) =>
  action.type.startsWith('sensors') && action.type.endsWith('/pending')
const isActionRejected = (action) =>
  action.type.startsWith('sensors') && action.type.endsWith('/rejected')

const initialState = {
  sensors: [],
  loading: false,
  error: null,
}

const sensorSlice = createSlice({
  name: 'sensors',
  initialState,
  reducers: {
    updateSensorValue(state, action) {
      const { topic, value } = action.payload
      const sensor = state.sensors.find(
        (sensor) => getAdafruitKey(sensor.topic) == topic
      )

      if (sensor) sensor.value = value
      return state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSensors.fulfilled, (state, action) => {
        state.loading = false
        state.sensors = action.payload
        state.error = null
      })
      .addCase(createSensor.fulfilled, (state, action) => {
        state.loading = false
        state.sensors = [...state.sensors, action.payload]
        state.error = null
      })
      .addMatcher(isActionRejected, (state, action) => {
        state.loading = false
        // state.error = action.payload
      })
      .addMatcher(isActionPending, (state, action) => {
        state.loading = true
        state.error = null
      })
  },
})

// Thunks
export const fetchSensors = createAsyncThunk(
  'sensors/fetchSensors',
  async (token, thunkAPI) => {
    try {
      const instance = createInstance(token)
      const { data } = await instance.get('/sensors')
      const sensors = data.metadata.sensors

      const mqttClient = MQTTCLient.getInstance()

      const sensorTopics = sensors.map(({ topic }) => getAdafruitKey(topic))
      mqttClient.subscribe(sensorTopics, (err) => {
        if (err) return thunkAPI.rejectWithValue('Failed to subscribe devices')
        console.log(`Subscribed to ` + sensorTopics.join('\n'))
      })

      return sensors
    } catch (error) {
      return thunkAPI.rejectWithValue('There is an error in fetching sensors')
    }
  }
)

export const createSensor = createAsyncThunk(
  'sensors/createSensor',
  async ({ token, sensor }, thunkAPI) => {
    try {
      const instance = createInstance(token)
      const { data } = await instance.post('/sensors', sensor)
      const newSensor = data.metadata

      // Subscribe to mqtt
      const mqttClient = MQTTCLient.getInstance()
      mqttClient.subscribe(getAdafruitKey(newSensor.topic), (err) => {
        if (err)
          return thunkAPI.rejectWithValue(
            'Failed to subscribe ' + newSensor.topic
          )

        console.log('Subscribed to ' + newSensor.topic)
      })
      return newSensor
    } catch (error) {
      return thunkAPI.rejectWithValue('There is an error in creating sensors')
    }
  }
)

// Export selector
export const selectSensors = (state) => state.sensors

// Export actions
export const { updateSensorValue } = sensorSlice.actions

// Export reducer
export default sensorSlice.reducer
