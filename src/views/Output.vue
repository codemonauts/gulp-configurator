<template lang="pug">
    v-container
      v-layout
        v-flex
          .packages(v-if='output.packages.length || output.development.length')
            h2 packages
            CodeSnippet(:snippet='listPackages(output.packages)' language='shell' v-if='output.packages.length')
          .group(v-if='output.development.length')
            h3 development dependencies
            CodeSnippet(:snippet='listPackages(output.development, true)' language='shell')
          OverlaySnippet(name='gulpfile' :snippet='output.gulpfile' language='js')
          OverlaySnippet(name='javascript' :snippet='output.more.script' v-if='output.more.script' language='js')
          OverlaySnippet(name='style' :snippet='output.more.style' v-if='output.more.style' language='sass')

</template>

<script>
import CodeSnippet from '../components/CodeSnippet'
import OverlaySnippet from '../components/OverlaySnippet'
import utils from '../utils'
import { mapGetters } from 'vuex'
import snippets from '../assets/snippets'

export default {
  data() {
    return {
      snippets: snippets,
      overlay: false,
      zIndex: 5,
    }
  },
  components: {
    CodeSnippet,
    OverlaySnippet
  },
  computed: {
    ...mapGetters(['config', 'getSnippet']),
    output () {
      var base = this.getSnippet({'type': 'base', 'part': 'base'})
      var basetasks = this.getSnippet({'type': 'base', 'part': 'task'})

      var directories = []
      var content = {}

      var basetab = this.getTab('base')
      var packages = basetab.packages.dependencies
      var development = basetab.packages.development

      this.config.components.forEach((comp) => {
        var tab = this.getTab(comp)

        packages = packages.concat(tab.packages.dependencies)
        development = development.concat(tab.packages.development)

        tab.snippets.forEach((snippet) => {
          if(content.hasOwnProperty(snippet)) {
            content[snippet] += this.getSnippet({'type': comp, 'part': snippet}) + '\n'
          } else {
            content[snippet] = this.getSnippet({'type': comp, 'part': snippet}) + '\n'
          }
        })
        if(!directories.includes(tab.directory)) {
          directories.push(tab.directory)
        }

      })

      var gulpfile = base.replace('/* * * IMPORTS * * */', content.import) + '\n'
      gulpfile += content.function + '\n'
      gulpfile += content.task + '\n'
      gulpfile += basetasks.replace("/* * * WATCHERS * * */", content.watch).replace('/* add directories here */', directories)

      return { gulpfile: gulpfile, packages: packages, development: development, more: { 'script': content.script, 'style': content.style } }
    }
  },
  methods: {
    listPackages(packages, dev=false) {
      return utils.listPackages(packages, dev)
    },
    getTab(type) {
      var filter = snippets.tabs.filter((tab) => { if(tab.type == type) return tab })
      return filter[0]
    }
  }
}
</script>

<style lang="sass" scoped>
button
  i
    margin-right: .5rem
</style>
