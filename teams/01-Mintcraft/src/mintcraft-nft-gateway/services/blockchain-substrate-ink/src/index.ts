import Logger from '@jadepool/logger'
import consts from '@jadepool/consts'
import jadepool from '@jadepool/instance'
import { SocketIOWorkerOptions } from '@jadepool/service-socketio'
import { PLATFORMS } from '@mintcraft/types'
import Context from './context'

const logger = Logger.of('Mintcraft', 'Substrate Ink!')

async function run (): Promise<void> {
  logger.diff('Launcher').log('Run!')
  await jadepool.initialize(new Context())
  logger.diff('Launcher').tag('Context Built').logObj(jadepool.env)

  // register socket.io service
  const opts: SocketIOWorkerOptions = { namespaces: [PLATFORMS.SUBSTRATE_INK] }
  await jadepool.registerService(consts.SERVICE_NAMES.SIO_WORKER, opts)

  logger.diff('Launcher').log('Started!')
}

// eslint-disable-next-line no-void
void run()
