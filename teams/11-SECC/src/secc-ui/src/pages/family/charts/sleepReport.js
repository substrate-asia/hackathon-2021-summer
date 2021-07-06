/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-28 05:34:47
 * @Description:
 */
import React from "react"
import * as echarts from "echarts"
import { getSleepReport } from "@/api/backend"
import { DEVICE_TYPE } from "@/const/type"

class SleepReport extends React.Component {
  constructor() {
    super()
    this.state = {
      xData: [],
      deepYData: [],
      shalowYData: [],
    }
  }

  componentDidMount() {
    this.getSleepReport()
  }

  UNSAFE_componentWillReceiveProps() {
    this.getSleepReport()
  }

  async getSleepReport() {
    let device = this.props.deviceList.find((item) => {
      return item.deviceType + "" === DEVICE_TYPE.MATTRESS
    })
    if (device) {
      let res = await getSleepReport(device.deviceSN)
      let xData = res.data.map((item) => item.DataTime.substring(6))
      let deepYData = res.data.map((item) => item.DeepSleep)
      let shalowYData = res.data.map((item) => item.LightSleep)
      this.setState(
        {
          xData: xData,
          deepYData: deepYData,
          shalowYData: shalowYData,
        },
        () => {
          if (
            this.state.deepYData &&
            this.state.deepYData.length > 0 &&
            this.state.shalowYData &&
            this.state.shalowYData.length > 0
          ) {
            this.showCharts()
          }
        }
      )
    }
  }

  componentDidUpdate() {
    // this.getSleepReport();
  }

  showCharts() {
    var chartDom = document.getElementById("sleep")
    var myChart = echarts.init(chartDom)
    var option

    option = {
      title: {
        text: "睡眠质量监测",
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      legend: {
        right: 20,
        data: ["深睡时长", "浅睡时长"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          data: this.state.xData,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "深睡时长",
          type: "bar",
          stack: "睡眠",
          emphasis: {
            focus: "series",
          },
          data: this.state.deepYData,
        },
        {
          name: "浅睡时长",
          type: "bar",
          stack: "睡眠",
          emphasis: {
            focus: "series",
          },
          data: this.state.shalowYData,
        },
      ],
    }

    this.state.xData &&
      this.state.deepYData &&
      this.state.deepYData.length > 0 &&
      this.state.shalowYData &&
      this.state.shalowYData.length > 0 &&
      myChart.setOption(option)
  }

  render() {
    return (
      <div>
        {this.state.xData &&
          this.state.deepYData &&
          this.state.deepYData.length > 0 &&
          this.state.shalowYData &&
          this.state.shalowYData.length > 0 && (
            <p id="sleep" style={{ height: 300 }}></p>
          )}
      </div>
    )
  }
}

export default SleepReport
