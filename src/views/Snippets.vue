<template lang="pug">
    v-tabs
      v-tab(v-for="tab in snippets.tabs" :key='tab.type') {{tab.title}}
      v-tab-item(v-for="tab in snippets.tabs" :key='tab.type')
        v-container
          h2 {{tab.title}}
          .packages
            h3 packages
            .dependencies(v-if='tab.packages.dependencies.length')
              ul
                li(v-for="p in tab.packages.dependencies") {{p}}
              CodeSnippet(:snippet='listPackages(tab.packages.dependencies)' language='shell')
            .development(v-if='tab.packages.development.length')
              h4 development dependencies
              ul
                li(v-for="p in tab.packages.development") {{p}}
              CodeSnippet(:snippet='listPackages(tab.packages.development, true)' language='shell')
          .snippets(v-for='snippet in tab.snippets')
            h3 {{snippet}}
            CodeSnippet(:snippet='retrieveSnippet(tab.type, snippet)' language='js' :history='githubHistoryUrl(tab.type, snippet)')

</template>

<script>
import snippets from '../assets/snippets'
import CodeSnippet from '../components/CodeSnippet'
import { mapGetters } from 'vuex'
import utils from '../utils'

export default {
  components: {
    CodeSnippet
  },
  data() {
    return {
      snippets: snippets
    }
  },
  computed: {
    ...mapGetters(['getSnippet'])
  },
  methods: {
    retrieveSnippet(type, part) {
      return this.getSnippet({'type': type, 'part': part})
    },
    githubHistoryUrl(type, part) {
      return utils.githubHistoryUrl(type, part)
    },
    listPackages(packages, dev=false) {
      return utils.listPackages(packages, dev)
    }
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
