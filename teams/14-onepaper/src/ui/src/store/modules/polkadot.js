import jsonrpc from '@polkadot/types/interfaces/jsonrpc'
import queryString from 'query-string'

import { ApiPromise, WsProvider } from '@polkadot/api'
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp'
import keyring from '@polkadot/ui-keyring'

import config from './config'
const parsedQuery = queryString.parse(window.location.search)
const connectedSocket = parsedQuery.rpc || config.PROVIDER_SOCKET

import { formatBalance } from '@polkadot/util'
import registry from '@/utils/typeRegistry'

const state = {
  socket: connectedSocket,
  jsonrpc: { ...jsonrpc, ...config.RPC }, // RPC {}
  types: config.types, // types {}
  keyring: null,
  keyringState: null,
  api: null,
  apiError: null,
  apiState: null
}

const mutations = {
  CONNECT_INIT: (state) => {
    state.apiState = 'CONNECT_INIT'
  },
  CONNECT: (state, payload) => {
    state.apiState = 'CONNECTING'
    state.api = payload
  },
  CONNECT_SUCCESS: (state) => {
    state.apiState = 'READY'
  },
  CONNECT_ERROR: (state, payload) => {
    state.apiState = 'ERROR'
    state.apiError = payload
  },
  LOAD_KEYRING: (state) => {
    state.keyringState = 'LOADING'
  },
  SET_KEYRING: (state, payload) => {
    state.keyringState = 'READY'
    state.keyring = payload
  },
  KEYRING_ERROR: (state) => {
    state.keyringState = 'ERROR'
    state.keyring = null
  }
}

export const DEFAULT_DECIMALS = registry.createType('u32', 12)
export const DEFAULT_AUX = ['Aux1', 'Aux2', 'Aux3', 'Aux4', 'Aux5', 'Aux6', 'Aux7', 'Aux8', 'Aux9']
async function retrieve(api) {
  const [chainProperties/*, systemChain, systemChainType, systemName, systemVersion, injectedAccounts*/] = await Promise.all([
    api.rpc.system.properties()/*,
    api.rpc.system.chain(),
    api.rpc.system.chainType
      ? api.rpc.system.chainType()
      :  Promise.resolve(registry.createType('ChainType', 'Live')),
    api.rpc.system.name(),
    api.rpc.system.version()*/
    // getInjectedAccounts(injectedPromise)
  ])
  const tokenSymbol = chainProperties.tokenSymbol.unwrapOr([formatBalance.getDefaults().unit, ...DEFAULT_AUX])
  const tokenDecimals = chainProperties.tokenDecimals.unwrapOr([DEFAULT_DECIMALS])

  // first setup the UI helpers
  formatBalance.setDefaults({
    decimals: (tokenDecimals).map((b) => b.toNumber()),
    unit: tokenSymbol[0].toString()
  })

  // return {
  //   injectedAccounts,
  //   properties: {
  //     ss58Format: api.consts.system?.ss58Prefix || chainProperties.ss58Format,
  //     tokenDecimals: chainProperties.tokenDecimals,
  //     tokenSymbol: chainProperties.tokenSymbol
  //   },
  //   systemChain: (systemChain || '<unknown>').toString(),
  //   systemChainType,
  //   systemName: systemName.toString(),
  //   systemVersion: systemVersion.toString()
  // }
}

let loadAccts = false

const actions = {
  init({ dispatch }) {
    dispatch('connect')
    dispatch('loadAccounts')
  },
  connect({ commit, state, dispatch }) {
    const { apiState, socket, jsonrpc, types } = state
    // We only want this function to be performed once
    if (apiState) return

    commit('CONNECT_INIT')

    const provider = new WsProvider(socket)
    const _api = new ApiPromise({ provider, types, rpc: jsonrpc })
    // Set listeners for disconnection and reconnection event.
    _api.on('connected', () => {
      commit('CONNECT', _api)
      // `ready` event is not emitted upon reconnection and is checked explicitly here.
      _api.isReady.then(async(_api) => {
        dispatch('lockAuthors/query', null, { root: true })
        dispatch('events/extrinsics', null, { root: true })
        await retrieve(_api)
        commit('CONNECT_SUCCESS')
        // 数据
      })
    })
    _api.on('ready', () => {
      commit('CONNECT_SUCCESS')
    })
    _api.on('error', err => commit('CONNECT_ERROR', err))
  },

  loadAccounts({ commit, state }) {
    const asyncLoadAccounts = async() => {
      commit('LOAD_KEYRING')
      try {
        await web3Enable(config.APP_NAME) // APP_NAME PaperOne
        let allAccounts = await web3Accounts()
        allAccounts = allAccounts.map(({ address, meta }) =>
          ({ address, meta: { ...meta, name: `${meta.name} (${meta.source})` }}))
        keyring.loadAll({ isDevelopment: config.DEVELOPMENT_KEYRING, ss58Format: config.ss58Format, type: config.TYPE_KEYRING }, allAccounts)
        // 更新缓存
        const accounts = keyring.getAccounts()
        const localPair = localStorage.getItem('pair')
        if (localPair && !accounts.find(item => item.address === localPair.address)) {
          localStorage.removeItem('pair')
          commit('user/SET_PAIR', null, { root: true })
          document.location.reload()
        }

        commit('SET_KEYRING', keyring)
      } catch (e) {
        commit('KEYRING_ERROR')
      }
    }

    const { keyringState } = state
    // If `keyringState` is not null `asyncLoadAccounts` is running.
    if (keyringState) return
    // If `loadAccts` is true, the `asyncLoadAccounts` has been run once.
    if (loadAccts) return commit('SET_KEYRING', keyring)

    // This is the heavy duty work
    loadAccts = true
    asyncLoadAccounts()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

