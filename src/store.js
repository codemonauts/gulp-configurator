import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import utils from './utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snippets: {},
    error: false,
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
    error: (state) => {
      return state.error
    },
    config: (state) => {
      return state.config
    }
  },
  actions: {
    retrieveSnippet({commit}, data) {
      axios
          .get(utils.githubApiUrl(data.type, data.part), { headers: {
            Authorization: 'Bearer '+ process.env.VUE_APP_GITHUB_TOKEN,
          }})
          .then((response) => {
              commit('snippet', {'type': data.type, 'part': data.part, 'code': atob(response.data.content)});
            }
          )
          .catch(() => {
            commit('error', true)
          })
    },
    setConfig({commit}, data) {
      commit('config', data)
    }
  }
})
