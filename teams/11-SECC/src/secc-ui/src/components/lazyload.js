/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-22 00:03:26
 * @Description: 懒加载
 */
import React from "react"
import Loadable from "react-loadable"
import { Icon } from "antd-mobile"

//通用的懒加载
const loadingComponent = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Icon size="lg" type="loading" style={{ margin: "0 auto" }} />
    </div>
  )
}

function lazyLoad(loader, loading = loadingComponent) {
  return Loadable({
    loader, //需要懒加载的组件
    loading,
  })
}
//loading 组件通用,
export default lazyLoad
