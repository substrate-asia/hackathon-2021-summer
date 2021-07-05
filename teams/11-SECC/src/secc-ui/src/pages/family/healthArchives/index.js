/* eslint-disable react/jsx-key */
/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-30 16:23:40
 * @Description:
 */
import React from "react"
import Nav from "@/components/nav"
import { connect } from "react-redux"
import { WhiteSpace, WingBlank } from "antd-mobile"
import { getHealthArchives } from "@/api/backend"

class HealthArchives extends React.Component {
  constructor() {
    super()
    this.state = {
      imgList: [],
    }
  }

  componentDidMount() {
    this.getList()
  }

  async getList() {
    let res = await getHealthArchives(this.props.user.currentRelatives.id_card)
    this.setState({
      imgList: res.data.map((item) => item.FileHash),
    })
  }

  render() {
    return (
      <div className="content-wrapper">
        <Nav>健康档案</Nav>
        <WhiteSpace></WhiteSpace>
        <WingBlank>
          {this.state.imgList.map((fileHash) => {
            return (
              <div key="fileHash">
                <img src={"https://www.hiwudi.com/ipfs/" + fileHash} alt="" />
                <WhiteSpace></WhiteSpace>
              </div>
            )
          })}
        </WingBlank>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return Object.assign({}, state)
}

export default connect(mapStateToProps)(HealthArchives)
