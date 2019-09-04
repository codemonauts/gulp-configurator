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
          OverlaySnippet(v-if='config.files == "2"' name='functions.js' :snippet='output.functions' language='javascript')
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
      var basetasks = this.getCode('base', 'task')

      var directories = []
      var content = {}

      var basetab = this.getTab('base')
      var packages = basetab.packages.dependencies
      var development = basetab.packages.development
      var tasks = []
      let moduleExport = []

      this.config.components.forEach((comp) => {
        var tab = this.getTab(comp)

        if(tab.task) {
          tasks.push(tab.task)
        }
        packages = packages.concat(tab.packages.dependencies)
        development = development.concat(tab.packages.development)

        tab.parts.forEach((part) => {
          if(content.hasOwnProperty(part)) {
            content[part]['snippet'] += this.getCode(comp, part) + '\n'
          } else {
            content[part] = {
              'snippet': this.getCode(comp, part) + '\n',
              'lang': 'javascript'
            }
          }
          if(part == 'function') {
            moduleExport.push(tab.function)
          }
        })
        if(!directories.includes(tab.directory)) {
          directories.push(tab.directory)
        }

      })

      // read base for gulpfile and functionJS
      var gulpfile = this.getCode('base', 'base')
      var functionsJs = this.getCode('base', 'functions')

      // add import statements
      if(this.config.files == '1') {
        if(content.import) {
          gulpfile = gulpfile.replace('/* * * IMPORTS * * */', content.import.snippet) + '\n'
        }
      } else {
        if(content.import) {
          gulpfile = gulpfile.replace('/* * * IMPORTS * * */', '')
          functionsJs = functionsJs.replace('/* * * IMPORTS * * */', content.import.snippet) + '\n'
        }
      }

      // add functions
      if(content.function) {
        if(this.config.files == '1') {
          gulpfile += content.function.snippet + '\n'
        } else {
          functionsJs = functionsJs.replace('/* * * FUNCTIONS * * */', content.function.snippet)
          functionsJs = functionsJs.replace('/* * * EXPORTS * * */', moduleExport.map(exp => `${exp}: ${exp}`))
        }
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
      if(content.styleguide) {
        gulpfile = gulpfile.replace('/* add styleguide here */', "'styleguide',")
      }

      var defaultTasks = ['watch', 'import', 'function', 'task']
      defaultTasks.forEach(e => delete content[e])

      return { gulpfile: gulpfile, packages: packages, development: development, more: content, functions: functionsJs }
    }
  },
  methods: {
    listPackages(packages, dev=false) {
      return utils.listPackages(packages, dev)
    },
    getTab(type) {
      var filter = snippets.tabs.filter((tab) => { if(tab.type == type) return tab })
      return filter[0]
    },
    getCode(type, part) {
      // get base snippet
      let snippet = this.getSnippet({'group': 'simple', 'type': type, 'part': part})

      if(this.config.files == 2) {
        let tmp = this.getSnippet({'group': 'functionsJs', 'type': type, 'part': part})
        if(tmp.length){
          snippet = tmp
        }
      }

      if(this.config.components.includes('styleguide')) {
        let tmp = this.getSnippet({'group': 'styleguide', 'type': type, 'part': part})
        if(tmp.length){
          snippet = tmp
        }
      }

      if(snippet.length > 0)
        return snippet[0].code
      return ''
    }
  }
}
</script>

<style lang="sass" scoped>
button
  i
    margin-right: .5rem
</style>
