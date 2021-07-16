/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-22 00:06:19
 * @Description:
 */
import React from "react"
import NavBar from "@/components/nav"
import {
  List,
  InputItem,
  WhiteSpace,
  Button,
  WingBlank,
  Picker,
  Toast,
} from "antd-mobile"
import { RELATIVES_DIC, CHRONIC_DIC } from "@/const/dic"
import { connect } from "react-redux"
import "./index.less"
import { stringToHex } from "@polkadot/util"
import { Keyring } from "@polkadot/keyring"
import { withRouter } from "react-router-dom"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { cryptoWaitReady } from "@polkadot/util-crypto"
import typeSettings from "@/const/typeSettings"

function Nav() {
  return (
    <div className="nav">
      <NavBar>添加家人</NavBar>
    </div>
  )
}

class AddFamily extends React.Component {
  constructor() {
    super()
    this.state = {
      relative: "",
      loading: false,
      chronic: [],
    }
  }

  async submit() {
    await cryptoWaitReady()
    // eslint-disable-next-line
    const wsProvider = new WsProvider(process.env.REACT_APP_WS_URL)
    const api = await ApiPromise.create({
      provider: wsProvider,
      types: typeSettings,
    })
    this.setState({
      loading: true,
    })
    let name = this.nameInput.state.value
    let idNo = this.IDInput.state.value
    let height = this.heightInput.state.value
    let weight = this.weightInput.state.value

    const keyring = new Keyring({ type: "sr25519" })
    const pair = keyring.addFromUri(this.props.user.mnemonic)

    api.tx.healthAi
      .bind(this.state.relative, {
        name: stringToHex(name),
        id_card: stringToHex(idNo),
        height: height,
        weight: weight,
        chronic: stringToHex(this.state.chronic.join(",")),
      })
      .signAndSend(pair, (result) => {
        if (result.status.isInBlock) {
          this.setState({
            loading: false,
          })
          Toast.success("亲属添加成功！")
          this.props.history.goBack()
        } else if (result.status.isFinalized) {
          this.setState({
            loading: false,
          })
        }
      })
  }
  onChangeChronic(val) {
    let { chronic } = this.state
    if (!chronic.includes(val)) {
      chronic.push(val)
    } else {
      let chronicIndex = chronic.indexOf(val)
      chronic.splice(chronicIndex, 1)
    }
    this.setState({
      chronic: chronic,
    })
  }

  render() {
    return (
      <div className="family-wrapper content-wrapper">
        <Nav></Nav>
        <h2 className="title">家人信息</h2>
        <List>
          <InputItem
            clear
            placeholder="请输入姓名"
            ref={(el) => (this.nameInput = el)}
          >
            姓名
          </InputItem>
          <InputItem
            clear
            placeholder="请输入身份证号"
            maxLength={18}
            ref={(el) => (this.IDInput = el)}
          >
            身份证号
          </InputItem>
          <InputItem
            clear
            placeholder="请输入身高"
            type="digit"
            ref={(el) => (this.heightInput = el)}
          >
            身高(cm)
          </InputItem>
          <InputItem
            clear
            placeholder="请输入体重"
            type="digit"
            ref={(el) => (this.weightInput = el)}
          >
            体重(kg)
          </InputItem>
          <Picker
            value={this.state.relative}
            data={RELATIVES_DIC}
            cols={1}
            className="forss"
            onOk={(v) => this.setState({ relative: v })}
          >
            <List.Item arrow="horizontal">关系</List.Item>
          </Picker>
        </List>
        <h2 className="title">慢性病</h2>
        <div className="chronic-list">
          {CHRONIC_DIC.map((item) => {
            return (
              <div
                key={item.value}
                className={`item ${
                  this.state.chronic.includes(item.value) ? "selected" : null
                }`}
                onClick={() => {
                  this.onChangeChronic(item.value)
                }}
              >
                {item.label}
              </div>
            )
          })}
        </div>
        <WhiteSpace />
        <WhiteSpace />
        <WhiteSpace />
        <WingBlank>
          <Button
            type="primary"
            loading={this.state.loading}
            onClick={this.submit.bind(this)}
          >
            提交
          </Button>
        </WingBlank>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return Object.assign({}, state)
}

export default connect(mapStateToProps)(withRouter(AddFamily))
