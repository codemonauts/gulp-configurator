import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snippets: {},
    notification: {
      type: '',
      message: ''
    } ,
    config: {}
  },
  mutations: {
    snippet(state, snippet) {
      if(state.snippets.hasOwnProperty(snippet.type)) {
          state.snippets[snippet.type][snippet.part] = snippet.code
      }
      else {
        state.snippets[snippet.type] = {}
        state.snippets[snippet.type][snippet.part] = snippet.code
      }
    },
    error(state, value) {
      state.error = value
    },
    config: (state, config) => {
      state.config = config
    },
    notification: (state, notification) => {
      state.notification = notification
    }
  },
  getters: {
    getSnippet: (state) => (data) => {
      if(state.snippets.hasOwnProperty(data.type)) {
        if(state.snippets[data.type].hasOwnProperty(data.part)) {
          return state.snippets[data.type][data.part]
        }
      } else {
        return 'not available'
      }
    },
    notification: (state) => {
      return state.notification
    },
    config: (state) => {
      return state.config
    }
  },
  actions: {
    retrieveSnippet({commit}, data) {
      axios
          .get(`/snippets/${data.type}/${data.part}.txt`)
          .then((response) => {
              commit('snippet', {'type': data.type, 'part': data.part, 'code': response.data});
            }
          )
          .catch(() => {
            commit('notification', {'type': 'error', 'message': 'Error while retrieving snippets from server.'})
          })
    },
    setConfig({commit}, data) {
      commit('config', data)
    },
    notification({commit}, data) {
      commit('notification', data)
    }
  }
})
