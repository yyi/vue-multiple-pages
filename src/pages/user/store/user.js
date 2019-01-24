import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state() {
    return {
      users: [],
      currentPage: 0,
      size: 10
    }
  },
  getters: {
    currentPage: state => state.currentPage,
    total: state => state.users['totalElements'],
    size: state => state.size,
    userData: state => state.users['content']
  },
  mutations: {
    users(state, users) {
      state.users = users
    },
    currentPage(state, currentPage) {
      state.currentPage = currentPage
    },
    size(state, size) {
      state.size = size
    }
  },
  actions: {
    getUserList({ commit, state }) {
      this._vm.$fetch('/rest/user/list', result => commit('users', result), {
        param: { page: state.currentPage, size: state.size }
      })
    },
    setPageSize({ dispatch, commit }, size) {
      commit('size', size)
      commit('currentPage', 0)
      dispatch('getUserList')
    },
    setCurrentPage({ dispatch, commit }, currentPage) {
      commit('currentPage', currentPage - 1)
      dispatch('getUserList')
    }
  }
})
export default store
