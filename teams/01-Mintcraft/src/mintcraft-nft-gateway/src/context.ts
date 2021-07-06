import config from 'config'
import jadepool from '@jadepool/instance'
import Logger from '@jadepool/logger'
import consts from '@jadepool/consts'
import { BaseService } from '@jadepool/types'
import methedFunc from './methods'

const logger = Logger.of('Mintcraft', 'Context')

class Context extends jadepool.Context {
  constructor () {
    super(
      process.env.npm_package_name ?? 'nft-gateway',
      process.env.npm_package_version ?? process.env.version ?? process.env.VERSION ?? '0.1.0',
      methedFunc,
      config
    )
  }

  /**
   * 自动注册的服务，可重载
   * @returns {string[]}
   */
  get autoRegisterServices (): string[] {
    return [
      // 默认加载consul服务, 使用defaultConsul配置
      consts.SERVICE_NAMES.CONSUL
    ]
  }

  /**
   * 注册服务
   * @param serviceClass
   * @param opts 传入的初始化参数
   */
  async registerService (serviceClass: string | typeof BaseService, opts: object): Promise<BaseService> {
    let ClassToRegister: string | typeof BaseService
    if (typeof serviceClass === 'string') {
      switch (serviceClass) {
        case consts.SERVICE_NAMES.KOA: {
          const { KoaService } = await import('@jadepool/service-http')
          ClassToRegister = KoaService
          break
        }
        case consts.SERVICE_NAMES.SOCKET_IO: {
          const { SocketIOService } = await import('@jadepool/service-socketio')
          ClassToRegister = SocketIOService
          break
        }
        case consts.SERVICE_NAMES.CONSUL: {
          const { ConsulService } = await import('@jadepool/service-consul')
          ClassToRegister = ConsulService
          break
        }
        default:
          logger.warn(`failed to registerService: ${serviceClass}`)
          throw new Error('invalid service.')
      }
    } else {
      ClassToRegister = serviceClass
    }
    return await super.registerService(ClassToRegister, opts)
  }
}

export default Context
