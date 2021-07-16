import Router from '@koa/router'
// routers
import routerNFT from './nft'
import routerStorage from './storage'
import routerPlatform from './platform'
import routerToken from './token'

const router = new Router()
// storage routes
router.use('/storage', routerStorage.routes())
// blockchain platform routes
router.use('/platform', routerPlatform.routes())
// NFT routes
router.use('/nft', routerNFT.routes())
// FT routes
router.use('/token', routerToken.routes())

export = router
