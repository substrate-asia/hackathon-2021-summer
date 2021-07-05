/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-28 04:50:15
 * @Description:
 */
import axios from "axios"

export const getWristband = (deviceNo) => {
  return axios({
    method: "get",
    url: `/backend/v1/wristband/${deviceNo}`,
  })
}

export const getSleepSign = (deviceNo) => {
  return axios({
    method: "get",
    url: `/backend/v1/sleep/sign/${deviceNo}`,
  })
}

export const getSleepReport = (deviceNo) => {
  return axios({
    method: "get",
    url: `/backend/v1/sleep/report/${deviceNo}`,
  })
}

export const getHealthArchives = (id) => {
  return axios({
    method: "get",
    url: `/backend/v1/medical/${id}`,
  })
}
