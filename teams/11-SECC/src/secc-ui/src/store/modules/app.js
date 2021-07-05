import { createSlice } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    activeName: "family",
    api: null,
  },
  reducers: {
    setActiveName: (state, action) => {
      state.activeName = action.payload
      return state
    },
    setAPI: (state, action) => {
      state.api = action.payload
      return state
    },
  },
})

export const { setActiveName, setAPI } = appSlice.actions

export default appSlice.reducer
