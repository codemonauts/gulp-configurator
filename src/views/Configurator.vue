<template lang="pug">
v-container
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
</template>

<script>
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
      styleguide: false
    }
  },
}
</script>

<style lang="sass" scoped>
.v-input
  display: inline-flex
  margin-left: 1rem
</style>