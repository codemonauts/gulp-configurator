<template lang="pug">
.snippet
  pre(:class="'language-'+language")
    code {{snippet}}
    .buttons
      v-btn(class="mx-2" fab small v-clipboard:copy="snippet")
        v-icon mdi-content-copy
      v-btn(class="mx-2" fab small :href="history" v-if="history" target='_blank')
        v-icon mdi-history
</template>

<script>
export default {
  props: ['snippet', 'language', 'history']
}
</script>

<style lang="sass" scoped>
.v-overlay
  code
    height: 80vh
.v-application code
  box-shadow: none
.snippet
  position: relative
pre
  display: flex
  justify-content: space-between
  align-items: center
.buttons
  position: absolute
  right: 1rem
  display: flex
  flex-direction: column
  button
    margin-bottom: .5rem
</style>

