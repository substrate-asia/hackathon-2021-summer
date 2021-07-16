import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import polkadot from './modules/polkadot'
import lockAuthors from './modules/lockAuthors'
import events from './modules/events'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    polkadot,
    lockAuthors,
    events,
    user
  },
  getters
})

export default store
