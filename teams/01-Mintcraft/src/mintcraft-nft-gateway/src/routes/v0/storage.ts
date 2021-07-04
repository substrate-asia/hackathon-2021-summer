import _ from 'lodash'
import path from 'path'
import multer from '@koa/multer'
import Router, { Middleware } from '@koa/router'
import { METHOD_NAMESPACE, STORAGES, UPLOADING_FIELDS } from '@mintcraft/types'
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
  .post('/entity',
  // request should be multipart/form-data
    upload.fields([
      { name: UPLOADING_FIELDS.CONTENT, maxCount: 1 },
      { name: UPLOADING_FIELDS.PREVIEW, maxCount: 1 }
    ]),
    buildHandler('entity-upload-as-nft', METHOD_NAMESPACE.STORAGE, {
      // nft basic info
      name: { type: 'string', required: true },
      description: { type: 'string', required: true },
      // nft properties, should be json string
      properties: { type: 'string', required: false, allowEmpty: false },
      // extra url for metadta
      external_url: { type: 'url', required: false, allowEmpty: false },
      animation_url: { type: 'url', required: false, allowEmpty: false }
    })
  )
// get entity metadata, include entity data http url
  .get('/entity/:reference', buildHandler('entity-get-metadata', METHOD_NAMESPACE.STORAGE))
// get entity as json data directly
  .get('/entity/:reference/json', buildHandler('entity-fetch-as-json', METHOD_NAMESPACE.STORAGE))

// export routers
const router = new Router()
  .post('/:store', supportedParams('store', _.values(STORAGES)), storageRouter.routes() as Middleware<any, {}>)
  .get('/', buildHandler('list-all-storages', METHOD_NAMESPACE.NULL))

export = router
