<template lang="pug">
    v-tabs
      v-tab(key='base') Base
      v-tab(key='pug') Templates (pug)
      v-tab(key='sass') Style (sass)
      v-tab(key='js') JavaScript
      v-tab(key='img') Images
      v-tab(key='fonts') Fonts
      v-tab-item(key='base')
        v-container
          h3 packages
          ul
            li(v-for="p in baseSnippets.packages.dependencies") {{p}}
          CodeSnippet(:snippet='listPackages(baseSnippets.packages.dependencies)' language='shell')
          h4 development dependencies:
          ul
            li(v-for="p in baseSnippets.packages.development") {{p}}
          CodeSnippet(:snippet='listPackages(baseSnippets.packages.development, true)' language='shell')
          h3 base
          CodeSnippet(:snippet='baseSnippets.base' language='js')
          h3 tasks
          CodeSnippet(:snippet='baseSnippets.tasks' language='js')

      v-tab-item(key='pug')
        v-container
          h2 Templates with pug
          h3 packages
          ul
            li(v-for="p in pugSnippets.packages") {{p}}
          CodeSnippet(:snippet='listPackages(pugSnippets.packages)' language='shell')
          h3 function
          CodeSnippet(:snippet='pugSnippets.function' language='js')
          h3 task
          CodeSnippet(:snippet='pugSnippets.task' language='js')
          h3 watch
          CodeSnippet(:snippet='pugSnippets.watch' language='js')
      v-tab-item(key='sass')
        v-container
          h2 Styles with SASS
      v-tab-item(key='js')
        v-container
          h2 JavaScript
      v-tab-item(key='img')
        v-container
          h2 Images
      v-tab-item(key='fonts')
        v-container
          h2 Fonts
</template>

<script>
import pugSnippets from '../assets/snippets/pug'
import baseSnippets from '../assets/snippets/base'
import CodeSnippet from '../components/CodeSnippet'

export default {
  components: {
    CodeSnippet
  },
  data() {
    return {
      pugSnippets: pugSnippets,
      baseSnippets: baseSnippets
    }
  },
  methods: {
    listPackages(packages, dev=false) {
      var npm = 'npm install '
      packages.forEach(function(name) {
        npm += name+' '
      })
      npm += dev ? '--save-dev' : '--save'
      return npm
    }
  }
};
</script>
