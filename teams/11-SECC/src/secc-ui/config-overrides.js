/* eslint-disable no-undef */
/*
 * @Author: wudi(max24@vip.qq.com)
 * @Date: 2021-06-15 00:03:48
 * @Description: 覆盖webpack的配置
 * github: https://github.com/arackaf/customize-cra
 */
const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addLessLoader,
} = require("customize-cra")
const path = require("path")
const theme = require("./package.json").theme

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, "./src/"),
  }),
  fixBabelImports("import", {
    libraryName: "antd-mobile",
    style: "css",
  }),
  addLessLoader({
    strictMath: true,
    noIeCompat: true,
    loader: "css-loader",
    javascriptEnabled: true,
    modifyVars: theme,
    options: {
      modules: {
        localIdentName: "[name]__[local]___[hash:base64:5]",
      },
      sourceMap: true,
    },
  }),
  (config) => {
    //修改、添加loader 配置 :
    // 所有的loaders规则是在config.module.rules(数组)的第二项
    // 即：config.module.rules[2].oneof  (如果不是，具体可以打印 一下是第几项目)
    // 修改 less 配置 ，规则 loader 在第7项(具体可以打印配置)
    const loaders = config.module.rules.find((rule) =>
      Array.isArray(rule.oneOf)
    ).oneOf
    loaders[8].use.push({
      loader: "style-resources-loader",
      options: {
        patterns: [
          path.resolve(__dirname, "src/assets/styles/variable.less"),
          path.resolve(__dirname, "src/assets/styles/antd-mobile.less"),
        ],
      },
    })
    return config
  }
)
