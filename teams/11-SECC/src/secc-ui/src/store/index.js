import { configureStore } from "@reduxjs/toolkit"
import bdReducer from "./modules/bd"
import userReducer from "./modules/user"
import appReducer from "./modules/app"
import sessionStorage from "redux-persist/lib/storage/session"
import { combineReducers } from "redux"
import { persistReducer } from "redux-persist"
import thunk from "redux-thunk"

const reducers = combineReducers({
  app: appReducer,
  bd: bdReducer,
  user: userReducer,
})

const persistConfig = {
  key: "root",
  storage: sessionStorage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export default configureStore({
  reducer: persistedReducer,
  // eslint-disable-next-line
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
})
