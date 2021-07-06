import _ from 'lodash'
import { PLATFORMS, ParsedArgs, ResultListAllPlatform } from '@mintcraft/types'

/**
 * method implement
 * @param namespace
 * @param args
 */
export = async (namespace: string, args: ParsedArgs): Promise<ResultListAllPlatform> => {
  return { platforms: _.values(PLATFORMS) }
}
