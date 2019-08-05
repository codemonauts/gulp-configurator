<template lang="pug">
  v-container
    v-tabs
      v-tab(key='conf') Configurator
      v-tab(key='pug') PUG
      v-tab(key='sass') SASS
      v-tab-item(key='conf')
        h1 Please choose your configuration!
        v-form
          h2 Craft Version
          v-radio-group(v-model="craft" row)
            v-radio(label="Craft 2" value="2")
            v-radio(label="Craft 3" value="3")
          h2 Components
          v-checkbox(v-model="pug" label="Templates (pug)")
          v-checkbox(v-model="sass" label="Style (sass)")
          v-checkbox(v-model="script" label="JavaScript (jQuery & ES6)")
          v-checkbox(v-model="img" label="Images")
          v-checkbox(v-model="twig" label="Twig (XML)")
          v-checkbox(v-model="email" label="E-Mail")
          h2 Features
          v-checkbox(v-model="foundation" label="Foundation Sites")
          v-checkbox(v-model="fontawesome" label="FontAwesome")
          v-checkbox(v-model="styleguide" label="Styleguide")
      v-tab-item(key="pug")
        v-card
          v-card-text
              h2 Templates with pug
              h3 packages
              ul
                li(v-for="p in pugSnippets.packages") {{p}}
              pre.language-shell
                code {{listPackages(pugSnippets.packages)}}

              h3 function
              pre.language-js
                code {{pugSnippets.function}}
              h3 task
              pre.language-js
                code {{pugSnippets.task}}
              h3 watch
              pre.language-js
                code {{pugSnippets.watch}}
      v-tab-item(key='sass')
        h2 Styles with SASS
</template>

<script>
import pugSnippets from '../assets/snippets/pug'

export default {
  data() {
    return {
      craft: '',
      pug: false,
      sass: false,
      script: false,
      img: false,
      twig: false,
      email: false,
      foundation: false,
      fontawesome: false,
      styleguide: false,
      pugSnippets: pugSnippets
    }
  },
  methods: {
    listPackages(packages) {
      var npm = 'npm install '
      packages.forEach(function(name) {
        npm += name+' '
      })
      npm += ' --save'
      return npm
    }
  }
};
</script>

<style lang="sass" scoped>
.v-input
  display: inline-flex
  margin-left: 1rem
.v-application code
  box-shadow: none
</style>
