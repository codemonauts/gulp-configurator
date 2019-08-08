<template lang="pug">
    v-container
      h2 packages
      CodeSnippet(:snippet='listPackages(packages)' language='shell')
      .group(v-if='development.length')
        h3 development dependencies
        CodeSnippet(:snippet='listPackages(development, true)' language='shell')
      h2 gulpfile
      v-btn(class='white--text' color='teal' @click='overlay = !overlay') Show gulpfile
      v-btn(class='mx-2' v-clipboard:copy='gulpfile')
        v-icon mdi-content-copy
        | Copy gulpfile
      v-overlay(:z-index='zIndex' :value='overlay')
        v-btn(class='white--text' color='teal' @click='overlay = false') Close
        CodeSnippet(:snippet='gulpfile' language='js')
</template>

<script>
import CodeSnippet from '../components/CodeSnippet'
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
    CodeSnippet
  },
  computed: {
    ...mapGetters(['config', 'getSnippet']),
    packages () {
      var packages = []
      if(this.config.pug) {
        var pugtab = this.getTab('pug')
        packages = packages.concat(pugtab.packages.dependencies)
      }
      if(this.config.sass) {
        var sasstab = this.getTab('sass')
        packages = packages.concat(sasstab.packages.dependencies)
      }
      if(this.config.script) {
        var jstab = this.getTab('js')
        packages = packages.concat(jstab.packages.dependencies)
      }
      return packages
    },
    development () {
      var packages = []
      if(this.config.pug) {
        var pugtab = this.getTab('pug')
        packages = packages.concat(pugtab.packages.development)
      }
      if(this.config.sass) {
        var sasstab = this.getTab('sass')
        packages = packages.concat(sasstab.packages.development)
      }
      if(this.config.script) {
        var jstab = this.getTab('js')
        packages = packages.concat(jstab.packages.development)
      }
      return packages
    },
    gulpfile () {
      var base = this.getSnippet({'type': 'base', 'part': 'base'})
      var basetasks = this.getSnippet({'type': 'base', 'part': 'task'})

      var functions = ''
      var tasks = ''
      var watchers = ''
      var directories = []
      var imports = ''
      if(this.config.pug) {
        var pugtab = this.getTab('pug')
        tasks += this.getSnippet({'type': 'pug', 'part': 'task'}) + '\n'
        functions += this.getSnippet({'type': 'pug', 'part': 'function'}) + '\n'
        watchers += this.getSnippet({'type': 'pug', 'part': 'watch'}) + '\n'
        directories.push(pugtab.directory)
      }
      if(this.config.sass) {
        var sasstab = this.getTab('sass')
        tasks += this.getSnippet({'type': 'sass', 'part': 'task'}) + '\n'
        functions += this.getSnippet({'type': 'sass', 'part': 'function'}) + '\n'
        watchers += this.getSnippet({'type': 'sass', 'part': 'watch'}) + '\n'
        imports += this.getSnippet({'type': 'sass', 'part': 'import'}) + '\n'
        directories.push(sasstab.directory)
      }
      if(this.config.script) {
        var jstab = this.getTab('js')
        tasks += this.getSnippet({'type': 'js', 'part': 'task'}) + '\n'
        functions += this.getSnippet({'type': 'js', 'part': 'function'}) + '\n'
        watchers += this.getSnippet({'type': 'js', 'part': 'watch'}) + '\n'
        imports += this.getSnippet({'type': 'js', 'part': 'import'}) + '\n'
        directories.push(jstab.directory)
      }

      var gulpfile = base.replace('/* * * IMPORTS * * */', imports) + '\n'
      gulpfile += functions + '\n'
      gulpfile += tasks + '\n'
      gulpfile += basetasks.replace("/* * * WATCHERS * * */", watchers).replace('/* add directories here */', directories)

      return gulpfile
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
