<template lang="pug">
  v-app
    v-app-bar(app)
      v-toolbar-title.headline.text-uppercase
        router-link(to='/')
          span gulp
          span.font-weight-light configurator
      v-spacer
      v-btn(text to="configurator")
        span.mr-2 Configurator
      v-btn(text to="snippets")
        span.mr-2 Snippets
      v-spacer
      v-btn(text href="https://github.com/codemonauts/gulp-configurator" target="_blank")
        span.mr-2 Repository

    v-content
      v-alert(dense dismissible :type='notification.type' v-if='notification.message') {{notification.message}}
      router-view
    v-footer
      v-flex(xs12 text-center) &copy; {{ new Date().getFullYear() }} &nbsp;
        img(src='./assets/codemonauts-logo.svg' alt='codemonauts logo')
</template>

<script>
import { mapGetters } from 'vuex'
import snippets from './assets/snippets'

export default {
  name: 'App',
  data() {
    return {
      snippets: snippets
    }
  },
  computed: {
    ...mapGetters(['notification'])
  },
  mounted() {
    snippets.tabs.forEach((tab) => {
      tab.snippets.forEach((part) => {
        this.$store.dispatch('retrieveSnippet', {'type': tab.type, 'part': part})
      })
    })
  }
};
</script>

<style lang="sass" scoped>
.v-application
  a
    color: inherit
    text-decoration: none
</style>
