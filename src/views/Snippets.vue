<template lang="pug">
    v-tabs(show-arrows)
      v-tab(v-for="tab in snippets.tabs" :key='tab.type') {{tab.title}}
      v-tab-item(v-for="tab in snippets.tabs" :key='tab.type')
        v-container
          v-layout
            v-flex
              h2 {{tab.title}}
              .packages(v-if='tab.packages.dependencies.length || tab.packages.development.length')
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
                .notes(v-if='getNotes(tab, snippet)')
                  v-alert(border='left' dense text colored-border color='blue' v-for='note in getNotes(tab, snippet)' v-bind:key='note.line')
                    strong line {{ note.line }}
                    br
                    | {{ note.note }}
                CodeSnippet(:snippet='retrieveSnippet(tab.type, snippet)' language='javascript' :history='githubHistoryUrl(tab.type, snippet)' :highlight='getNotes(tab, snippet) ? getNotes(tab, snippet).map(note => note.line) : ""' lineNumbers="true")

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
    },
    getNotes(tab, part) {
      if(tab.hasOwnProperty('notes')) {
        if(tab.notes.hasOwnProperty(part)) {
          return tab.notes[part]
        }
      }
    }
  }
};
</script>
