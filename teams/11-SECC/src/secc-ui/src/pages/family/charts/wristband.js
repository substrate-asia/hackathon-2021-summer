/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-28 05:34:47
 * @Description:
 */
import React from "react"
import * as echarts from "echarts"
import { getWristband } from "@/api/backend"
import { DEVICE_TYPE } from "@/const/type"

class Wristband extends React.Component {
  constructor() {
    super()
    this.state = {
      xData: [],
      yData: [],
    }
  }

  componentDidMount() {
    this.getWristband()
  }

  UNSAFE_componentWillReceiveProps() {
    this.getWristband()
  }

  async getWristband() {
    let device = this.props.deviceList.find((item) => {
      return item.deviceType + "" === DEVICE_TYPE.WRISTBAND
    })
    if (device) {
      let res = await getWristband(device.deviceSN)
      let xData = res.data.map((item) => item.DataTime.substring(6))
      let yData = res.data.map((item) => item.HeartRate)
      this.setState(
        {
          xData: xData,
          yData: yData,
        },
        () => {
          if (xData && xData.length > 0 && yData && yData.length > 0) {
            this.showCharts()
          }
        }
      )
    }
  }

  componentDidUpdate() {
    // this.getWristband();
  }

  showCharts() {
    var chartDom = document.getElementById("main")
    var myChart = echarts.init(chartDom)
    var option

    option = {
      title: {
        text: "手环心率监测",
      },
      xAxis: {
        type: "category",
        data: this.state.xData,
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: this.state.yData,
          type: "line",
          smooth: true,
        },
      ],
    }

    this.state.xData &&
      this.state.xData.length > 0 &&
      this.state.yData &&
      this.state.yData.length > 0 &&
      myChart.setOption(option)
  }

  render() {
    return (
      <div>
        {this.state.xData &&
          this.state.xData.length > 0 &&
          this.state.yData &&
          this.state.yData.length > 0 && <p id="main" style={{ height: 300 }}></p>}
      </div>
    )
  }
}

export default Wristband
