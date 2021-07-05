import { formatNumber, isFunction } from '@polkadot/util'

const state = {
  unsub: null,
  byAuthor: {},
  lastBlockAuthors: [],
  lastBlockNumber: '',
  lastHeaders: []
}

const mutations = {
  CHANGE_UNSUB: (state, payload) => {
    state.unsub = payload
  },
  CHANGE_BY_AUTHOR: (state, payload) => {
    state.byAuthor = payload
  },
  CHANGE_LAST_BLOCK_AUTHORS: (state, payload) => {
    state.lastBlockAuthors = payload
  },
  CHANGE_LAST_BLOCK_NUMBER: (state, payload) => {
    state.lastBlockNumber = payload
  },
  CHANGE_LAST_HEADERS: (state, payload) => {
    state.lastHeaders = payload
  }
}

const MAX_HEADERS = 75
const byAuthor = {}

const actions = {
  query({ commit, state, rootState }) {
    if (state.unsub) {
      state.unsub()
      commit('CHANGE_UNSUB', null)
    }
    const { api } = rootState.polkadot
    api.isReady.then(() => {
      let lastHeaders = []
      let lastBlockAuthors = []
      let lastBlockNumber = ''
      const isAuthorIds = isFunction(api.query.authorMapping ? api.query.authorMapping.authorIds : null) // TODO-MOONBEAM reevaluate in a month: 07/16/21
      const isAuthorMappingWithDeposit = isFunction(api.query.authorMapping ? api.query.authorMapping.mappingWithDeposit : null)

      // // subscribe to all validators
      // api.query.session && api.query.session.validators((validatorIds) => {
      //   setValidators(validatorIds.map((validatorId) => validatorId.toString()))
      // }).catch(console.error)

      // subscribe to new headers
      api.derive.chain.subscribeNewHeads(async(lastHeader) => {
        if (lastHeader && lastHeader.number) {
          const blockNumber = lastHeader.number.unwrap()
          let thisBlockAuthor = ''

          if (lastHeader.author) {
            thisBlockAuthor = lastHeader.author.toString()
          } else if (isAuthorMappingWithDeposit && lastHeader.digest.logs && lastHeader.digest.logs[0] && lastHeader.digest.logs[0].isConsensus && lastHeader.digest.logs[0].asConsensus[1]) {
          // Some blockchains such as Moonbeam need to fetch the author accountId from a mapping
            thisBlockAuthor = ((await api.query.authorMapping.mappingWithDeposit(lastHeader.digest.logs[0].asConsensus[1])).toHuman()).account

            // eslint-disable-next-line require-atomic-updates
            lastHeader.authorFromMapping = thisBlockAuthor
          } else if (isAuthorIds && lastHeader.digest.logs && lastHeader.digest.logs[0] && lastHeader.digest.logs[0].isConsensus && lastHeader.digest.logs[0].asConsensus[1]) {
          // TODO-MOONBEAM reevaluate in a month: 07/16/21
          // Some blockchains such as Moonbeam need to fetch the author accountId from a mapping (function call may differ according to pallet version)
            thisBlockAuthor = (await api.query.authorMapping.authorIds(lastHeader.digest.logs[0].asConsensus[1])).toString()
            // eslint-disable-next-line require-atomic-updates
            lastHeader.authorFromMapping = thisBlockAuthor
          }

          const thisBlockNumber = formatNumber(blockNumber)

          if (thisBlockAuthor) {
            byAuthor[thisBlockAuthor] = thisBlockNumber

            if (thisBlockNumber !== lastBlockNumber) {
              lastBlockNumber = thisBlockNumber
              lastBlockAuthors = [thisBlockAuthor]
            } else {
              lastBlockAuthors.push(thisBlockAuthor)
            }
          }

          lastHeaders = lastHeaders
            .filter((old, index) => index < MAX_HEADERS && old.number.unwrap().lt(blockNumber))
            .reduce((next, header) => {
              next.push(header)

              return next
            }, [lastHeader])
            .sort((a, b) => b.number.unwrap().cmp(a.number.unwrap()))

          commit('CHANGE_BY_AUTHOR', byAuthor)
          commit('CHANGE_LAST_BLOCK_AUTHORS', lastBlockAuthors)
          commit('CHANGE_LAST_BLOCK_NUMBER', lastBlockNumber)
          commit('CHANGE_LAST_HEADERS', lastHeaders)
        }
      }).then(unsub => {
        commit('CHANGE_UNSUB', unsub)
      }).catch(console.error)
    }).catch(console.error)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

