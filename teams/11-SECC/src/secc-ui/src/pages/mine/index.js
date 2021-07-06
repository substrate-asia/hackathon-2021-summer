/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-22 14:35:11
 * @Description: 我的
 */
import React from "react"
// import { NavBar } from "antd-mobile";
import BasicNav from "@/components/nav"
import "./index.less"
import { connect } from "react-redux"
import { WhiteSpace, WingBlank, Button } from "antd-mobile"
import { hexToNumber, u8aToString } from "@polkadot/util"
import { RELATIVES_TYPE } from "@/const/type"
import { idToGender, idToAge } from "@/util"
import { Link } from "react-router-dom"
import emptyImg from "@/assets/images/myempty.png"
import { ApiPromise, WsProvider } from "@polkadot/api"
import { cryptoWaitReady } from "@polkadot/util-crypto"
import typeSettings from "@/const/typeSettings"
import avatarMale from "@/assets/images/male.png"
import avatarFemale from "@/assets/images/female.png"

function Nav() {
  return <BasicNav hideIcon>我的</BasicNav>
}

class Mine extends React.Component {
  constructor() {
    super()
    this.state = {
      user: {
        id_card: "",
        height: "",
        weight: "",
      },
      loaded: false,
      empty: false,
    }
  }

  componentDidMount() {
    this.getMyselfInfo()
  }

  /**
   * 获取本人信息
   */
  async getMyselfInfo() {
    await cryptoWaitReady()
    // eslint-disable-next-line
    const wsProvider = new WsProvider(process.env.REACT_APP_WS_URL)
    const api = await ApiPromise.create({
      provider: wsProvider,
      types: typeSettings,
    })
    let result = await api.query.healthAi.relations(
      this.props.user.addr,
      RELATIVES_TYPE.SELF
    )
    if (!result.isEmpty) {
      let person = result.value
      this.setState({
        user: {
          id_card: u8aToString(person.get("id_card")),
          name: u8aToString(person.get("name")),
          height: hexToNumber(person.get("height")),
          weight: hexToNumber(person.get("weight")),
        },
      })
    } else {
      this.setState({
        empty: true,
      })
    }
    this.setState({
      loaded: true,
    })
  }

  render() {
    let genderImg =
      idToGender(this.state.user.id_card) === "男" ? avatarMale : avatarFemale

    return (
      <div className="content-wrapper">
        {this.props.app.activeName === "mine" && <Nav></Nav>}
        {this.state.loaded && !this.state.empty && (
          <div className="info-card-wrapper">
            <img className="avatar" src={genderImg} />
            <div className="info">
              <div>
                <span className="label">姓名：</span>
                <span className="data">{this.state.user.name}</span>
                <span className="label" style={{ marginLeft: "16px" }}>
                  年龄：
                </span>
                <span className="data">{idToAge(this.state.user.id_card)}</span>
              </div>
              <div>
                <span className="label">性别：</span>
                <span className="data">{idToGender(this.state.user.id_card)}</span>
              </div>
              <div>
                <span className="label">钱包地址：</span>
                <span className="data">{this.props.user.addr}</span>
              </div>
            </div>
          </div>
          // <List>
          //   <InputItem
          //     clear
          //     value={this.props.user.addr}
          //     editable={false}
          //     placeholder="请输入钱包地址"
          //     ref={(el) => (this.nameInput = el)}
          //   >
          //     钱包地址
          //   </InputItem>
          //   <InputItem
          //     clear
          //     editable={this.state.empty}
          //     value={this.state.user.name}
          //     ref={(el) => (this.IDInput = el)}
          //   >
          //     姓名
          //   </InputItem>
          //   <InputItem
          //     clear
          //     editable={this.state.empty}
          //     value={idToAge(this.state.user.id_card)}
          //     type="digit"
          //     ref={(el) => (this.heightInput = el)}
          //   >
          //     年龄
          //   </InputItem>
          //   <InputItem
          //     clear
          //     editable={this.state.empty}
          //     value={idToGender(this.state.user.id_card)}
          //     ref={(el) => (this.weightInput = el)}
          //   >
          //     性别
          //   </InputItem>
          // </List>
        )}
        <WhiteSpace />
        <WingBlank>
          {this.state.empty && (
            <div className="empty-wrapper">
              <img src={emptyImg} className="avatar" />
              <div className="tip">还没有添加本人信息哦！</div>
              <Link to="/addFamily">
                <Button
                  type="primary"
                  size="small"
                  inline
                  icon={<i className="iconfont icon-add"></i>}
                >
                  马上添加
                </Button>
              </Link>
            </div>
          )}
        </WingBlank>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return Object.assign({}, state)
}

export default connect(mapStateToProps)(Mine)
