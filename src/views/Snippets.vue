<template lang="pug">
  v-container
    v-tabs
      v-tab(key='pug') PUG
      v-tab(key='sass') SASS
      v-tab-item(key="pug")
        v-card
          v-card-text
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
        h2 Styles with SASS
</template>

<script>
import pugSnippets from '../assets/snippets/pug'
import CodeSnippet from '../components/CodeSnippet'

export default {
  components: {
    CodeSnippet
  },
  data() {
    return {
    }
  },
  methods: {
    listPackages(packages) {
      var npm = 'npm install '
      packages.forEach(function(name) {
        npm += name+' '
      })
      npm += '--save'
      return npm
    }
  }
};
</script>
