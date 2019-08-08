import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

import utils from './utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snippets: {}
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
    }
  },
  actions: {
    retrieveSnippet({commit}, data) {
      axios
          .get(utils.githubUrl(data.type, data.part), { headers: {
            Authorization: 'Bearer '+ process.env.VUE_APP_GITHUB_TOKEN,
          }})
          .then((response) => {
              commit('snippet', {'type': data.type, 'part': data.part, 'code': atob(response.data.content)});
            }
          )
    }
  }
})
