import { createStore,combineReducers } from "redux";
import config from "./reducer/Config";
import app from "./reducer/App";

//创建Reducer对象
const allReducer = {
    config,app
}
//创建Reducer对象
const rootReducer = combineReducers(allReducer);
//创建Store实例
const store = createStore(rootReducer);

export default store;