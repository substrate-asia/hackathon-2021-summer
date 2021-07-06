import { createSlice } from "@reduxjs/toolkit"

export const user = createSlice({
  name: "user",
  initialState: {
    addr: "5FAA3M66deNYebZScfN2JvKxqxu73WJpJm8JuKXB8CVsrvut",
    mnemonic:
      "stone quarter describe awful salmon wave reveal injury transfer sniff athlete credit",
    // addr: "5DniUHH4FRsdeJeDPDVXSt5Q76oPvYdyN1Pj1F9cTQuHH8Zp",
    // mnemonic:
    //   "economy defy spend birth improve weather public absorb message merge fossil lens",
    currentRelatives: null,
    relativesList: [],
    deviceList: [],
    chronicTaboos: null,
  },
  reducers: {
    setAddr: (state, action) => {
      state.addr = action.payload
      return state
    },
    setMnemonic: (state, action) => {
      state.mnemonic = action.payload
      return state
    },
    setCurrentRelatives: (state, action) => {
      state.deviceList = []
      state.currentRelatives = action.payload
      return state
    },
    setRelativesList: (state, action) => {
      state.relativesList = action.payload
      return state
    },
    setDeviceList: (state, action) => {
      state.deviceList = action.payload
      return state
    },
    setChronicTaboos: (state, action) => {
      state.chronicTaboos = action.payload
      return state
    },
  },
})

export const {
  setAddr,
  setMnemonic,
  setCurrentRelatives,
  setRelativesList,
  setDeviceList,
} = user.actions

export default user.reducer
