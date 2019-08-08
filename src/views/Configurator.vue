<template lang="pug">
v-container
  h1 Please choose your configuration!
  v-form
    .group
      h2 Craft Version
      v-radio-group(v-model="config.craft" row)
        v-radio(label="Craft 2" value="2")
        v-radio(label="Craft 3" value="3")
    .group
      h2 Components
      v-checkbox(v-model="config.pug" label="Templates (pug)")
      v-checkbox(v-model="config.sass" label="Style (sass)")
      v-checkbox(v-model="config.script" label="JavaScript")
      v-checkbox(v-model="config.img" label="Images")
      v-checkbox(v-model="config.twig" label="Twig (XML)")
      v-checkbox(v-model="config.email" label="E-Mail")
    .group
      h2 Features
      v-checkbox(v-model="config.foundation" label="Foundation Sites")
      v-checkbox(v-model="config.fontawesome" label="FontAwesome")
      v-checkbox(v-model="config.styleguide" label="Styleguide")
    .group
      h2 Architecture
      v-radio-group(v-model="config.files" row)
        v-radio(label="gulpfile" value="1" selected)
        v-radio(label="gulpfile + functions" value="2")
    .group
      v-btn(@click='generate') Generate!
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['getSnippet'])
  },
  data() {
    return {
      config: {
        craft: '3',
        pug: false,
        sass: false,
        script: false,
        img: false,
        twig: false,
        email: false,
        foundation: false,
        fontawesome: false,
        styleguide: false,
        files: '1'
      },
      generated: ''
    }
  },
  methods: {
    generate() {
      this.$store.dispatch('setConfig', this.config)
      this.$router.push('output')
    }
  }
}
</script>

<style lang="sass" scoped>
.v-input
  display: inline-flex
  margin-left: 1rem
</style>