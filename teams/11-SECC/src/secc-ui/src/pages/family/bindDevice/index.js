/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-24 19:49:24
 * @Description: 绑定设备
 */
import React from "react"
import { NavBar, Icon } from "antd-mobile"
import { useHistory } from "react-router-dom"
import {
  List,
  InputItem,
  WhiteSpace,
  Button,
  WingBlank,
  Picker,
  Toast,
} from "antd-mobile"
import { DEVICE_DIC } from "@/const/dic"
import { connect } from "react-redux"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { cryptoWaitReady } from "@polkadot/util-crypto"
import typeSettings from "@/const/typeSettings"
import { hexToNumber, u8aToString } from "@polkadot/util"
import { Keyring } from "@polkadot/keyring"
import { toDicLabel } from "@/util"
import "./index.less"

function Nav() {
  let history = useHistory()

  return (
    <div className="nav">
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
      >
        绑定设备
      </NavBar>
    </div>
  )
}

class AddFamily extends React.Component {
  constructor() {
    super()
    this.state = {
      deviceList: [],
      deviceType: "",
      deviceSN: "",
      loading: false,
    }
  }

  componentDidMount() {
    this.getList()
  }

  /**
   * 获取设备列表
   */
  async getList() {
    await cryptoWaitReady()
    // eslint-disable-next-line
    const wsProvider = new WsProvider(process.env.REACT_APP_WS_URL)
    const api = await ApiPromise.create({
      provider: wsProvider,
      types: typeSettings,
    })
    let res = await api.query.signData.acOwnedDevices([
      this.props.user.addr,
      this.props.user.currentRelatives.relationType,
    ])
    if (!res.isEmpty) {
      let deviceList = res.value.map((item) => {
        return {
          deviceType: hexToNumber(item[0]),
          deviceSN: u8aToString(item[1]),
        }
      })
      this.props.setDeviceList(deviceList)
      this.setState({
        deviceList: deviceList,
      })
    } else {
      this.props.setDeviceList([])
      this.setState({
        deviceList: [],
      })
    }
  }

  async submit() {
    this.setState({
      loading: true,
    })

    const keyring = new Keyring({ type: "sr25519" })
    const pair = keyring.addFromUri(this.props.user.mnemonic)

    const wsProvider = new WsProvider(process.env.REACT_APP_WS_URL)
    const api = await ApiPromise.create({
      provider: wsProvider,
      types: typeSettings,
    })
    api.tx.signData
      .bind(
        this.props.user.currentRelatives.relationType,
        this.state.deviceType,
        this.state.deviceSN
      )
      .signAndSend(pair, (result) => {
        if (result.status.isInBlock) {
          this.setState({
            loading: false,
          })
          Toast.success("设备绑定成功！")
          this.getList()
        } else if (result.status.isFinalized) {
          this.setState({
            loading: false,
          })
        }
      })
  }

  render() {
    return (
      <div>
        <Nav></Nav>
        <List renderHeader={() => "设备信息"}>
          <Picker
            value={this.state.deviceType}
            data={DEVICE_DIC}
            cols={1}
            onOk={(v) => this.setState({ deviceType: v })}
          >
            <List.Item arrow="horizontal">设备类型</List.Item>
          </Picker>
          <InputItem
            clear
            placeholder="请输入设备编号"
            value={this.state.deviceSN}
            onChange={(val) => {
              this.setState({
                deviceSN: val,
              })
            }}
          >
            设备编号
          </InputItem>
        </List>
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>
          <Button
            type="primary"
            loading={this.state.loading}
            onClick={this.submit.bind(this)}
          >
            添加
          </Button>
        </WingBlank>
        <WhiteSpace />
        {this.state.deviceList && this.state.deviceList.length > 0 && (
          <List renderHeader={() => "已绑定设备"} className="my-list">
            {this.state.deviceList.map((item) => {
              return (
                <List.Item extra={item.deviceSN} key={item.deviceSN}>
                  {toDicLabel(item.deviceType, "DEVICE_DIC")}
                </List.Item>
              )
            })}
          </List>
        )}
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => ({
  setDeviceList: (deviceList) =>
    dispatch({
      type: "user/setDeviceList",
      payload: deviceList,
    }),
})

function mapStateToProps(state) {
  return Object.assign({}, state)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFamily)
