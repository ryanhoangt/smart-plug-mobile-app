import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { createInstance } from '../../services/axios.service'

const isActionPending = (action) =>
  action.type.startsWith('scenarios') && action.type.endsWith('/pending')
const isActionRejected = (action) =>
  action.type.startsWith('scenarios') && action.type.endsWith('/rejected')

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
      .addCase(fetchScenarios.fulfilled, (state, action) => {
        state.loading = false
        state.scenarios = action.payload
        state.error = null
      })
      .addCase(createScenario.fulfilled, (state, action) => {
        state.loading = false
        state.scenarios = [...state.scenarios, action.payload]
        state.error = null
      })
      .addMatcher(isActionRejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addMatcher(isActionPending, (state, action) => {
        state.loading = true
        state.error = null
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

export const createScenario = createAsyncThunk(
  'scenarios/createScenario',
  async ({ token, scenario }) => {
    try {
      const instance = createInstance(token)
      const { data } = await instance.post('/scenarios', scenario)
      const newScenario = data.metadata

      return newScenario
    } catch (error) {
      return thunkAPI.rejectWithValue('There is an error in creating scenario')
    }
  }
)

// Export actions

// Export reducer
export default scenarioSlice.reducer
