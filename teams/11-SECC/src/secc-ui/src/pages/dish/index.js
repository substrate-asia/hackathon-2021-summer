/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-23 20:31:20
 * @Description:  菜品识别
 */
import React from "react"
import { connect } from "react-redux"
import { Button, ImagePicker } from "antd-mobile"
import { getAccessToken, classifyDish } from "@/api/bd"
import { WingBlank, WhiteSpace } from "antd-mobile"
import Nav from "@/components/nav"
import "./index.less"

class Dish extends React.Component {
  constructor() {
    super()
    this.state = {
      dishImg: "",
      dishName: "",
      loading: false,
      files: [],
      isForbidden: false,
    }
  }

  async handleClick() {
    let accessToken = this.props.bd.accessToken
    this.setState({
      loading: true,
    })
    if (!accessToken) {
      let res = await getAccessToken()
      accessToken = res.data.access_token
      this.props.setAccessToken(accessToken)
    }
    let { dishImg } = this.state
    let res2 = await classifyDish(accessToken, encodeURIComponent(dishImg))
    let dishName = res2.data.result[0].name
    let { chronicTaboos } = this.props.user
    let isForbidden = false
    Object.keys(chronicTaboos).forEach((chronic) => {
      let taboosInclude = chronicTaboos[chronic].includes(dishName)
      if (taboosInclude) {
        isForbidden = taboosInclude
      }
    })
    this.setState({
      dishName: dishName,
      loading: false,
      isForbidden: isForbidden,
    })
  }
  uploadFile() {
    document.querySelector("#upload").click()
  }
  onChange(files) {
    if (files && files.length > 0) {
      let image = files[0]
      let { url } = image
      this.setState({
        dishImg: url.substring(url.indexOf("base64") + 7),
      })
    } else {
      this.setState({
        dishImg: "",
        dishName: "",
      })
    }
    this.setState({
      files,
    })
  }

  render() {
    return (
      <div className="dish-wrapper">
        <Nav>菜品识别</Nav>
        <div className="content-wrapper">
          <WhiteSpace />
          <h3>请拍照或从相册选择图片：</h3>
          <div className="picker-wrapper">
            <ImagePicker
              files={this.state.files}
              onChange={this.onChange.bind(this)}
              selectable={this.state.files.length === 0}
              accept="image/gif,image/jpeg,image/jpg,image/png"
            />
          </div>
          <div>
            {this.state.dishImg !== "" && (
              <WingBlank size="md">
                <img src={this.state.dishImg} alt="" />
                <WhiteSpace />
                <Button
                  type="primary"
                  loading={this.state.loading}
                  onClick={this.handleClick.bind(this)}
                >
                  立即识别
                </Button>
                <WhiteSpace />
              </WingBlank>
            )}
            {this.state.dishName !== "" && (
              <span>
                饮食建议：{this.state.isForbidden ? "忌吃" : "可以吃"}
                {this.state.dishName}
              </span>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  setAccessToken: (accessToken) =>
    dispatch({
      type: "bd/setAccessToken",
      payload: accessToken,
    }),
})
function mapStateToProps(state) {
  return Object.assign({}, state)
}

export default connect(mapStateToProps, mapDispatchToProps)(Dish)
