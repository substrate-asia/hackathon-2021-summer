/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-14 23:36:59
 * @Description:
 */
import React from "react"
import { connect } from "react-redux"
import { TabBar } from "antd-mobile"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { cryptoWaitReady } from "@polkadot/util-crypto"
import typeSettings from "@/const/typeSettings"
import Family from "../family"
import Mine from "../mine"
import "./index.less"

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      hidden: false,
      fullScreen: false,
      isLoading: true,
    }
  }

  /**
   * 初始化polkadot api
   */
  async initApi() {
    if (!this.props.app.api) {
      await cryptoWaitReady()
      // eslint-disable-next-line no-undef
      const wsProvider = new WsProvider(process.env.REACT_APP_WS_URL)
      const api = await ApiPromise.create({
        provider: wsProvider,
        types: typeSettings,
      })
      this.props.setAPI(api)
    }
    this.setState({
      isLoading: false,
    })
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#4DCBD5"
        barTintColor="white"
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="家人"
          key="family"
          icon={
            <i className="iconfont icon-jiatingxinxi" style={{ fontSize: "22px" }} />
          }
          selectedIcon={
            <i
              className="iconfont icon-jiatingxinxi"
              style={{ fontSize: "22px", color: "#4DCBD5" }}
            />
          }
          selected={this.props.app.activeName === "family"}
          onPress={() => {
            this.props.setActiveName("family")
          }}
          data-seed="logId"
        >
          <Family />
        </TabBar.Item>
        <TabBar.Item
          icon={<i className="iconfont icon-wode1" style={{ fontSize: "22px" }} />}
          selectedIcon={
            <i
              className="iconfont icon-wode1"
              style={{ fontSize: "22px", color: "#4DCBD5" }}
            />
          }
          title="我的"
          key="mine"
          selected={this.props.app.activeName === "mine"}
          onPress={() => {
            this.props.setActiveName("mine")
          }}
          data-seed="logId1"
        >
          <Mine />
        </TabBar.Item>
      </TabBar>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  setActiveName: (activeName) =>
    dispatch({
      type: "app/setActiveName",
      payload: activeName,
    }),
  setAccessToken: (accessToken) =>
    dispatch({
      type: "bd/setAccessToken",
      payload: accessToken,
    }),
})
function mapStateToProps(state) {
  return { ...state }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
