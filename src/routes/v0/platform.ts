import _ from 'lodash'
import Router from '@koa/router'
import { METHOD_NAMESPACE, PLATFORMS } from '@mintcraft/types'
import supportedParams from '../../middlewares/supported-params'
import { buildHandler } from '../factory'

const platformRouter = new Router()
// send raw transcation data
  .post('/send-rawtx', buildHandler('platform-send-rawtx', METHOD_NAMESPACE.BLOCKCHAIN, {
    rawtx: { type: 'string', required: true }
  }))
// platform call for more information (not to send transaction)
  .post('/call', buildHandler('platform-general-call', METHOD_NAMESPACE.BLOCKCHAIN, {
    method: { type: 'string', required: true },
    params: { type: 'array', required: false, min: 0 }
  }))
// get transaction basic infomation
  .get('/tx/:hash', buildHandler('platform-query-transaction', METHOD_NAMESPACE.BLOCKCHAIN))
// get transaction detail infomation (not supported for all platforms)
  .get('/tx/:hash/detail', buildHandler('platform-query-transaction-detail', METHOD_NAMESPACE.BLOCKCHAIN))
// platform summary info
  .get('/', buildHandler('platform-query-info', METHOD_NAMESPACE.BLOCKCHAIN))

// export routers
const router = new Router()
  .post('/:platform', supportedParams('platform', _.values(PLATFORMS)), platformRouter.routes())
  .get('/', buildHandler('list-all-platforms', METHOD_NAMESPACE.NULL))

export = router
