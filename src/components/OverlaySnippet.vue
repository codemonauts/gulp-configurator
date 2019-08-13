<template lang="pug">
  .overlay
    h2 {{name}}
    v-btn(class='white--text' color='teal' @click='overlay = !overlay') Show {{name}}
    v-btn(class='mx-2' v-clipboard:copy='snippet')
      v-icon mdi-content-copy
      | Copy {{name}}
    v-overlay(:z-index='zIndex' :value='overlay')
      v-btn(class='white--text' color='teal' @click='overlay = false') Close
      CodeSnippet(:snippet='snippet' :language='language')
</template>

<script>
import CodeSnippet from '../components/CodeSnippet'
export default {
  props: ['name', 'snippet', 'language'],
  components: {
    CodeSnippet
  },
  data() {
    return {
      overlay: false,
      zIndex: 5,
    }
  },
}
</script>

<style lang="sass">
.v-overlay__content
  max-width: 90vw
</style>
