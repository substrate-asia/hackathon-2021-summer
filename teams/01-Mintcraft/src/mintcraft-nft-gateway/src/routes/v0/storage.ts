import _ from 'lodash'
import path from 'path'
import multer from '@koa/multer'
import Router, { Middleware } from '@koa/router'
import { METHOD_NAMESPACE, STORAGES } from '@mintcraft/types'
import supportedParams from '../../middlewares/supported-params'
import { buildHandler } from '../factory'

const fileStorage = multer.diskStorage({
  destination: path.resolve(process.cwd(), 'uploads'),
  filename: (req, file, callback) => {
    const extname = path.extname(file.originalname)
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    callback(null, `${file.fieldname}-${uniqueSuffix}${extname}`)
  }
})
const upload = multer({ storage: fileStorage })

const storageRouter = new Router()
// upload entity to storage
  .post('/entity', upload.single('entity'), buildHandler('entity-single-file-upload', METHOD_NAMESPACE.STORAGE))
// get entity metadata, include entity data http url
  .get('/entity/:reference', buildHandler('entity-get-metadata', METHOD_NAMESPACE.STORAGE))
// get entity as json data directly
  .get('/entity/:reference/json', buildHandler('entity-fetch-as-json', METHOD_NAMESPACE.STORAGE))

// export routers
const router = new Router()
  .post('/:store', supportedParams('store', _.values(STORAGES)), storageRouter.routes() as Middleware<any, {}>)
  .get('/', buildHandler('list-all-storages', METHOD_NAMESPACE.NULL))

export = router
