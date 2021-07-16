/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-24 08:33:23
 * @Description:
 */
import React from "react"
import { NavBar, Icon } from "antd-mobile"
import { useHistory } from "react-router-dom"
import "./index.less"

function Nav(props) {
  let history = useHistory()

  return (
    <div className="nav">
      <NavBar
        mode="dark"
        icon={!props.hideIcon && <Icon type="left" />}
        onLeftClick={() => history.goBack()}
      >
        {props.children}
      </NavBar>
    </div>
  )
}

export default Nav
