import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
    //init
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
};

const actions = {
    login({ commit }, userInfo) {
        const { name, password } = userInfo;
        return new Promise((resolve, reject) => {
            login({ name: name, password: password })
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};

export default {
    // 命名空间不能没有
    namespaced: true,
    state,
    mutations,
    actions,
};
