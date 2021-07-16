import { createSlice } from "@reduxjs/toolkit"

export const bdSlice = createSlice({
  name: "bd",
  initialState: {
    accessToken: "",
  },
  reducers: {
    setAccessToken: (state, action) => {
      state.accessToken = action.payload
      return state
    },
  },
})

export const { setAccessToken } = bdSlice.actions

export default bdSlice.reducer
