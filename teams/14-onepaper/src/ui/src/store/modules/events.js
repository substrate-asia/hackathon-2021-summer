
// import { stringify, stringToU8a } from '@polkadot/util'
// import { xxhashAsHex } from '@polkadot/util-crypto'
import { valueOfUnit/*, getSiPowers */ } from '@/utils/index'

const state = {
  unsub: null,
  prev: { block: null, event: null },
  eventCount: 0,
  events: []
}

const mutations = {
  CHANGE_UNSUB: (state, payload) => {
    state.unsub = payload
  },
  CHANGE_EVENT_COUNT: (state, payload) => {
    state.eventCount = payload
  },
  CHANGE_EVENTS: (state, payload) => {
    state.events = payload
  },
  CHANGE_PREV: (state, payload) => {
    // eslint-disable-next-line no-prototype-builtins
    if (payload.hasOwnProperty('block')) {
      state.prev.block = payload
    }
    // eslint-disable-next-line no-prototype-builtins
    if (payload.hasOwnProperty('event')) {
      state.prev.event = payload
    }
  }
}

// const MAX_EVENTS = 75

const actions = {
  query({ commit, rootState }) {
    const { api } = rootState.polkadot
    api.isReady.then(async() => {
      // const startHdr = await api.rpc.chain.getBlockHash(1)
      const addrsss = rootState.user.pair ? rootState.user.pair.address : null
      if (!addrsss) {
        return []
      }

      // 查询最近 5000 个块
      const lastHdr = await api.rpc.chain.getHeader()
      // console.log((lastHdr.number).toNumber())
      const beseNumber = (lastHdr.number).toNumber()
      const startHdr = await api.rpc.chain.getBlockHash(lastHdr.number.unwrap().subn(beseNumber > 10000 ? 10000 : beseNumber))

      // retrieve the range of events
      const records = []
      const events = await api.query.system.events.range([startHdr])
      events.forEach((event) => {
        // console.log(event[0].toString())
        if (Array.isArray(event[1])) {
          const objs = event[1]
          for (let index = 0; index < objs.length; index++) {
            const element = objs[index]
            // 转账 method Transfer section balances
            if (element.event && element.event.method === 'Transfer') {
              const values = element.event.data.map((value) => ({ isValid: true, value }))
              const accountId1 = values[0].value.toString()
              const accountId2 = values[1].value.toString()
              const balance = values[2].value
              if (accountId1 === addrsss || accountId2 === addrsss) {
                const { valueU, reforma, si } = valueOfUnit(balance)
                records.unshift({
                  accountId1,
                  accountId2,
                  balance: valueU,
                  amount: reforma[0],
                  amountUnit: si.text
                })
              }
            }
          }
        }
      })

      commit('CHANGE_EVENT_COUNT', records.length)
      commit('CHANGE_EVENTS', records)

      //       api.query.system.events(async(records) => {
      //         const newEvents = records.map((record, index) => ({ indexes: [index], record }))
      //           .filter(({ record: { event: { method, section }}}) => {
      //             return section !== 'system' &&
      // (!['balances', 'treasury'].includes(section) || !['Deposit'].includes(method)) &&
      // (!['parasInclusion', 'inclusion'].includes(section) || !['CandidateBacked', 'CandidateIncluded'].includes(method))
      //           }
      //           )
      //           .reduce((combined, e) => {
      //             const prev = combined.find(({ record: { event: { method, section }}}) =>
      //               e.record.event.section === section &&
      //           e.record.event.method === method
      //             )

      //             if (prev) {
      //               prev.indexes.push(...e.indexes)
      //             } else {
      //               combined.push(e)
      //             }

      //             return combined
      //           }, [])
      //           .reverse()
      //         console.log('newEvents---', newEvents)
      //         const newEventHash = xxhashAsHex(stringToU8a(stringify(newEvents)))

      //         if (newEventHash !== state.prev.event && newEvents.length) {
      //           commit('CHANGE_UNSUB', { event: newEventHash })

      //           // retrieve the last header, this will map to the current state
      //           const header = await api.rpc.chain.getHeader(records.createdAtHash)
      //           const blockNumber = header.number.unwrap()
      //           const blockHash = header.hash.toHex()

      //           if (blockHash !== state.prev.block) {
      //             commit('CHANGE_UNSUB', { block: blockHash })

      //             commit('CHANGE_EVENT_COUNT', records.length)
      //             commit('CHANGE_EVENTS', [
      //               ...newEvents.map(({ indexes, record }) => ({
      //                 blockHash,
      //                 blockNumber,
      //                 indexes,
      //                 key: `${blockNumber.toNumber()}-${blockHash}-${indexes.join('.')}`,
      //                 record
      //               })),
      //               // remove all events for the previous same-height blockNumber
      //               ...state.events.filter((p) => !p.blockNumber?.eq(blockNumber))
      //             ].slice(0, MAX_EVENTS))
      //           }
      //         } else {
      //           commit('CHANGE_EVENT_COUNT', records.length)
      //           commit('CHANGE_EVENTS', state.events)
      //         }
      //       })
    }).catch(console.error)
  },

  extrinsics({ commit, rootState, dispatch }) {
    if (state.unsub) {
      state.unsub()
      commit('CHANGE_UNSUB', null)
    }
    const { api } = rootState.polkadot
    api.isReady.then(async() => {
      const unsub = await api.query.system.events((event) => {
        console.log(`Event listen: ${JSON.stringify(event)}`)

        dispatch('query')
      })
      commit('CHANGE_UNSUB', unsub)
    }).catch(console.error)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

