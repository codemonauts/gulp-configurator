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
          OverlaySnippet(v-for='(snippet, name) in output.more' :name='name' :snippet='snippet.snippet' :language='snippet.lang')
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
      var tasks = []

      this.config.components.forEach((comp) => {
        var tab = this.getTab(comp)

        if(tab.task) {
          tasks.push(tab.task)
        }
        packages = packages.concat(tab.packages.dependencies)
        development = development.concat(tab.packages.development)

        tab.snippets.forEach((snippet) => {
          let part = snippet.part
          if(content.hasOwnProperty(part)) {
            content[part]['snippet'] += this.getSnippet({'type': comp, 'part': part}) + '\n'
          } else {
            content[part] = {
              'snippet': this.getSnippet({'type': comp, 'part': part}) + '\n',
              'lang': snippet.lang
            }
          }
        })
        if(!directories.includes(tab.directory)) {
          directories.push(tab.directory)
        }

      })

      var gulpfile = base
      if(content.import) {
        gulpfile = gulpfile.replace('/* * * IMPORTS * * */', content.import.snippet) + '\n'
      }
      if(content.function) {
        gulpfile += content.function.snippet + '\n'
      }
      if(content.task) {
        gulpfile += content.task.snippet + '\n'
      }
      if(content.watch) {
        gulpfile += basetasks.replace("/* * * WATCHERS * * */", content.watch.snippet)
      }
      if(directories.length) {
        gulpfile = gulpfile.replace('/* add directories here */', directories)
      }
      if(tasks.length) {
        gulpfile = gulpfile.replace(/\/\* add tasks here \*\//g, tasks)
      }

      var defaultTasks = ['watch', 'import', 'function', 'task']
      defaultTasks.forEach(e => delete content[e])

      return { gulpfile: gulpfile, packages: packages, development: development, more: content }
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
