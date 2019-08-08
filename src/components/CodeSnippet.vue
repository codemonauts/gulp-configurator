<template lang="pug">
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
.v-application code
  box-shadow: none
pre
  display: flex
  justify-content: space-between
  align-items: center
.buttons
  display: flex
  flex-direction: column
  button
    margin-bottom: .5rem
</style>

