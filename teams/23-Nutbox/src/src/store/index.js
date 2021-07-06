import Vue from 'vue'
import Vuex from 'vuex'
import Cookie from 'vue-cookies'
import {
  LOCALE_KEY
} from '../config'

import polkadot from './polkadot'
import kusama from './kusama'
import rococo from './rococo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lang: Cookie.get(LOCALE_KEY) || 'zh-CN',
    // custom apis 
    customApis:{},
    subCustomBalance: {},
    customApiStates:{},
    customBalance:{},
    crowdloanCardSearchText: ''
  },
  mutations: {
    saveLang: (state, lang) => {
      state.lang = lang;
      Cookie.set(LOCALE_KEY, lang, '30d')
    },
    saveCustomApi: (state, {node, customApi}) => {
      state.customApis[node] = customApi
    },
    saveSubCustomBalance: (state, {name, subBalance}) => {
      state.subCustomBalance[name] = subBalance
    },
    saveCustomApiState: (state, {node, apiState}) => {
      state.customApiStates[node] = apiState
    },
    // update all balances to UI
    saveCustomBalance: (state, balance) => {
      state.customBalance = balance
    },
    saveCrowdloanCardSearchText: (state, text) => {
      state.crowdloanCardSearchText = text
    }
  },
  modules: {
    polkadot,
    kusama,
    rococo
  }
})
