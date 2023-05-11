import { createSlice, createAsyncThunk, isPending } from '@reduxjs/toolkit'
import { createInstance } from '../../services/axios.service'
import { getAdafruitKey } from '../../services/mqtt.service'
import MQTTCLient from '../../model/MQTTClient'

const initialState = {
  devices: [],
  loading: false,
  error: null,
}

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    setState(state, action) {
      const { deviceId, value } = action.payload
      const device = state.devices.find((device) => device._id == deviceId)

      if (device) {
        device.state = value
        const mqttClient = MQTTCLient.getInstance()
        mqttClient.publish(getAdafruitKey(device.topic), value ? '1' : '0')
      }

      return state
    },

    updateState(state, action) {
      console.log(action.payload)
      const { topic, message } = action.payload
      const device = state.devices.find(
        (device) => getAdafruitKey(device.topic) == topic
      )

      if (device) device.state = message == '1'
      return state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.loading = false
        state.devices = action.payload
        state.error = null
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

// Thunks
export const fetchDevices = createAsyncThunk(
  'devices/fetchDevices',
  async (token, thunkAPI) => {
    try {
      const instance = createInstance(token)
      const { data } = await instance.get('/devices')
      const devices = data.metadata.devices

      const mqttClient = MQTTCLient.getInstance()
      devices.forEach(({ topic }) =>
        mqttClient.subscribe(getAdafruitKey(topic), (err) => {
          if (err) {
            thunkAPI.rejectWithValue('Failed to subscribe ' + topic)
            return
          }

          console.log('Subscribed to ' + topic)
        })
      )

      return devices
    } catch (error) {
      return thunkAPI.rejectWithValue('There is an error in fetching devices')
    }
  }
)

// Export actions
export const { setState, updateState } = deviceSlice.actions

// Export reducer
export default deviceSlice.reducer
