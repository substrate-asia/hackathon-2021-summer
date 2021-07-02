import Router from '@koa/router'

import responseFormat from '../middlewares/response-format'
import v0Router from './v0'

const router = new Router()
// api of the version v0
router.use('/api/v0', responseFormat(), v0Router.routes())

export = router
