#!/usr/bin/env ts-node
import Logger from '@jadepool/logger'
import jadepool from '@jadepool/instance'
import consts from '@jadepool/consts'
import { KoaOptions, KoaService } from '@jadepool/service-http'

import Context from './context'
import router from './routes'

const logger = Logger.of('Mintcraft', 'NFT gateway')

async function run (): Promise<void> {
  logger.diff('Launcher').log('Run!')
  await jadepool.initialize(new Context())
  logger.diff('Launcher').tag('Context Built').logObj(jadepool.env)

  // http 服务
  const koaOpts: KoaOptions = {
    router: router,
    listenManually: true,
    defaultErrorStatus: 200
  }
  const appSrv: KoaService = (await jadepool.registerService(consts.SERVICE_NAMES.KOA, koaOpts)) as KoaService

  // socket.io服务
  await jadepool.registerService(consts.SERVICE_NAMES.SOCKET_IO)

  // 启动listen
  await appSrv.listen()

  logger.diff('Launcher').log('Started!')
}

// eslint-disable-next-line no-void
void run()
