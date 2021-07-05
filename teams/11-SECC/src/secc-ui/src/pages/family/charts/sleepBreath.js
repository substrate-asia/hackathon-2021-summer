/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-28 07:51:07
 * @Description: 睡眠呼吸心率监测
 */

import React from "react"
import * as echarts from "echarts"
import { getSleepSign } from "@/api/backend"
import { DEVICE_TYPE } from "@/const/type"

class SleepBreath extends React.Component {
  constructor() {
    super()
    this.state = {
      xData: [],
      heartData: [],
      breathData: [],
    }
  }

  componentDidMount() {
    this.getSleepSign()
  }

  UNSAFE_componentWillReceiveProps() {
    this.getSleepSign()
  }

  async getSleepSign() {
    let device = this.props.deviceList.find((item) => {
      return item.deviceType + "" === DEVICE_TYPE.MATTRESS
    })
    if (device) {
      let res = await getSleepSign(device.deviceSN)
      let xData = res.data.map((item) => item.DataTime.substring(6))
      let heartData = res.data.map((item) => item.HeartRate)
      let breathData = res.data.map((item) => item.BreathRate)
      this.setState(
        {
          xData: xData,
          heartData: heartData,
          breathData: breathData,
        },
        () => {
          if (
            heartData &&
            heartData.length > 0 &&
            breathData &&
            breathData.length > 0
          ) {
            this.showCharts()
          }
        }
      )
    }
  }

  componentDidUpdate() {
    // this.getSleepSign();
  }

  showCharts() {
    var chartDom = document.getElementById("sleep_sign")
    var myChart = echarts.init(chartDom)
    var option

    option = {
      title: {
        text: "睡眠呼吸心率监测",
      },
      legend: {
        right: 20,
        data: ["呼吸", "心率"],
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
          name: "呼吸",
          type: "line",
          stack: "睡眠",
          smooth: true,
          data: this.state.heartData,
        },
        {
          name: "心率",
          type: "line",
          stack: "睡眠",
          smooth: true,
          data: this.state.breathData,
        },
      ],
    }

    this.state.xData &&
      this.state.heartData &&
      this.state.heartData.length > 0 &&
      this.state.breathData &&
      this.state.breathData.length > 0 &&
      myChart.setOption(option)
  }

  render() {
    return (
      <div>
        {this.state.xData &&
          this.state.heartData &&
          this.state.heartData.length > 0 &&
          this.state.breathData &&
          this.state.breathData.length > 0 && (
            <p id="sleep_sign" style={{ height: 300 }}></p>
          )}
      </div>
    )
  }
}

export default SleepBreath
