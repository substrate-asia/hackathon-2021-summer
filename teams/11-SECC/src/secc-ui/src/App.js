import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.less"
// import Home from "./pages/home";
// import AddFamily from "@/pages/addFamily";
// import BindDevice from "@/pages/family/bindDevice";
// import Dish from "./pages/dish";
// import HealthArchives from "@/pages/family/healthArchives";
import store from "./store"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistStore } from "redux-persist"

import loadable from "@/components/lazyload"
const Home = loadable(() => import("@/pages/home"))
const AddFamily = loadable(() => import("@/pages/addFamily"))
const BindDevice = loadable(() => import("@/pages/family/bindDevice"))
const Dish = loadable(() => import("@/pages/dish"))
const HealthArchives = loadable(() => import("@/pages/family/healthArchives"))
let persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <Switch>
              {/* 首页 */}
              <Route path="/" exact component={Home}></Route>
              {/* 添加家人 */}
              <Route path="/addFamily" exact component={AddFamily}></Route>
              {/* 菜品识别 */}
              <Route path="/dish" exact component={Dish}></Route>
              {/* 绑定设备 */}
              <Route path="/bindDevice" exact component={BindDevice}></Route>
              {/* 健康档案 */}
              <Route path="/healthArchives" exact component={HealthArchives}></Route>
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
