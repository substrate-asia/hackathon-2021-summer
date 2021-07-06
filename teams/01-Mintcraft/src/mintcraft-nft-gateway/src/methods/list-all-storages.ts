import _ from 'lodash'
import { STORAGES, ParsedArgs, ResultListAllStorage } from '@mintcraft/types'

/**
 * method implement
 * @param namespace
 * @param args
 */
export = async (namespace: string, args: ParsedArgs): Promise<ResultListAllStorage> => {
  return { storages: _.values(STORAGES) }
}
