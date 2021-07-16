import { Middleware } from '@koa/router'

export default (): Middleware => {
  return async (ctx, next) => {
    // 正常继续
    await next()

    // 仅封装处理 200 ~ 299 的请求
    const isOk = ctx.status >= 200 && ctx.status < 300
    const isJson = ctx.response.type === 'application/json'
    if (isOk && isJson) {
      // 原始数据
      const obj = ctx.body
      const newData = {
        code: 0,
        message: 'OK',
        result: obj,
        error: undefined
      }
      // 判断是否存在 error
      if (ctx.state.error !== undefined) {
        newData.error = ctx.state.error
      }
      // 重新设置 data
      ctx.body = newData
    }
  } // end Middleware
}
