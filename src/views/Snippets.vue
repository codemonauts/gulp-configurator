<template lang="pug">
    v-tabs(show-arrows)
      v-tab(v-for="tab in content.tabs" :key='tab.type') {{tab.title}}
      v-tab-item(v-for="tab in content.tabs" :key='tab.type')
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
              .snippets(v-for='part in tab.parts')
                h3 {{part}}
                v-tabs
                  v-tab(v-for='snippet in getCodes(tab.type, part)') {{snippet.info.group}}
                  v-tab-item(v-for='snippet in getCodes(tab.type, part)')
                    .notes(v-if='snippet.info.note')
                      v-alert(v-for='note in snippet.info.note' v-bind:key='note.line' border='left' dense text colored-border color='blue')
                        strong(v-if='note.line') line {{ note.line }}
                        br(v-if='note.line')
                        | {{ note.note }}
                    CodeSnippet(:snippet='snippet.code' :language='snippet.info.lang' :highlight='snippet.info.note ? snippet.info.note.map(n => n.line) : ""' lineNumbers='true' :history='githubHistoryUrl(tab.type, snippet.info.group, part)')
</template>

<script>
import content from '../assets/snippets'
import CodeSnippet from '../components/CodeSnippet'
import { mapGetters } from 'vuex'
import utils from '../utils'

export default {
  components: {
    CodeSnippet
  },
  data() {
    return {
      content: content
    }
  },
  computed: {
    ...mapGetters(['getSnippet', 'getCodes'])
  },
  methods: {
    retrieveSnippet(group, type, part) {
      return this.getSnippet({'group': group, 'type': type, 'part': part})
    },
    githubHistoryUrl(type, group, part) {
      return utils.githubHistoryUrl(type, group, part)
    },
    listPackages(packages, dev=false) {
      return utils.listPackages(packages, dev)
    }
  }
};
</script>

<style lang='sass' scoped>
.notes
  margin-top: 1rem
</style>