<template lang="pug">
v-container
  v-layout
    v-flex
      h1 Please choose your configuration!
      v-form
        .group
          h2 Craft Version
          v-radio-group(v-model='config.craft' row)
            v-radio(label='Craft 2' value='2')
            v-radio(label='Craft 3' value='3')
        .group
          h2 Components
          v-checkbox(v-model='config.components' label='Templates (pug)' value='pug' @change='checkPartForStyleguide')
          v-checkbox(v-model='config.components' label='Style (sass)' value='sass' @change='checkPartForStyleguide')
          v-checkbox(v-model='config.components' label='JavaScript' value='js' @change='checkPartForStyleguide')
          v-checkbox(v-model='config.components' label='Images' value='img')
          v-checkbox(v-model='config.components' label='Twig (XML)' value='twig')
          v-checkbox(v-model='config.components' label='E-Mail' value='mail')
          v-checkbox(v-model='config.components' label='Fonts' value='fonts' @change='checkFonts')
        .group
          h2 Features
          v-checkbox(v-model='config.components' label='Foundation Sites' value='foundation')
          v-checkbox(v-model='config.components' label='FontAwesome' value='fontawesome' @change='selectFonts')
          v-checkbox(v-model='config.components' label='Styleguide' value='styleguide' @change='selectStyleguide')
        .group
          h2 Architecture
          v-radio-group(v-model='config.files' row)
            v-radio(label='gulpfile' value='1' selected @change='checkFilesForStyleguide')
            v-radio(label='gulpfile + functions' value='2' @change='checkFilesForStyleguide')
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
        components: [],
        files: '1',
      }
    }
  },
  methods: {
    generate() {
      this.$store.dispatch('setConfig', this.config)
      this.$router.push('output')
    },
    selectFonts() {
      if(this.config.components.includes('fontawesome')) {
        this.config.components.push('fonts')
      }
    },
    checkFonts() {
      if(this.config.components.includes('fontawesome') && !this.config.components.includes('fonts')) {
        this.$store.dispatch('notification', {'type': 'warning', 'message': 'Fonts component needs to be selected for Fontawesome.'})
      } else {
        this.$store.dispatch('notification', {'type': '', 'message': ''})
      }
    },
    selectStyleguide() {
      if(this.config.components.includes('styleguide')) {
        this.config.files = '2'
        this.config.components = this.config.components.concat(['pug', 'sass', 'js'])
      }
    },
    checkFilesForStyleguide() {
      if(this.config.components.includes('styleguide') && !this.config.files == '2') {
          this.$store.dispatch('notification', {'type': 'warning', 'message': 'Styleguide needs dedicated functions file.'})
      } else {
        this.$store.dispatch('notification', {'type': '', 'message': ''})
      }
    },
    checkPartForStyleguide() {
      if(this.config.components.includes('styleguide') && (!this.config.components.includes('pug') || !this.config.components.includes('sass') || !this.config.components.includes('js'))) {
          this.$store.dispatch('notification', {'type': 'warning', 'message': 'Styleguide needs templates, style and javascript snippets.'})
      } else {
        this.$store.dispatch('notification', {'type': '', 'message': ''})
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.v-input
  display: inline-flex
  margin-left: 1rem
</style>