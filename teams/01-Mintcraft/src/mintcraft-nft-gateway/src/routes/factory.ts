import _ from 'lodash'
import fs from 'fs'
import Parameter, { ParameterRules } from 'parameter'
import jadepool from '@jadepool/instance'
import { RouterContext, Middleware } from '@koa/router'
import { NBError } from '@jadepool/types'
import * as types from '../types'

export interface BuildHandlerOption {
  /** 预定义对象 */
  preset: types.ParsedArgs
  /** 允许rule以外的key在data之中 */
  allowUnruled: boolean
  /** 结果处理函数，默认为json */
  responseMode: 'json' | 'download'
}

type DataRuleParams = ParameterRules | ((ctx: RouterContext) => Promise<ParameterRules>)

const parameter = new Parameter({ convert: true })

/**
 * 构造method调用的args
 * @param ctx 请求的上下文
 * @param dataRule 数据权限验证规则
 * @param opts 额外配置参数
 */
async function parseMethodArgs (ctx: RouterContext, dataRule?: DataRuleParams, opts?: BuildHandlerOption): Promise<types.ParsedArgs> {
  const isGetMethod = ctx.method === 'GET'
  // 设置 data 数据
  let data = Object.assign({}, ctx.params, isGetMethod
    ? typeof ctx.request.query.data === 'string' ? JSON.parse(decodeURIComponent(ctx.request.query.data)) : (ctx.request.query ?? {})
    : (ctx.request.body ?? {}))
  // 检测data是否合法
  if (dataRule != null) {
    if (ctx.method !== 'GET' && _.isEmpty(data) && !_.isEmpty(dataRule)) {
      throw new NBError(500, 'empty data.')
    }
    const rules = typeof dataRule === 'function' ? (await dataRule(ctx)) : dataRule
    if (typeof rules === 'undefined') {
      throw new NBError(500, 'undefined rules')
    }
    const errors = parameter.validate(rules, data)
    if ((errors != null) && errors.length > 0) {
      throw new NBError(500, JSON.stringify(errors))
    }
    // 仅选取符合Rule的keys
    if ((opts?.allowUnruled) === false) {
      data = _.pick(data, _.keys(rules).concat(_.keys(ctx.params)))
    }
  }

  // 设置自动 key
  const autoData: types.ParsedArgs = { presetKeys: [], autoKeys: [] }
  // 设置区块链类型
  if (_.isString(data.chain) || _.isString(data.platform)) {
    autoData.nftPlatform = data.chain ?? data.platform
  }
  // 设置存储类型
  if (_.isString(data.store)) {
    autoData.nftStorage = data.store
  }
  // 预设值
  const preset = opts?.preset ?? {}
  // 设置 keys，以便于后续区别
  autoData.presetKeys = _.keys(preset)
  autoData.autoKeys = _.keys(autoData)
  return Object.assign(data, autoData, preset)
}

/**
 * 构造express的route handler
 * @param methodName methods目录下的方法名,核心处理函数
 * @param methodNsp 指定分发的namespace, enum类型|指定Namespace|特定函数
 * @param dataRule 数据权限验证规则
 * @param opts 额外配置参数
 */
function buildMethodInvoker (methodName: string, methodNsp?: string | Function, dataRule?: DataRuleParams, opts?: BuildHandlerOption) {
  /**
   * @param ctx 请求上下文
   */
  return async (ctx: RouterContext): Promise<any> => {
    const data = await parseMethodArgs(ctx, dataRule, opts)
    // 设置正确的namespace
    let namespace: string | null
    switch (methodNsp) {
      case types.METHOD_NAMESPACE.NULL:
        namespace = null
        break
      case types.METHOD_NAMESPACE.BLOCKCHAIN:
        if (data.nftPlatform === undefined) {
          throw new NBError(501, 'missing chain type')
        }
        namespace = data.nftPlatform
        break
      case types.METHOD_NAMESPACE.STORAGE:
        if (data.nftStorage === undefined) {
          throw new NBError(501, 'missing storage type')
        }
        namespace = data.nftStorage
        break
      default:
        namespace = typeof methodNsp === 'function' ? (await methodNsp(ctx)) : methodNsp
        break
    }
    // 进行函数调用
    return await jadepool.invokeMethod(methodName, namespace, data ?? {})
  }
}

/**
 * 构造express的route handler
 * @param methodName methods目录下的方法名,核心处理函数
 * @param methodNsp 指定分发的namespace, enum类型|指定Namespace|特定函数
 * @param dataRule 数据权限验证规则
 * @param opts 额外配置参数
 */
export function buildHandler (methodName: string, methodNsp?: string, dataRule?: DataRuleParams, opts?: BuildHandlerOption): Middleware & { desc: string } {
  // 导出方法
  const func: Middleware & { desc: string } = async (ctx, next) => {
    const invoker = buildMethodInvoker(methodName, methodNsp, dataRule, opts)
    let result: any
    try {
      result = await invoker(ctx)
    } catch (err) {
      return ctx.throw(500, err)
    }

    // 根据res模式返回结果
    if (opts?.responseMode === types.RESPONSE_MODES.DOWNLOAD) {
      const filepath = _.isString(result?.filepath) ? result.filepath : (_.isString(result) ? result : undefined)
      if (typeof filepath !== 'string') {
        throw new NBError(500, 'result should be string for MODE - download')
      }
      try {
        fs.accessSync(filepath)
      } catch (err) {
        throw new NBError(404, 'download file not exist!')
      }
      ctx.attachment(filepath)
      const sendfile = await import('koa-sendfile')
      await sendfile(ctx, filepath)
    } else {
      // 返回最终的result
      ctx.response.status = 200
      ctx.response.type = 'application/json'
      ctx.response.body = result ?? {}
    }
  }
  func.desc = methodName
  return func
}
