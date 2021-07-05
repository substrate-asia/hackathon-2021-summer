import fs from 'fs'
import _ from 'lodash'
import { URL } from 'url'
import config from 'config'
import { NFTStorage, File } from 'nft.storage'
import {
  UPLOADING_FIELDS,
  ArgsEntityUpload,
  ResultEntityUploaded,
  NFTMetadata
} from '@mintcraft/types'
import path from 'path'

/**
 * method implement
 * @param namespace
 * @param args
 */
export = async (namespace: string, args: ArgsEntityUpload): Promise<ResultEntityUploaded> => {
  const endpoint: string = config.get('nftStorage.endpoint')
  if (_.isEmpty(endpoint)) throw new Error('missing nft.storage endpoint config.')
  const token: string = config.get('nftStorage.accessToken')
  if (_.isEmpty(token) || token.length < 200) throw new Error('missing nft.storage token config.')

  if (_.isEmpty(args.name)) throw new Error('invalid args: missing name.')
  if (_.isEmpty(args.description)) throw new Error('invalid args: missing description.')

  // build nft metadata
  const data: NFTMetadata = {
    name: args.name,
    description: args.description
  }

  if (typeof args.properties === 'string') {
    let json
    try {
      json = JSON.parse(args.properties)
    } catch (err) {}
    // TODO ensure json string is valid
    if (_.isArray(json)) {
      data.attributes = json
    } else if (json !== undefined) {
      data.properties = json
    }
  }
  // extra data
  if (typeof args.animation_url === 'string') {
    data.animation_url = args.animation_url
  }
  if (typeof args.external_url === 'string') {
    data.external_url = args.external_url
  }

  // preview image
  const previewImage = args.files?.find(one => one.fieldname === UPLOADING_FIELDS.PREVIEW)
  if (previewImage === undefined) {
    throw new Error('invalid args: missing preview image.')
  }

  // nft content
  const content = args.files?.find(one => one.fieldname === UPLOADING_FIELDS.CONTENT)
  if (content === undefined) {
    throw new Error('invalid args: missing content field.')
  }
  // ensure properties exists
  data.properties = data.properties ?? {}

  // storage instance
  const storage = new NFTStorage({ token, endpoint })

  // store metadata
  const metadata = await storage.store(_.merge(data, {
    image: new File([await fs.promises.readFile(previewImage.path)], previewImage.filename, {
      type: previewImage.mimetype
    }),
    // extra mintcraft special field
    properties: {
      mintcraft: {
        content: new File([await fs.promises.readFile(content.path)], content.filename, {
          type: content.mimetype
        }),
        content_type: path.extname(content.filename)
      }
    }
  }))

  return {
    hashId: metadata.ipnft,
    url: new URL(metadata.url),
    metadata: metadata.data,
    embed: metadata.embed()
  }
}
