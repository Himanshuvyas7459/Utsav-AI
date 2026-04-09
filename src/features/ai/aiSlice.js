import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { generatePlanAPI } from "./aiService"

export const generateAIPlan = createAsyncThunk(
  "ai/generatePlan",
  async (formData, { rejectWithValue }) => {
    try {
      const data = await generatePlanAPI(formData)
      return data   // FULL RESPONSE
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "AI failed")
    }
  }
)

const aiSlice = createSlice({
  name: "ai",
  initialState: {
    data: null,     // IMPORTANT
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateAIPlan.pending, (state) => {
        state.loading = true
        state.data = null
      })
      .addCase(generateAIPlan.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload   // FINAL DATA STORE
        console.log("REDUX STORE DATA:", action.payload)
      })
      .addCase(generateAIPlan.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export default aiSlice.reducer