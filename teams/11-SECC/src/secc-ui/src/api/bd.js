/* eslint-disable no-undef */
/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-15 22:03:01
 * @Description: 百度api
 */
import axios from "axios"

let api_key = process.env.REACT_APP_BD_API_KEY
let secret_key = process.env.REACT_APP_BD_SECRET_KEY

export const getAccessToken = () => {
  return axios({
    method: "get",
    url: "/bdapi/oauth/2.0/token",
    params: {
      grant_type: "client_credentials",
      client_id: api_key,
      client_secret: secret_key,
    },
  })
}
/**
 *
 * @param {*} access_token
 * @param {*} image
 */
export const classifyDish = (access_token, image) => {
  return axios({
    method: "post",
    url: `/bdapi/rest/2.0/image-classify/v2/dish?access_token=${access_token}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: `image=${image}&filter_threshold=0.95`,
  })
}
