import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createInstance } from '../../services/axios.service'
import axios from 'axios'

const initialState = {
  scenarios: [],
  loading: false,
  error: null,
}

const scenarioSlice = createSlice({
  name: 'scenarios',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchScenarios.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchScenarios.fulfilled, (state, action) => {
        state.loading = false
        state.scenarios = action.payload
        state.error = null
      })
      .addCase(fetchScenarios.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

// Thunks
export const fetchScenarios = createAsyncThunk(
  'scenarios/fetchScenarios',
  async (token, thunkAPI) => {
    try {
      const instance = createInstance(token)
      const { data } = await instance.get('/scenarios')
      return data.metadata.scenarios
    } catch (error) {
      return thunkAPI.rejectWithValue('There is an error in fetching scenarios')
    }
  }
)

// Export actions

// Export reducer
export default scenarioSlice.reducer
