import _ from 'lodash'
import Router from '@koa/router'
import { METHOD_NAMESPACE, PLATFORMS } from '@mintcraft/types'
import supportedParams from '../../middlewares/supported-params'
import { buildHandler } from '../factory'

const platformRouter = new Router()
// get contract information
  .get('/:contract/info', buildHandler('token-query-detail-info-nft', METHOD_NAMESPACE.BLOCKCHAIN))
// get owners' balance detail
  .get('/:contract/balance/:address', buildHandler('account-query-balance-nft-details', METHOD_NAMESPACE.BLOCKCHAIN))
// try build transaction - create the NFT
  .post('/:contract/build-tx-mint', buildHandler('build-transaction-nft-mint', METHOD_NAMESPACE.BLOCKCHAIN, {
    /** nft creator who own the nft at first */
    creator: { type: 'string', required: true },
    /** nft metadata url (now only support ipfs or swarm) */
    metadata: { type: 'string', format: /^(?:ipfs|bzz):\/\/\w+(?:\/metadata\.json)?$/i, required: true },
    /** nft initial supply (erc721 should be always 1) */
    initialSupply: { type: 'int', required: false, default: 1, min: 1 }
  }))
// mint more nft (not supported for all contracts)
  .post('/:contract/build-tx-mint-more', buildHandler('build-transaction-nft-mint-more', METHOD_NAMESPACE.BLOCKCHAIN, {
    /** nft creator or who has permission to mint more */
    owner: { type: 'string', required: true },
    /** nft token id */
    tokenId: { type: 'int', required: true, min: 0 },
    /** amount, how many instances to mint */
    amount: { type: 'int', required: false, default: 1, min: 1 }
  }))
// try build transaction - transfer
  .post('/:contract/build-tx-transfer', buildHandler('build-transaction-transfer-nfts', METHOD_NAMESPACE.BLOCKCHAIN, {
    // the transaction signer address, default is 'sender'
    signer: { type: 'string', required: false },
    // nft sender
    sender: { type: 'string', required: true },
    /** nft recipient */
    recipient: { type: 'string', required: true },
    /** transfered tokens */
    tokens: {
      type: 'array',
      itemType: 'object',
      required: true,
      min: 1,
      max: 50, // avoid transation too large
      rule: {
        /** nft token id */
        tokenId: { type: 'int', required: true, min: 0 },
        /** amount, how many instances to transfer */
        amount: { type: 'int', required: false, default: 1, min: 1 }
      }
    }
  }))
// list all supported contracts
  .get('/', buildHandler('list-supported-nfts', METHOD_NAMESPACE.BLOCKCHAIN))

// export routers
const router = new Router()
// platform and nft's contract addesss is included in url
  .post('/:platform', supportedParams('platform', _.values(PLATFORMS)), platformRouter.routes())

export = router
