<template lang="pug">
pre(:class="'language-'+language")
  code {{snippet}}
  v-btn(class="mx-2" fab small v-clipboard:copy="snippet")
    v-icon mdi-content-copy
</template>

<script>
export default {
  props: ['snippet', 'language']
}
</script>

<style lang="sass" scoped>
.v-application code
  box-shadow: none
pre
  display: flex
  justify-content: space-between
  align-items: center
</style>

