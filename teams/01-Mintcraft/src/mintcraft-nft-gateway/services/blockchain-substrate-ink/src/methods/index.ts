import _ from 'lodash'
import Logger from '@jadepool/logger'
import { NBError } from '@jadepool/types'
import { ParsedArgs } from '@mintcraft/types'

const logger = Logger.of('Methods', 'Substrate Ink!')

/**
 * @param methodName 调用的方法名
 * @param args 参数名
 * @param ws 调用该方法的socketClient
 */
export default async (methodName: string, namespace: string, args: ParsedArgs): Promise<any> => {
  const formatedMethodName = _.kebabCase(methodName)

  const callMethodKey = `${formatedMethodName}${typeof namespace === 'string' ? `(${namespace})` : ''}`

  let result: any
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
  return result
}
