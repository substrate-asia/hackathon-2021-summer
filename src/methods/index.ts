import _ from 'lodash'
import { NBError } from '@jadepool/types'
import { SocketIOService } from '@jadepool/service-socketio'
import jadepool from '@jadepool/instance'
import consts from '@jadepool/consts'
import Logger from '@jadepool/logger'
import { ParsedArgs } from '../types'

const logger = Logger.of('Methods')

/**
 * @param methodName 调用的方法名
 * @param args 参数名
 * @param ws 调用该方法的socketClient
 */
export default async (methodName: string, namespace: string | undefined, args: ParsedArgs): Promise<any> => {
  const formatedMethodName = _.kebabCase(methodName)
  // socket io service
  const sioSrv = jadepool.getService(consts.SERVICE_NAMES.SOCKET_IO) as SocketIOService

  let invokeLocally = true
  if (sioSrv !== undefined) {
    invokeLocally = _.isEmpty(namespace)
  }
  // 若不能存在namespace，则将namespace设置为启动参数（即chainKey）
  if (invokeLocally && namespace === undefined) {
    namespace = jadepool.env.param ?? ''
  }

  const callMethodKey = `${formatedMethodName}${typeof namespace === 'string' ? `(${namespace})` : ''}`

  let result: any
  if (invokeLocally) {
    // local methods invoke
    try {
      let functionImpl = await import(`./${formatedMethodName}`)
      if (typeof functionImpl.default === 'function') {
        functionImpl = functionImpl.default
      }
      if (typeof functionImpl === 'function') {
        logger.tag(`Invoke:${callMethodKey}`).logObj(args)
        result = await functionImpl(namespace, args)
      } else {
        throw new NBError(404, 'method should be a function')
      }
    } catch (err) {
      if (err.code === 'MODULE_NOT_FOUND') {
        throw new NBError(404, `missing method ${formatedMethodName}.`)
      } else {
        throw err
      }
    }
  } else {
    // internal service invoke
    if (sioSrv === undefined) {
      throw new NBError(10001, 'missing socket.io service')
    }
    if (namespace === undefined) {
      throw new NBError(10001, 'namespace is undefined')
    }
    // 进行sio调用
    try {
      logger.diff(callMethodKey).tag('Begin').logObj(args)

      if (sioSrv.hasWorker(namespace)) {
        result = await sioSrv.invokeInternalMethod(namespace, formatedMethodName, args)
      } else {
        throw new NBError(21002, callMethodKey)
      }
      logger.diff(callMethodKey).tag('End').logObj(args)
    } catch (err) {
      logger.diff(callMethodKey).tag('Failed-to-invoke-RPC').warn(`method=${methodName},errMessage=${JSON.stringify(err.message)}`)
      throw err
    }
  }
  return result
}
