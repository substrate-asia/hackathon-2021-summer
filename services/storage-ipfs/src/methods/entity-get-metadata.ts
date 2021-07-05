import _ from 'lodash'
import {
  ArgeEntityGetMetadata
  // NFTMetadata
} from '@mintcraft/types'
// import { toGatewayURL } from 'nft.storage'

/**
 * method implement
 * @param namespace
 * @param args
 */
export = async (namespace: string, args: ArgeEntityGetMetadata): Promise<any> => {
  if (_.isEmpty(args.reference)) throw new Error('missing reference.')
  // TODO check status and retrive metadata
  throw new Error('unimplemented!')
}
