/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-15 23:08:47
 * @Description: 本地代理
 */
const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/bdapi", {
      target: "https://aip.baidubce.com",
      changeOrigin: true,
      pathRewrite: {
        "^/bdapi": "",
      },
    })
  )
  app.use(
    createProxyMiddleware("/backend", {
      target: "http://www.hiwudi.com:18080",
      changeOrigin: true,
      pathRewrite: {
        "^/backend": "",
      },
    })
  )
}
