import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snippets: [],
    notification: {
      type: '',
      message: ''
    } ,
    config: {}
  },
  mutations: {
    snippet(state, snippet) {
      state.snippets.push(snippet)
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
      return state.snippets.filter(snippet => snippet.group == data.group && snippet.type == data.type && snippet.part == data.part)
    },
    getCodes: (state) => (type, part) => {
      return state.snippets.filter(snippet => snippet.info.type == type && snippet.info.part == part)
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
      let url = `/snippets/${data.type}/${data.group}/${data.part}.txt`
      axios
          .get(url)
          .then((response) => {
              commit('snippet', {'info': data, 'code': response.data});
            }
          )
          .catch(() => {
            commit('notification', {'type': 'error', 'message': 'Error while retrieving snippets from server. ' + url})
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
