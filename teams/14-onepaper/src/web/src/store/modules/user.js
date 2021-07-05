// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    pair: null
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_PAIR: (state, pair) => {
    state.pair = pair
  }
}

const actions = {
  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

