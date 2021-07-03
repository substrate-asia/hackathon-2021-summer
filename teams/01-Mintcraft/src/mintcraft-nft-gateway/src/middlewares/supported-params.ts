import _ from 'lodash'
import { Middleware } from '@koa/router'

export default (field: string, values: string[]): Middleware => {
  return async (ctx, next) => {
    const name = ctx.params[field]
    if (!_.includes(values, name)) {
      return ctx.throw(404, `unsupported ${field}: ${name}`)
    }
    // go next
    await next()
  } // end Middleware
}
